require('dotenv').config();
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.route('/')
    .get(adminController.getAllAdmins)
    .post(adminController.createNewAdmin);


router.post('/login', async (req,res)=> {
    const { email, password } = req.body;
    const admin = await Admin.findOne({email}).exec();

    if(!admin) {
        return res.status(401).json({error: 'Invalid admin ID or password'});
    }
    console.log('Admin exists!' , admin.name)
    const passwordMatch = await bcrypt.compare(password,admin.password);

    if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid admin ID or password' });
    }

    const token = jwt.sign({ email: admin.email }, secret_key , {
    expiresIn: '1h' // Token expiration time
    });

    res.cookie('token', token, { httpOnly: true });
    
    res.json({ message: 'Login successful' });
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send('Logged out');
});

module.exports = router;