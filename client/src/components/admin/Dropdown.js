import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import axios from 'axios';
function DropdownMenu({ asset , setAsset }) {
    const [isVisible, setIsVisible] = useState(false);
    const handleAsset = (asset) =>{
        setAsset(asset);
    }
    return (
        <div className = "flex items-center justify-center px-2 flex-col gap-2">
            <button
                id="dropdownDefaultButton"
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 text-sm text-white border border-white rounded-md hover:bg-gray-300 "
            >
                Select Asset
            </button>
            <input 
                type="text" 
                id="text" 
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Search courses" 
                value = {asset}  
            />
            {isVisible && (
                <div className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <button onClick={() => handleAsset('s')}>Students</button>
                        </li>
                        <li>
                            <button onClick={() => handleAsset('f')}>Faculty</button>
                        </li>
                        <li>
                            <button onClick={() => handleAsset('c')}>Course</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
