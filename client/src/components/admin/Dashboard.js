
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import Content from './Content';
import Footer from '../../Footer';
const Dashboard = () => {
    const params = useParams();
    const [content, setContent] = useState('');
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [facultyList, setFacultyList] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3500/admin');
            const adminsData = await response.data;
            const adminData = adminsData.find(admin => admin.email.split('@')[0].toLowerCase() === params.id);
            setContent(adminData);
          } catch (error) {
            console.error(error);
          }
        };
        
        const token = localStorage.getItem('token');
        if (token) {
          setIsAuthenticated(true);
          fetchData();
        }
    }, [params.id]);
    
  return (
    <>
        {!isAuthenticated && <p>Oops! You can't access this route.</p>}
        {isAuthenticated && (
            <div className = "h-auto bg-black m-0">
                <Navbar />
                <Content content = {content}/>
                <Footer />
            </div>    
      )}
    </>
  );
}

export default Dashboard;