import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

function DropdownMenu() {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div>
            <button
                id="dropdownDefaultButton"
                onClick={() => setIsVisible(!isVisible)}
                className="px-4 py-2 text-sm text-white border border-white rounded-md hover:bg-gray-300 "
            >
                Sign In
            </button>
            {isVisible && (
                <div className="z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <Link to="/student/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Student</Link>
                        </li>
                        <li>
                            <Link to="/faculty/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Faculty</Link>
                        </li>
                        <li>
                            <Link to="/admin/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;
