const Contrat = require('../models/Contrat.model');
const User = require('../models/User.model');
const Projet = require('../models/Projet.model');
const path = require('path');
const generateContractPdf = require('../utils/generateContratPdf');

const contratController = {};

contratController.createContrat = async (req, res) => {
  try {
    const {
      objet,
      montant,
      direction,
      dateSignature,
      dateEffet,
      duree,
      dateFin,
      datePreavis,
      projet,
      etat,
      nomPorteur,
      prenomPorteur
    } = req.body;

    if (!objet || !projet || projet.length === 0 || !nomPorteur || !prenomPorteur) {
      return res.status(400).json({ message: 'Champs requis manquants (objet, projet, nom et prénom du porteur).' });
    }

    const utilisateur = await User.findOne({ nom: nomPorteur, prenom: prenomPorteur, typeUtilisateur: 'porteurprojet' });
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur porteur introuvable avec ce nom et prénom." });
    }

    const projetArray = Array.isArray(projet) ? projet : [projet];

    // Chercher projets par numProjet
    const projets = await Projet.find({ numProjet: { $in: projetArray } });

    if (projets.length === 0) {
      return res.status(404).json({ message: "Aucun projet trouvé avec les numéros fournis." });
    }

    // Récupérer les _id des projets trouvés
    const projetsIds = projets.map(p => p._id);

    const contrat = new Contrat({
      objet,
      montant,
      direction,
      dateSignature,
      dateEffet,
      duree,
      dateFin,
      datePreavis,
      projet: projetsIds,   // <-- Ici mettre ObjectId
      user: utilisateur._id,
      etat: ['en attente', 'accepté', 'refusé'].includes(etat) ? etat : 'en attente',
    });

    await contrat.save();

    // Générer PDF etc.
    const fileName = `contrat_${contrat._id}.pdf`;
    const filePath = path.join(__dirname, '../pdfs', fileName);

    await generateContractPdf(contrat, utilisateur, projets, filePath);

    contrat.fichier = fileName;
    await contrat.save();

    return res.status(201).json(contrat);

  } catch (err) {
    console.error('Erreur création contrat :', err);
    return res.status(500).json({ message: 'Erreur lors de la création du contrat.' });
  }
};


contratController.getPdfContratsByPorteur = async (req, res) => {
  try {
    const utilisateurId = req.user.userId;

    // Récupérer tous les contrats de cet utilisateur (porteur de projet)
    const contrats = await Contrat.find({ user: utilisateurId }, 'fichier');

    if (!contrats || contrats.length === 0) {
      return res.status(404).json({ message: "Aucun contrat assigné à cet utilisateur." });
    }

    const pdfs = contrats
      .filter(c => c.fichier)  
      .map(c => ({
        _id: c._id,
        url: `http://localhost:7501/pdfs/${c.fichier}`
      }));

    return res.status(200).json(pdfs);
  } catch (error) {
    console.error("Erreur dans la récupération des PDFs:", error);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
module.exports = contratController;
