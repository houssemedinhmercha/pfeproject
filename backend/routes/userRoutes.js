const express=require('express');
const router=express.Router();
const authenticateToken=require('../midelware/auth');
const adminController=require('../Controllers/admin.Controller');

router.delete('/deleteUser/:userId', authenticateToken, adminController.deleteUser);
router.patch('/toggleUserActivation/:userId', authenticateToken, adminController.toggleUserActivation);
router.get('/All-users', authenticateToken,adminController.getAllUsersWithInfo);
router.post('/send-email-to-user', authenticateToken, adminController.sendEmailToUser);


module.exports = router;