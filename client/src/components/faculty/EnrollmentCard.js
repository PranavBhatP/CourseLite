import React, { useState,useEffect } from 'react'
import { GoCheck, GoX } from "react-icons/go";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';
const EnrollmentCard = ({enrolledCourse}) => {
    const [status, setStatus] = useState('Pending');
    const id = enrolledCourse._id

    const handleStatus = async (status) => {
        try {
            const response = await axios.patch(`http://localhost:3500/enroll/${id}`, {
                choice: status
            })
            const result = await response.data;
            if(status == 0) {
                setStatus('Enrolled');
                let numEnrolled = enrolledCourse.courseID.numEnrolled + 1;
                
                try{
                    const incrementNumEnroll = await axios.patch(`http://localhost:3500/courses`,{
                        id: enrolledCourse.courseID._id,
                        courseCode: enrolledCourse.courseID.courseCode,
                        courseTitle: enrolledCourse.courseID.courseTitle,
                        instructor: enrolledCourse.courseID.instructor,
                        credits: enrolledCourse.courseID.credits,
                        numEnrolled: numEnrolled,
                    })
                    const result = await incrementNumEnroll.data
                } catch (e) {
                    console.log("Coudn't increment the number of enrollments.")
                }
            } else if (status == 2) {
                setStatus('Dropped')
            } else {
                setStatus('Pending')
            }
            console.log(result);
        } catch (e) {
            console.error("Error editing status.");
        }
    }
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3500/enroll/${id}`)
            const result = await response.data;
            console.log(result);
        } catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-4/5 mx-auto my-10">
                <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                <div className="my-4 flex flex-col">
                    <h2 className="text-white text-2xl font-bold pb-2">{enrolledCourse.courseID.courseCode}</h2>
                    <p className="text-gray-300 py-1">Student: {enrolledCourse.studentID.name}</p>
                    <p className="text-gray-300 py-1">ID: {enrolledCourse.studentID.studentID}</p>
                    <p className="text-white py-1"> <b>Status: {enrolledCourse.status}</b> </p>
                </div>

                <div className="flex gap-10 flex-row justify-end">
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <button
                            type = "submit"
                            onClick={()=> handleStatus(0)} 
                        ><GoCheck color = "white" size = "50px"/></button>
                        <button 
                            type = "submit"
                            onClick={()=> handleStatus(2)}
                        ><GoX color = "white" size= "50px"/></button>
                        <button
                            type = "submit"
                            onClick={handleDelete}
                        ><FaRegTrashCan color = "white" size= "50px"/></button>
                    </form>
                </div>
            </div>
        </>
  )
}

export default EnrollmentCard;