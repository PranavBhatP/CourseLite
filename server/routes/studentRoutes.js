require('dotenv').config();
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');
const jwt = require('jsonwebtoken');
const secret_key = 'secret123';
const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authHandler');
router.route('/')
    .get(studentsController.getAllStudents)
    .post(studentsController.createNewStudent)
    .patch(studentsController.updateStudent)
    .delete(studentsController.deleteStudent)

router.post('/login', async (req,res)=> {
  const { studentID, password } = req.body;
  const student = await Student.findOne({studentID}).exec();

  if(!student) {
      return res.status(401).json({error: 'Invalid student ID or password'});
  }
  console.log('Student exists!' , student.name)
  const passwordMatch = await bcrypt.compare(password,student.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid student ID or password' });
  }

  const token = jwt.sign({ studentID: student.studentID }, secret_key , {
    expiresIn: '1h' // Token expiration time
  });

  res.cookie('token', token, { httpOnly: true });
  
  res.json({ message: 'Login successful' });
})



router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected Route', user: req.user });
});


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).send('Logged out');
});
module.exports = router;