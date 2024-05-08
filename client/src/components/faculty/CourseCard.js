import React from 'react'

const CourseCard = ({course}) => {
  return (
    <>
        <div className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-4/5 mx-auto my-10">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="my-4 flex flex-col">
                <h2 className="text-white text-2xl font-bold pb-2">{course.courseCode}</h2>
                <p className="text-white py-1">{course.courseTitle}</p>
                <p className="text-white py-1">Instructor Name: {course.instructor}</p>
                <p className="text-white py-1">Num Enrolled: {course.numEnrolled}</p>
            </div>
        </div>
    </>
  )
}

export default CourseCard