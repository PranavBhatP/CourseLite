const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema
const CourseSchema = new Schema({
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  instructor: { type: String, required: true },
  credits: { type: Number, required: true },
  numEnrolled: { type: Number, required: true , default: 0}, 
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
