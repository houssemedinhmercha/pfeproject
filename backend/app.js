const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoutes);
app.use('/role', roleRoutes);

module.exports = app;
