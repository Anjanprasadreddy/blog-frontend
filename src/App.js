import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Home from './pages/Home.js';
import Blogs from './pages/Blogs.js';
import Navbar from './components/Navbar.js';
import AdminAccess from './pages/AdminAccess.js'
import SingleBlog from './pages/SingleBlog.js'; // Import SingleBlog
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/access" element={<AdminAccess />} />
        <Route path="/blog/:id" element={<SingleBlog />} /> {/* Add route for SingleBlog */}
      </Routes>
    </Router>
  );
}

export default App;
