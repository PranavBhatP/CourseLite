import React, { useState } from 'react';
import DropdownMenu from './Dropdown';
function Navbar() {
    return (
        <nav className= "py-2  top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 border-b border-gray-700 flex items-center justify-between py-1">
            <div className= 'ml-6 p-1 flex gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="IconChangeColor" height="32" width="32"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" id="mainIconPathAttribute" fill = "#ffffff"></path></svg>
                <h1 className="text-white text-2xl font-display">CourseLite</h1>
            </div>
            <div className="mr-6 p-1 flex flex-row gap-4">
                <DropdownMenu />
                <a className="px-4 py-2 text-sm text-white border border-white rounded-md hover:bg-gray-300 " href = "/admin/login">
                Sign Up
            </a>
            </div>
        </nav>
    );
}

export default Navbar;
