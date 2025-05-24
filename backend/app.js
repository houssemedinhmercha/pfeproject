const express = require('express');
const cors = require('cors');
const path = require('path');  // <-- Ajouté ici

const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const projetRoutes = require('./routes/projetRoutes');
const commentaireRoutes = require('./routes/commentaireRoutes');
const contratRoutes = require('./routes/contratRoutes');

const app = express();

app.use(cors());

// Permet à Express de comprendre les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert les fichiers uploadés
app.use('/uploads', express.static('uploads'));
app.use('/pdfs', express.static('pdfs'));
// 
app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.use('/password', passwordRoutes);
app.use('/projet', projetRoutes);
app.use('/commentaire', commentaireRoutes);
app.use('/contrat', contratRoutes);

module.exports = app;
