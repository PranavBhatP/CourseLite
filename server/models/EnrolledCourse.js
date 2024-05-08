const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EnrolledCourseSchema = new Schema({
  studentID: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  courseID: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  status: { type: String, enum: ['Enrolled', 'Pending', 'Dropped'], default: 'Pending' }
});

const EnrolledCourse = mongoose.model('EnrolledCourse', EnrolledCourseSchema);

module.exports = EnrolledCourse;