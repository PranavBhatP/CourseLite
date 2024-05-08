const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const jwt = require('jsonwebtoken');
const secret_key = 'secret123';
const Faculty = require('../models/Faculty');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authHandler');

router.route('/')
    .get(facultyController.getAllFaculty)
    .post(facultyController.createNewFaculty)
    .patch(facultyController.updateFaculty)
    .delete(facultyController.deleteFaculty)

router.post('/login', async (req,res)=> {
    const { staffID, password } = req.body;
    const faculty = await Faculty.findOne({staffID}).exec();

    if(!faculty) {
        return res.status(401).json({error: 'Invalid faculty ID or password'});
    }
    console.log('Faculty exists!' , faculty.name)
    const passwordMatch = await bcrypt.compare(password,faculty.password);

    if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid faculty ID or password' });
    }

    const token = jwt.sign({ staffID: faculty.staffID }, secret_key , {
    expiresIn: '1h' // Token expiration time
    });

    res.cookie('token', token, { httpOnly: true });
    
    res.json({ message: 'Login successful' });
})

router.patch('/courseUpdate', async (req, res) => {
    try {
      
      const { id, courseCode } = req.body;
  
      // Find faculty member by ID
      const faculty = await Faculty.findById(id);
  
      // Check if faculty member exists
      if (!faculty) {
        return res.status(404).json({ message: 'Faculty member not found' });
      }
    
      // Add course code to courseResponsibilities
      faculty.coursesTaught.push(courseCode);
  
      // Save updated faculty profile
      await faculty.save();
  
      return res.status(200).json({ message: 'Faculty profile updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;