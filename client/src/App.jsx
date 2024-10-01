import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BlogPosts from './components/BlogPosts';
import PostDetail from './components/PostDetail';
import About from './components/About';
import Navbar from './components/Navbar'; // Navigation bar component

const App = () => {
  return (
    <Router>
      <div>
        {/* Include the navigation bar */}
        <Navbar />

        {/* Define the routes */}
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/posts" element={<BlogPosts />} />
          <Route path="/posts/:postId" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
