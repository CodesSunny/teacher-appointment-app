import MyContext from "./Context";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import AdminSignUp from './pages/admin/SignUp';
import TeacherSignUp from './pages/teacher/SignUp';
import StudentSignUp from './pages/student/SignUp';
import Home from './pages/navLinks/Home';
import Services from './pages/navLinks/Services';
import Blog from './pages/navLinks/Blog';
import Contact from './pages/navLinks/Contact';
import AboutUs from './pages/navLinks/AboutUs';
import NotFound from './pages/NotFound';
import { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";




function App() {

  
const {loggedUser,setLoggedUser}= useContext(MyContext);
console.log(loggedUser);


   useEffect(()=>{
      const loggedUserInStorage = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedUser(loggedUserInStorage)
    
   },[])




  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute> } />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/teacher/dashboard" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute> } />
          <Route path="/teacher/signup" element={<TeacherSignUp />} />
          <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/signup" element={<StudentSignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>

  )
}

export default App
