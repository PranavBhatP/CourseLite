const Faculty = require('../models/Faculty');
const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllFaculty = asyncHandler(async (req,res) => {
    const faculty = await Faculty.find().select('-password').lean();
    if(!faculty) {
        return res.status(400).json({message: 'No faculty found'});
    }
    res.json(faculty);
})

const createNewFaculty = asyncHandler(async (req,res) => {
    const { name, email, department, staffID , password , coursesTaught}  = req.body;

    const duplicate = await Faculty.findOne({ staffID }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPwd = await bcrypt.hash(password,10);
    const facultyObject = { name, email, department, staffID , "password": hashedPwd , coursesTaught}

    const faculty = await Faculty.create(facultyObject)

    if(faculty) {
        res.status(201).json({ message : `New faculty ${name} created`})
    } else {
        res.status(404).json({ message : `Faculty ${name} not created` })
    } 

})

const updateFaculty = asyncHandler(async (req,res) => {
    const { id, name, email, department, staffID ,password}  = req.body;

    const faculty = await Faculty.findById(id)

    if(!faculty) {
        return res.status(400).json({ message: `Faculty not found`})
    }
    const duplicate = await Faculty.findOne({ email: email }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: `Duplicate faculty.` });
    }

    faculty.name = name;
    faculty.email = email;
    faculty.department = department;
    faculty.programType = programType;
    faculty.facultyID = staffID;
    faculty.coursesTaught = coursesTaught;
    if(password) {
        faculty.password = await bcrypt.hash(password,10);
    }
    const updatedFaculty = await faculty.save()

    res.json({message : `${updatedFaculty.name}'s details have been updated.`})
});

const deleteFaculty = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: "Not able to delete faculty"})
    }

    const faculty = await Faculty.findById(id).exec();
    
    if(!faculty) {
        res.status(400).json({ message: "Faculty not found"})
    }

    const result = await faculty.deleteOne();

    res.json({ message: "Faculty deleted"});
})


module.exports = {
    getAllFaculty,
    createNewFaculty,
    updateFaculty,
    deleteFaculty
}
