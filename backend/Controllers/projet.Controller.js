const Projet = require('../models/Projet.model');
const User = require('../models/User.model');

const projetController = {};

projetController.creerProjet = async (req, res) => {
  try {
    const porteurId = req.user.userId;

    const utilisateur = await User.findById(porteurId);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const {
      numProjet,      // <-- ICI
      titre,
      description,
      categorie,
      montant_requis,
      date_debut,
      date_fin
    } = req.body;

    const nouveauProjet = new Projet({
      numProjet,       // <-- ICI
      titre,
      description,
      categorie,
      montant_requis,
      date_debut,
      date_fin,
      porteur: porteurId
    });

    await nouveauProjet.save();
    res.status(201).json(nouveauProjet);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la création du projet.',
      error: error.message || error
    });
  }
};
projetController.modifierProjet=async (req, res) => {
  try {
    // L'ID du porteur est extrait du token JWT via req.user
    const porteurId = req.user.userId;

    // Récupérer l'ID du projet à partir des paramètres de l'URL
    const projetId = req.params.id;

    // Vérifier si le projet existe
    const projetExist = await Projet.findById(projetId);
    if (!projetExist) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    if (projetExist.porteur.toString() !== porteurId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce projet.' });
    }

    const { titre, description, categorie, montant_requis, date_debut, date_fin, statut } = req.body;

    projetExist.titre = titre || projetExist.titre;
    projetExist.description = description || projetExist.description;
    projetExist.categorie = categorie || projetExist.categorie;
    projetExist.montant_requis = montant_requis || projetExist.montant_requis;
    projetExist.date_debut = date_debut || projetExist.date_debut;
    projetExist.date_fin = date_fin || projetExist.date_fin;
    projetExist.statut = statut || projetExist.statut;  

    await projetExist.save();

    res.status(200).json(projetExist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la modification du projet.',
      error: error.message || error,
    });
  }
};

projetController.supprimerProjet = async (req, res) => {
  try {
    const porteurId = req.user.userId; // ID extrait du token
    const projetId = req.params.id;

    const projet = await Projet.findById(projetId);
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé.' });
    }

    if (projet.porteur.toString() !== porteurId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce projet.' });
    }

    await Projet.findByIdAndDelete(projetId);

    res.status(200).json({ message: 'Projet supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la suppression du projet.',
      error: error.message || error
    });
  }
};

module.exports = projetController;
