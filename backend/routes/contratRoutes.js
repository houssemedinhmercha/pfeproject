const express= require('express');
const router=express.Router();
const contratController=require('../Controllers/contrat.Controller');
const authenticateToken=require('../midelware/auth');


router.post('/ajouterContrat',authenticateToken,contratController.createContrat);
router.get('/Pdfs',authenticateToken,contratController.getPdfContratsByPorteur);

module.exports= router;