import React from 'react';
import EnrollmentCard from './EnrollmentCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
const EnrollmentRequests = ({reqdCourses, enrollmentRequests, setEnrollmentRequests}) => {
    useEffect(() => {
        const fetchEnrollmentRequest = async () => {
            const response = await axios.get('http://localhost:3500/enroll');
            const enrollmentData = await response.data;
            const reqdCoursesCode = reqdCourses.map(course => course.courseCode);
            const specificEnrollmentData = enrollmentData.filter(enrollment => reqdCoursesCode.includes(enrollment.courseID.courseCode))
            setEnrollmentRequests(specificEnrollmentData);
        }
        try {
            fetchEnrollmentRequest()
        }
        catch (e) {
            console.log ("Error!: " + e.message);
        }
    })
    return (
    <>
        <div className='flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg'>
            <h2 className='flex items-center text-center text-white text-2xl mb-4'><b> Pending Approvals </b></h2>
            
            <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center w-full'>
            {enrollmentRequests.length > 0 && enrollmentRequests.map((enrolledCourse, index) => {
                return (
                    <EnrollmentCard key={index} enrolledCourse={enrolledCourse} />
                );
            })}

            </div>
        </div>
    </>
  )
}

export default EnrollmentRequests