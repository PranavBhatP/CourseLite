const Student = require('../models/Student');
const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const getAllStudents = asyncHandler(async (req,res) => {
    const students = await Student.find().select('-password').lean();
    if(!students) {
        return res.status(400).json({message: 'No students found'});
    }
    res.json(students);
})

const createNewStudent = asyncHandler(async (req,res) => {
    const { name, email, department, programType, studentID , password }  = req.body;

    const duplicate = await Student.findOne({ studentID }).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const hashedPwd = await bcrypt.hash(password,10);
    const studentObject = { name, email, department, programType, studentID, "password": hashedPwd }

    const student = await Student.create(studentObject)

    if(student) {
        res.status(201).json({ message : `New student ${name} created`})
    } else {
        res.status(404).json({ message : `Student ${name} not created` })
    } 

})

const updateStudent = asyncHandler(async (req,res) => {
    const { id, name, email, department, programType, studentID , password }  = req.body;

    const student = await Student.findById(id)

    if(!student) {
        return res.status(400).json({ message: `Student not found`})
    }
    const duplicate = await Student.findOne({ email: email }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: `Duplicate student.` });
    }

    student.name = name;
    student.email = email;
    student.department = department;
    student.programType = programType;
    student.studentID = studentID;

    if(password) {
        student.password = await bcrypt.hash(password,10);
    }
    const updatedStudent = await student.save()

    res.json({message : `${updatedStudent.name}'s details have been updated.`})
});

const deleteStudent = asyncHandler(async (req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: "Not able to delete student"})
    }

    const student = await Student.findById(id).exec();
    
    if(!student) {
        res.status(400).json({ message: "Student not found"})
    }

    const result = await student.deleteOne();

    res.json({ message: "Student deleted"});
})


module.exports = {
    getAllStudents,
    createNewStudent,
    updateStudent,
    deleteStudent
}
