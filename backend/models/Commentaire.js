const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
  contenu: String,
  note: { type: Number, min: 1, max: 5 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);
