import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const LandingPage = () => {
    const [featuredPost, setFeaturedPost] = useState(null);
    const [animationActive, setAnimationActive] = useState(false);

    // Fetch the featured post 
    useEffect(() => {
        const fetchFeaturedPost = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/posts`);
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
                <div className="welcome-msg">
                <h2>
  From
  <span style={{ fontFamily: 'Nothing You Could Do', color: '#13729a' }}> Doula </span>
  to
  <span style={{ fontFamily: `"Source Code Pro", moonspace`, color: '#e67e22' }}> Developer </span>
</h2>

                    <p>This blog chronicles my unique journey from the world of birth work to the dynamic world of software development.
                        For years, I dedicated myself to supporting families through one of life’s most transformative experiences—birth.
                        As a doula, I learned the power of empathy, problem-solving, and resilience.
                        Now, I’m harnessing those same skills to navigate the tech industry and create innovative solutions for the future.
                        Here, you’ll find reflections on my transition into tech, insights into the challenges and triumphs I’ve encountered, 
                        and the lessons I’ve learned along the way. Whether you’re a fellow career-changer or someone simply curious about 
                        the journey, I’m excited to share this adventure with you.
                        Let’s build something great together. <br/><br/><span><Link to={`/posts/`}>My Journey</Link></span></p>

                    
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
