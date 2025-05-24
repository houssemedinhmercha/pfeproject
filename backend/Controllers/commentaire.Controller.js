// controllers/commentaireController.js
const Commentaire = require('../models/Commentaire');
const Projet = require('../models/Projet.model');
const commentaireController={};
commentaireController.ajouterCommentaire = async (req, res) => {
  try {
    const { contenu, note, projetId } = req.body;
    const utilisateurId = req.user.id; // récupéré automatiquement du token

    const commentaire = new Commentaire({
      utilisateur: utilisateurId,
      projet: projetId,
      contenu,
      note
    });

    await commentaire.save();

    await Projet.findByIdAndUpdate(projetId, {
      $push: { commentaires: commentaire._id }
    });

    res.status(201).json({ message: 'Commentaire ajouté', commentaire });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
commentaireController.getProjetByNumero = async (req, res) => {
  try {
    const { numero } = req.params;

    const projet = await Projet.findOne({ numProjet: numero }).populate('porteur');

    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }

    res.status(200).json(projet);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};



module.exports=commentaireController;