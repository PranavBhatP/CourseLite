import React, { useState } from 'react';

const Card = ({ item, asset }) => {
  const [showEditField, setShowEditField] = useState(false);
  const [editItem, setEditItem] = useState(item)
  const handleChange = (e) => {
    
  };

  const handleCancel = () => {
    setShowEditField(false);
    
  };

  return (
    <>
      <div className="relative bg-gray-900 block p-6 border border-gray-100 rounded-lg w-4/5 mx-auto my-10">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        {!showEditField ? (
          <>
            { asset === 's' && 
              <div className="my-4 flex flex-col">
                <h2 className="text-white text-2xl font-bold pb-2">{item.name}</h2>
                <p className="text-white py-1">ID: {item.studentID}</p>
                <p className="text-white py-1">Department: {item.department}</p>
                <p className="text-white py-1">Program: {item.programType}</p>
              </div>
            }
            { asset === 'f' && 
              <div className="my-4 flex flex-col">
                <h2 className="text-white text-2xl font-bold pb-2">{item.name}</h2>
                <p className="text-white py-1">ID: {item.staffID}</p>
                <p className="text-white py-1">Department: {item.department}</p>
              </div>
            }
            { asset === 'c' && 
              <div className="my-4 flex flex-col">
                <h2 className="text-white text-2xl font-bold pb-2">{item.courseCode}</h2>
                <p className="text-white py-1">{item.courseTitle}</p>
                <p className="text-white py-1">Instructor Name: {item.instructor}</p>
                <p className="text-white py-1">Num Enrolled: {item.numEnrolled}</p>
              </div>
            }
          </>
        ) : (
          <div className='flex flex-col'>
            
            { asset === 's' && 
              <>
                <label className="text-white">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editItem.name}
                    onChange={handleChange}
                    className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Student ID:</label>
                <input
                  type="text"
                  name="studentID"
                  value={editItem.studentID}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Program:</label>
                <input
                  type="text"
                  name="programType"
                  value={item.programType}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Department:</label>
                <input
                  type="text"
                  name="programType"
                  value={item.department}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
              </>
            }
            { asset === 'f' && 
              <>
                <>
                <label className="text-white">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={editItem.name}
                    onChange={handleChange}
                    className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Faculty ID:</label>
                <input
                  type="text"
                  name="studentID"
                  value={editItem.staffID}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Department</label>
                <input
                  type="text"
                  name="programType"
                  value={item.department}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
              </>
              </>
            }
            { asset === 'c' && 
              <>
                <>
                <label className="text-white">Course Code:</label>
                  <input
                    type="text"
                    name="name"
                    value={editItem.courseCode}
                    onChange={handleChange}
                    className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Course Title:</label>
                <input
                  type="text"
                  name="studentID"
                  value={editItem.courseTitle}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
                <label className="text-white">Credits</label>
                <input
                  type="text"
                  name="programType"
                  value={editItem.credits}
                  onChange={handleChange}
                  className="my-2 px-3 py-1 border border-gray-300 rounded"
                />
              </>
              </>
            }
          </div>
        )}

        <div className="flex justify-end">
          {showEditField ? (
            <>
              <button 
                className="px-2 py-1 text-white border border-gray-200 w-24 font-semibold rounded hover:bg-gray-800 mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                className="px-2 py-1 text-white border border-gray-200 w-24 font-semibold rounded hover:bg-gray-800"
                onClick={() => {
                  // Add your submit logic here
                  setShowEditField(false);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <button 
              className="px-2 py-1 text-white border border-gray-200 w-24 font-semibold rounded hover:bg-gray-800"
              onClick={() => setShowEditField(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
