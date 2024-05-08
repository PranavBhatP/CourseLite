import React from 'react'
import {useState} from 'react';
const CourseCard = ({course, courseCart, setCourseCart}) => {
    const [inCart, setInCart] = useState('');
    
    const handleCourseCart = (cartedCourse,process) => {  
        if(process === "ADD" && !courseCart.includes(cartedCourse)) {
          setCourseCart([...courseCart, cartedCourse]);
          setInCart(true);
        }else {
          const newCart = courseCart.filter(item => item.courseCode !== cartedCourse.courseCode)
          setCourseCart(newCart);
          setInCart(false);
        }
    }
    return (
    <>
        <div className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-4/5 mx-auto my-10">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="my-4 flex flex-col">
                <h2 className="text-white text-2xl font-bold pb-2">{course.courseCode}</h2>
                <p className="text-gray-300 py-1">{course.courseTitle}</p>
                <p className="text-gray-300 py-1">{course.instructor}</p>
            </div>

            <div className="flex justify-end">
                <form onSubmit={(e)=>e.preventDefault()}>
                    {
                        !inCart ? 
                        <button 
                            className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
                            onClick={()=> {
                                handleCourseCart(course,"ADD");
                            }}
                        >Add to Course Cart</button>
                        :
                        <button 
                            className="px-2 py-1 text-white border border-gray-200 font-semibold rounded hover:bg-gray-800"
                            onClick = {() => {
                                handleCourseCart(course,"DELETE");
                            }}
                        >Remove from Course Cart</button>
                    }
                </form>
            </div>
        </div>

    </>
  )
}

export default CourseCard