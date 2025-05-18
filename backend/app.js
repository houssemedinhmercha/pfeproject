// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const passwordRoutes=require('./routes/passwordRoutes');
const projetRoutes=require('./routes/projetRoutes')

const app = express();

app.use(cors());

// Permet à Express de comprendre les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sert les fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/role', roleRoutes);
app.use('/password',passwordRoutes);
app.use('/projet',projetRoutes);

module.exports = app;
