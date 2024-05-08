const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');


const getAllCourses = asyncHandler(async (req,res) => {
    const courses = await Course.find({}).lean();
    if(!courses) {
        return res.status(400).json({message: 'No courses found'});
    }
    res.json(courses);
})

const createNewCourse = asyncHandler(async (req,res) => {
    const { courseCode , courseTitle, instructor, credits } = req.body;

    const duplicate = await Course.findOne({courseCode}).lean().exec();

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate coursename' })
    }
    const courseObject = { courseCode , courseTitle, instructor, credits };
    const course = Course.create(courseObject);

    if(course) {
        res.status(201).json({ message : `New course ${courseCode} created`})
    } else {
        res.status(404).json({ message : `Student ${courseCode} not created` })
    } 
})

const updateCourse = asyncHandler(async (req,res) => {
    const { id, courseCode , courseTitle, instructor, credits, numEnrolled } = req.body;
    const course = await Course.findById(id);

    if(!course) {
        return res.status(400).json({ message: "Course Not Found" });    
    }

    const duplicate = await Course.findOne({ courseCode: courseCode }).lean().exec();

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: `Duplicate course.` });
    }

    course.courseCode = courseCode;
    course.courseTitle = courseTitle;
    course.instructor = instructor;
    course.credits = credits;
    course.numEnrolled = numEnrolled;
    const updatedCourse = await course.save();

    res.json({message: `Updated course ${updatedCourse.courseCode}`});
});

const deleteCourse = asyncHandler(async (req,res) => {
    const  { id } = req.body;
    
    if(!id) {
        return res.status(400).json({ message: "Not able to delete course"})
    }
    const course = await Course.findById(id).exec();
    
    if(!course) {
        res.status(400).json({ message: "Course not found"})
    }

    const result = await course.deleteOne();

    res.json({ message: `Course deleted`});
})


module.exports = {
    getAllCourses,
    createNewCourse,
    updateCourse,
    deleteCourse
}
