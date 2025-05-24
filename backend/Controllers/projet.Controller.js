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
  numProjet,      // <-- Ici
  titre,
  description,
  categorie,
  montant_requis,
  date_debut,
  date_fin
} = req.body;

const nouveauProjet = new Projet({
  numProjet,       // <-- Ici aussi
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
    console.log('ID du projet:', projetId); // Ajouter un log pour voir l'ID reçu

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


projetController.getProjetsUtilisateur = async (req, res) => {
  try {
    const porteurId = req.user.userId;  

    const projets = await Projet.find({ porteur: porteurId });

    if (projets.length === 0) {
      return res.status(404).json({ message: 'Aucun projet trouvé pour cet utilisateur.' });
    }

    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la récupération des projets.',
      error: error.message || error
    });
  }}
projetController.getAllProjets = async (req, res) => {
  try {
    const projets = await Projet.find().populate('porteur', 'nom prenom '); // Affiche aussi le porteur

    res.status(200).json(projets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erreur lors de la récupération de tous les projets.',
      error: error.message || error
    });
  }
};
projetController.changerStatut = async (req, res) => {
  try {
    const { projetId } = req.body; 

    const projet = await Projet.findById(projetId); 

    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    if (projet.statut === 'validé') {
      return res.status(400).json({ message: 'Le projet est déjà validé' });
    }

    if (projet.statut !== 'en_attente') {
      return res.status(400).json({ message: 'Le projet doit être en attente pour être validé' });
    }

    projet.statut = 'validé';
    await projet.save(); 

   res.status(200).json({ message: 'Statut validé avec succès', projet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du statut' });
  }
};
module.exports = projetController;
