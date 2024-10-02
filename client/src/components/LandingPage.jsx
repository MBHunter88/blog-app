import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [animationActive, setAnimationActive] = useState(false);

  // Fetch the featured post 
  useEffect(() => {
    const fetchFeaturedPost = async () => {
      try {
        const response = await fetch('http://localhost:8181/api/posts');
        const data = await response.json();

        setFeaturedPost(data[0]);
         // Trigger the animation once the post is fetched
         setTimeout(() => {
            setAnimationActive(true);
          }, 1000);
      } catch (error) {
        console.error('Error fetching featured post:', error.message);
      }
    };

    

    fetchFeaturedPost();
  }, []);

  //make sure post is fetched before trying to render
  if (!featuredPost) {
    return <p>Loading featured post...</p>;
  }

  return (
    <div className={`landing-page ${animationActive ? 'active' : ''}`}>
      <div className="split-image left-side"></div>
      <div className="split-image right-side"></div>

      <div className="content">
        <h1>Welcome!</h1>
        <div className="featured-post">
          <h2>Featured Post: {featuredPost.title}</h2>
          <p>By {featuredPost.author}</p>
          <p>{featuredPost.content.substring(0, 100)}...</p> {/* Display excerpt */}
          <Link to={`/posts/${featuredPost.id}`}>Read Full Post</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
