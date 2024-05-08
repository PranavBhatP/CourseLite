require('dotenv').config();
const express = require('express');
const app = express();
const {logger} = require('./middleware/logger');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions =require('./config/corsOptions')
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
connectDB(); 

app.use(logger);
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));
app.use('/', require('./routes/enrolledCourseRoutes'));
app.use('/courses', require('./routes/courseRoutes'));
app.use('/students', require('./routes/studentRoutes'));
app.use('/faculty', require('./routes/facultyRoutes'));
app.all('*',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', '404.html'));
})

app.use(errorHandler); 

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running at ${PORT}`));
})