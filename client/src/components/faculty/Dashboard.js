import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Content from './Content';
import { useParams } from 'react-router-dom';
import Footer from '../../Footer';
const Dashboard = () => {
    const params = useParams();
    const [content, setContent] = useState('');
    //const [courseCodes, setCourseCodes] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3500/faculty');
            const facultiesData = response.data;
            const facultyData = facultiesData.find(faculty => faculty.staffID === params.id);
            setContent(facultyData);

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
        { !isAuthenticated && <p>Not authorised!</p>}
        { isAuthenticated && (
           <div className='m-0 bg-black'>
            <Navbar facultyID = {params.id} content = {content}/>
            <Content 
                content={content}
            />
            <Footer/>
         </div>
        )}
    </>
    
  )
}

export default Dashboard