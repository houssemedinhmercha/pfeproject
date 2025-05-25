const User = require('../models/User.model');
const Demandeur = require('../models/Demandeur.model');
const { sendMail } = require("../utils/sendEmail");
const mongoose = require('mongoose');

const adminController = {};

// Suppression utilisateur + données associées
adminController.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await Avocat.findOneAndDelete({ utilisateur: userId });
    await Expert.findOneAndDelete({ utilisateur: userId });
    await Demandeur.findOneAndDelete({ utilisateur: userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Utilisateur et ses données associées supprimés' });

  } catch (error) {
    console.error("Erreur lors de la suppression", error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
  }
};

// Activer / Désactiver un utilisateur
adminController.toggleUserActivation = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.isActive = !user.isActive;
    await user.save();

    const action = user.isActive ? 'activé' : 'désactivé';
    res.status(200).json({ message: `Utilisateur ${action} avec succès` });
  } catch (error) {
    console.error('Erreur lors de la modification de l\'état de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la modification de l\'état de l\'utilisateur' });
  }
};

// Récupérer tous les utilisateurs avec leurs infos associées
adminController.getAllUsersWithInfo = async (req, res) => {
  try {
    const users = await User.find().exec();

    const detailedUsers = await Promise.all(users.map(async (user) => {
      let additionalInfo = null;

      const avocat = await Avocat.findOne({ utilisateur: user._id }).exec();
      if (avocat) {
        additionalInfo = {
          type: 'Avocat',
          data: {
            adresse: avocat.adresse,
            referenceConvention: avocat.referenceConvention,
            dateDebutConvention: avocat.dateDebutConvention,
            dateFinConvention: avocat.dateFinConvention,
            region: avocat.region,
            honoraires: avocat.honoraires
          }
        };
      }

      const expert = await Expert.findOne({ utilisateur: user._id }).exec();
      if (expert) {
        additionalInfo = {
          type: 'Expert',
          data: {
            adresse: expert.adresse,
            dateExpertise: expert.dateExpertise,
            fraisExpertise: expert.fraisExpertise
          }
        };
      }

      const demandeur = await Demandeur.findOne({ utilisateur: user._id }).exec();
      if (demandeur) {
        additionalInfo = {
          type: 'Demandeur',
          data: {
            // Ajoute ici les champs spécifiques au demandeur s'il y en a
          }
        };
      }

      return {
        ...user.toObject(),
        additionalInfo: additionalInfo || null
      };
    }));

    res.status(200).json(detailedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
  }
};

// Envoyer un email à un utilisateur
adminController.sendEmailToUser = async (req, res) => {
  const { userId, subject, emailContent } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID utilisateur invalide' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Envoi de l'email
    await sendMail(user.email, subject, emailContent, true); // isHtml = true

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email", error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'envoi de l\'email' });
  }
};

module.exports = adminController;
