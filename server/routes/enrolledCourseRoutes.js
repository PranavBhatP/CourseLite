const express = require('express');
const router = express.Router();
const EnrolledCourse = require('../models/EnrolledCourse');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
router.get('/enroll', async (req, res) => {
    try {
		const enrolledCourse = await EnrolledCourse.find()
		.populate({
			path: 'studentID',
			select: 'name studentID' 
		})
		.populate('courseID');
        res.status(200).json(enrolledCourse);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve enrolled courses", error: error });
    }
});

router.patch('/enroll/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { choice } = req.body;
    
        const enrolledCourse = await EnrolledCourse.findById(id);
        if(choice == 0) {
            enrolledCourse.status = 'Enrolled'
        } else if (choice == 1) {
            enrolledCourse.status = 'Pending'
        } else {
            enrolledCourse.status = 'Dropped'
        }

        await enrolledCourse.save();

		res.status(200).send({ message :"Edited successfully"});
    } catch(e) {
        res.status(500).json({ message: "Failed to update status", error: e });
    }
})



router.post('/enroll', async (req, res) => {
    try {
        const { studentID, courseID } = req.body;
        if (!ObjectId.isValid(studentID) || !ObjectId.isValid(courseID)) {
            return res.status(400).json({ "message": 'Invalid studentID or courseID' });
        }
        
        // Create new enrollment with validated studentID and courseID
        const newEnrollment = new EnrolledCourse({
            studentID: new ObjectId(studentID),
            courseID: new ObjectId(courseID),
            status: 'Pending'
        });

        await newEnrollment.save();
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Failed to create enrollment:', error);
        res.status(500).send('Error enrolling in course');
    }
});


router.delete('/enroll/:id', async (req, res) => {
    try {
        const { id } = req.params; // Corrected parameter extraction
        const result = await EnrolledCourse.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ "message": `Enrollment ticket ${id} not found` });
        }
        res.status(200).json({ "message": `Successfully deleted enrollment ticket ${id}` });
    } catch (error) {
        console.error('Failed to delete enrollment:', error);
        res.status(500).send('Error deleting enrollment');
    }
});


module.exports = router;
