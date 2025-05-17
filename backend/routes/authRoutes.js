// authRoutes.js
const express = require('express');
const authController = require('../Controllers/authControllers');
const upload = require('../midelware/multer');

const router = express.Router();

router.post('/Inscription', upload.single('imageprofile'), authController.Inscription);
router.post('/login', authController.login);

module.exports = router;
