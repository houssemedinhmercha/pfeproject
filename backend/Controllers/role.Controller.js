const Role= require('../models/Role.model');
const User=require('../models/User.model');
const {sendMail}=require('../utils/sendEmail');

const roleController={};

roleController.createRole=async(req,res)=>{
    try{
        const{nom, description}=req.body;

        const existingRole=await Role.findOne({nom});
        if(existingRole){
            return res.status(400).json({message: "Role existe déja"})
        }
        const newRole= new Role({nom, description});
        await newRole.save();
        res.status(201).json({message:"Role crée avec succes !"})
    }catch(error){
        res.status(500).json({message:"Erreur lors de creation de role"});
    }
};

roleController.assignRole =async(req,res)=>{
    try {
        const { userId, roleId } = req.body;
    
        // Vérifie que les deux paramètres sont fournis
        if (!userId || !roleId) {
          return res.status(400).json({ message: "L'ID de l'utilisateur et de rôle sont requis." });
        }
    
        // Vérifie si l'utilisateur existe
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
    
        // Vérifie si le rôle existe
        const role = await Role.findById(roleId);
        if (!role) {
          return res.status(404).json({ message: "Rôle non trouvé." });
        }
    
        // Met à jour l'utilisateur avec le rôle
        user.role = role._id;
        await user.save();
    
        res.status(200).json({ message: "Rôle assigné avec succès.", user });
    
      } catch (err) {
        console.error("Erreur lors de l'assignation du rôle :", err);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
      }
};

module.exports=roleController;