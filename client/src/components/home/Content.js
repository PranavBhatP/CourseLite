import React from 'react'
import { IoBook } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
const Content = () => {
  return (
    <>
        <div className = "flex flex-wrap flex-col w-screen items-center justify-center h-screen gap-y-3">
            <h1 className='animate-text text-7xl text-center text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-purple-700 to-blue-700'>Welcome to <b>CourseLite!</b></h1>
            {/* <div className = "flex w-full justify-center py-2 gap-2">
              <div className='flex flex-col items-center justify-center w-1/5 h-auto border-gray-700 border-2 rounded-lg'>
                <IoBook className='text-8xl text-white'/>
                <p className = "text-white">Enroll</p>
              </div>
              <div className='flex flex-col items-center justify-center w-1/5 h-auto border-gray-700 border-2 rounded-lg'>
                <MdModeEdit className='text-8xl text-white'/>
                <p className = "text-white">Edit</p>
              </div>
              <div className='flex flex-col items-center justify-center w-1/5 h-auto border-gray-700 border-2 rounded-lg'>
                <MdDeleteOutline className='text-8xl text-white'/>
                <p className = "text-white">Delete</p>
              </div>
            </div> */}
            <p className='text-white text-2xl'>Work with courses, like a pro!</p>
            <form action="#">
                <button type="button" class="text-white w-36 h-18 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Get Started!
                </button>
            </form>
        </div>  
    </>
  )
}

export default Content;