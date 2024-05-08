const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    programType: { type: String, required: true,enum: ['PhD', 'MTech', 'BTech']},
    studentID: { type: String, required: true },
    password: { type: String, required: true }
}) 

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;