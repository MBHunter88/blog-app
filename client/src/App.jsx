import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BlogPosts from './components/BlogPosts';
import PostDetail from './components/PostDetail';
import About from './components/About';
import Projects from './components/Projects';
import Login from './components/Login';
import Navbar from './components/NavBar'; // Navigation bar component
import './App.css'

const App = () => {
  const isAdminEnabled = import.meta.env.VITE_ADMIN_ENABLED === 'true';
  return (
    <Router>
      <div>
        {/* Include the navigation bar */}
        <Navbar />

        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {isAdminEnabled && <Route path="/login" element={<Login />} />}
          <Route path="/posts" element={<BlogPosts />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
