const mongoose = require('mongoose');

const investissementSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
  montant: Number,
  date_investissement: { type: Date, default: Date.now },
  statut: { type: String, enum: ['confirmé', 'en_attente', 'remboursé'], default: 'en_attente' }
});

module.exports = mongoose.model('Investissement', investissementSchema);
