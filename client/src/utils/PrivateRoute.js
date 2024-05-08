import React, {useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = () => {
    
    return <Outlet/>
}

export default PrivateRoute;