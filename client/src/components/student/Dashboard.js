import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import Content from './Content';
import Footer from '../../Footer';
const Dashboard = () => {
  const params = useParams();
  const [content, setContent] = useState('');
  const [courses, setCourses] = useState([]); // Initialize as an array
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Initialize as an array
  const [courseCart, setCourseCart] = useState([]); // Initialize as an array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/students');
        const studentsData = response.data;
        const studentData = studentsData.find(student => student.studentID == params.id);
        setContent(studentData);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCourses = async () => {
      try{
        const response = await axios.get('http://localhost:3500/courses');
        const courseData = response.data;
        setCourses(courseData);
      } catch (error) {
        console.error(error);
      }
    }
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchData();
      fetchCourses();
    }
  }, [params.id]);

  useEffect(() => {
    const filteredResults = courses.filter((course) =>
        ((course.courseCode).toLowerCase()).includes(search.toLowerCase())
          || ((course.courseTitle).toLowerCase()).includes(search.toLowerCase()));
      setSearchResults(filteredResults);
  }, [search, courses]); 

  
  return (
    <>
      {!isAuthenticated && <p>Oops! You can't access this route</p>}
      {isAuthenticated && (
        <div className='m-0 bg-black'>
          <Navbar />
          <Content 
            content={content} 
            setSearch = {setSearch} 
            courseData={courses} 
            searchResults={searchResults} 
            courseCart = {courseCart} 
            setCourseCart = {setCourseCart}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Dashboard;
