import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CourseForm = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const params = useParams();
    const { id, facultyName } = state;
    const [ courseCode, setCourseCode ] = useState('');
    const [ courseTitle , setCourseTitle ] = useState('');
    const [instructor,setInstructor] = useState(facultyName);
    const [credits, setCredits] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/courses', {
                courseCode: courseCode,
                courseTitle: courseTitle,
                instructor: instructor,
                credits: credits
            });
            console.log('Course created:', response.data);

            await axios.patch(`http://localhost:3500/faculty/courseUpdate`, {
                id: id,
                courseCode: courseCode
            })
            console.log('Course updated:');
            setCourseCode('');
            setCourseTitle('');
            setCredits(0);
            navigate(`/faculty/${params.id}/dashboard`)
        } catch (error) {
            console.error('Error creating course:', error);
        }
    }

    return (
        <main className='flex flex-col gap-10 items-center justify-center my-10'>
            <h1 className = "tex-center text-2xl">Create new course</h1>
            <form className="w-full max-w-lg" onSubmit={handleSubmit} >
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name" >
                        Course Code
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        id="grid-first-name" 
                        type="text" 
                        placeholder="MA-110" 
                        required 
                        value = {courseCode}
                        onChange = {(e) =>  setCourseCode(e.target.value) }/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Course Title
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-last-name" 
                        type="text" 
                        placeholder="Engineering Mathematics"
                        required 
                        value = {courseTitle}
                        onChange = {(e) =>  setCourseTitle(e.target.value) }/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Instructor(Mr./Mrs./Dr.)
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-password" 
                        type="text"
                        value= {instructor}
                        onChange = {(e) =>  setInstructor(e.target.value) }/>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Credits
                        </label>
                        <input 
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="grid-city" 
                            type="text" 
                            placeholder="1,2,3,4..." 
                            value = {credits}
                            onChange = {(e) =>  setCredits(e.target.value) }/>
                    </div>
                </div>
                <button 
                    type="submit" 
                    className ="my-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create
                </button>
                </form>
        </main>
    )
}

export default CourseForm