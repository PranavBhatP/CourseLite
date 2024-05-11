const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


const getAllAdmins = asyncHandler(async (req,res) => {
    const admins = await Admin.find({}).lean();
    if(!admins) {
        return res.status(400).json({message: 'No courses found'});
    }
    res.json(admins);
})

const createNewAdmin = asyncHandler(async (req,res) => {
    const { name, email, password }  = req.body;

    const duplicate = await Admin.findOne({ email:email }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPwd = await bcrypt.hash(password,10);
    const adminObject = { name, email, "password": hashedPwd }

    const admin = await Admin.create(adminObject)

    if(admin) {
        res.status(201).json({ message : `New admin ${name} created`})
    } else {
        res.status(404).json({ message : `Admin ${name} not created` })
    } 

})

// const updateAdmin = asyncHandler(async (req,res) => {
//     const { id, name, email, department, programType, adminID , password }  = req.body;

//     const admin = await Admin.findById(id)

//     if(!admin) {
//         return res.status(400).json({ message: `Admin not found`})
//     }
//     const duplicate = await Admin.findOne({ email: email }).lean().exec();

//     if(duplicate && duplicate?._id.toString() !== id) {
//         return res.status(409).json({ message: `Duplicate admin.` });
//     }

//     admin.name = name;
//     admin.email = email;
//     admin.department = department;
//     admin.programType = programType;
//     admin.adminID = adminID;

//     if(password) {
//         admin.password = await bcrypt.hash(password,10);
//     }
//     const updatedAdmin = await admin.save()

//     res.json({message : `${updatedAdmin.name}'s details have been updated.`})
// });

// const deleteAdmin = asyncHandler(async (req,res) => {
//     const { id } = req.body

//     if(!id) {
//         return res.status(400).json({ message: "Not able to delete admin"})
//     }

//     const admin = await Admin.findById(id).exec();
    
//     if(!admin) {
//         res.status(400).json({ message: "Admin not found"})
//     }

//     const result = await admin.deleteOne();

//     res.json({ message: "Admin deleted"});
// })


module.exports = {
    getAllAdmins,
    createNewAdmin
}
