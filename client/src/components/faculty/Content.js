import React from 'react'
import DetailCard from './DetailCard'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import EnrollmentRequests from './EnrollmentRequests';
const Content = ({content}) => {
    const [reqdCourses, setReqdCourses] = useState([]);
    const [enrollmentRequests, setEnrollmentRequests] = useState([]);
    
    useEffect(() => {
        const fetchCourses = async (courseCodeList) => {
            const response = await axios.get('http://localhost:3500/courses');
            const courseData = await response.data;
            if(courseData.length > 0) {
                const courses = courseData.filter(course => courseCodeList.includes(course.courseCode))
                setReqdCourses(courses);
            }
        }
        try {
            fetchCourses(content.coursesTaught);
        } catch (e) {
            console.log("Error ffs!!");
        }
    },[content])
    return (
        <main className='flex items-center justify-center flex-col gap-y-10 gap width-full m-6'>
            <div className = "flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg">
            <h2 className=' flex items-center text-center text-2xl mb-4'><br></br><b> Faculty Details </b></h2>
            <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center gap-x-4 w-full'>
                <DetailCard field ="Name" text = {content.name}/>
                <DetailCard field ="Faculty-ID" text = {content.staffID}/>
                <DetailCard field ="Dept." text = {content.department}/>
            </div>
            </div>
            <div className='flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg'>
                <h2 className='flex items-center text-center text-white text-2xl mb-4'><b> Your Courses </b></h2>
                <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center w-full'>
                    {reqdCourses.length > 0 && reqdCourses.map((course,index) => (
                        <CourseCard key = {index} course = {course} />
                    ))}
                </div>
            </div>
            <EnrollmentRequests enrollmentRequests = {enrollmentRequests} reqdCourses={reqdCourses} setEnrollmentRequests={setEnrollmentRequests}/>
        </main>
    )
}

export default Content