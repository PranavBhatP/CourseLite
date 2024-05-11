
import './index.css';
import { Route, Routes} from 'react-router-dom';
import Home from './components/home/Home';
import StudentLogin from './components/student/Login';
import FacultyLogin from './components/faculty/Login';
import StudentDashboard from './components/student/Dashboard';
import FacultyDashboard from './components/faculty/Dashboard';
import AdminDashboard from './components/admin/Dashboard';
import { Component } from 'react';  
import PrivateRoute from './utils/PrivateRoute';
import CourseForm from './components/faculty/CourseForm';
import AdminLogin from './components/admin/Login';
import NewAssetForm from './components/admin/NewAssetForm';
function App() {
  
  return (
    <div className="App">  
      <Routes>
        <Route exact path = '/' element = {<Home/>}/>          
        <Route exact path = '/student/login' element = {<StudentLogin role = "student"/>}/>
        <Route exact path = '/faculty/login' element = {<FacultyLogin role = "faculty"/>}/>
        <Route exact path = '/student/:id/dashboard' element = {<StudentDashboard/>}/>
        <Route exact path = '/faculty/:id/dashboard' element = {<FacultyDashboard/>}/>
        <Route exact path = '/admin/:id/dashboard' element = {<AdminDashboard/>}/>
        <Route exact path = '/faculty/:id/newCourse' element = {<CourseForm/>}/>
        <Route exact path = '/admin/login' element = {<AdminLogin role = "admin"/>}/>
        <Route exact path = '/admin/:id/newAsset' element = {<NewAssetForm />}/>
      </Routes>
    </div>
  );
}

export default App;
