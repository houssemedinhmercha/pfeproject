const express = require('express');
const router = express.Router();
const authenticateToken=require('../midelware/auth')
const commentaireController = require('../Controllers/commentaire.Controller');


router.post('/add-commentaire', authenticateToken,commentaireController.ajouterCommentaire);
router.get('/:numero', authenticateToken,commentaireController.getProjetByNumero);


module.exports = router;
