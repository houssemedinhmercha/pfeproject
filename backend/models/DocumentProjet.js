const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
  nom: String,
  fichier_url: String,
  type: String, // 'business_plan', 'rapport_financier'
  date_upload: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DocumentProjet', documentSchema);
