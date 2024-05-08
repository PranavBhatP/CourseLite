import React from 'react'
import DetailCard from './DetailCard'
import { IoPerson } from "react-icons/io5";
import CourseCard from './CourseCard';
import { useState, useEffect } from 'react';
import CartCourse from './CartCourse';
import axios from 'axios';
import CourseApprovals from './CourseApprovals';
const Content = ({content, search, setSearch, searchResults, courseCart, setCourseCart}) => {
  const [enrollmentApprovals, setEnrollmentApprovals] = useState([]);
  const [approvalState, setApprovalState] = useState('');
  const handleApprovalRequest = async (studentID) => {
    if(studentID){
      try {
        const promises = courseCart.map(async cartedCourse => {
          console.log(`Sending IDs - StudentID: ${studentID}, CourseID: ${cartedCourse._id}`);
          const response = await axios.post('http://localhost:3500/enroll', {
            studentID: studentID,
            courseID: cartedCourse._id
          });
          const result = response.data;
          console.log("New enrollment ticket: " + result.message);
          return result;
        });
    
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        // Process the results if needed
        setApprovalState('Sent for review');
        console.log("All enrollments completed:", results);
      } catch (e) {
        console.error(e.message);
      }
    } else {
      console.log("Student ID not being sent");
    }
  };

  
  
  return (
    <main className = "flex items-center justify-center flex-col gap-y-10 gap width-full m-6">
        <div className = "flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg">
          <h2 className=' flex items-center text-white text-center text-2xl mb-4'><IoPerson /><br></br><b> Student Details </b></h2>
          <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center gap-x-4 w-full'>
            <DetailCard field ="Name" text = {content.name}/>
            <DetailCard field ="Student-ID" text = {content.studentID}/>
            <DetailCard field ="Dept." text = {content.department}/>
            <DetailCard field ="Program Type" text = {content.programType}/>
          </div>
        </div>
        <div className = "flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg">
          <h2 className='text-center text-white text-2xl mb-1'><b>Available Courses</b></h2>
          <p className='text-center text-white text-xl mb-10'>Search to view hidden courses.</p>
          <form className="max-w-md mx-auto">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input 
                  type="search" 
                  id="default-search" 
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Search courses" 
                  value = {search}
                  onChange={(e) => setSearch(e.target.value)}  
                />
            </div>
          </form>
          <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center w-full h-auto overflow-hidden'>
            {searchResults && searchResults.map((course,index) => (
              course.courseCode.slice(0, 2) === content.department && 
              <CourseCard key={index} course={course} courseCart = {courseCart} setCourseCart={setCourseCart} />
            ))}
          
          </div>
        </div>
        <div className = "flex p-3 w-11/12 items-center flex-col justify-center h-auto mx-auto border-gray-700 border-2 rounded-lg">
          <h2 className='text-center text-white text-2xl mb-4'><b>Your Course Cart</b></h2>
          <p className = "text-white ">View status of non-approved courses as well by adding it to the cart</p>
          <div className='flex items-center flex-col md:flex-row lg:flex-row md:flex-wrap justify-center w-full'>
            {courseCart && courseCart.map((course,index)=> (
                course.courseCode.slice(0, 2) === content.department && 
                <CartCourse key={index} course={course} courseCart = {courseCart} setCourseCart={setCourseCart}/>
            ))}
          </div>
          {
            courseCart.length > 0  && 
            <form onSubmit={(e) => e.preventDefault()}>
              <button 
                type = "submit"
                onClick = {() => handleApprovalRequest(content._id)}
                className = "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                  Send for approval
              </button>
              <p className='text-white text-center'>{approvalState}!</p>
            </form>
          }
        </div>
        <CourseApprovals content = {content} enrollmentApprovals={enrollmentApprovals} setEnrollmentApprovals = {setEnrollmentApprovals}/>
    </main>
  )
}

export default Content