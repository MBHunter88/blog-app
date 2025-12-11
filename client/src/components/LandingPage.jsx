// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/LandingPage.css';

// const BASE_URL = import.meta.env.VITE_API_URL;

// const LandingPage = () => {
//     const [featuredPost, setFeaturedPost] = useState(null);
//     const [animationActive, setAnimationActive] = useState(false);

//     // Fetch the featured post
//     useEffect(() => {
//         const fetchFeaturedPost = async () => {
//             try {
//                 const response = await fetch(`${BASE_URL}/api/posts`);
//                 const data = await response.json();
//                 console.log('Fetched data:', data);
//                 setFeaturedPost(data[0]);
//                 // Trigger the animation once the post is fetched
//                 setTimeout(() => {
//                     setAnimationActive(true);
//                 }, 1000);
//             } catch (error) {
//                 console.error('Error fetching featured post:', error.message);
//             }
//         };

//         fetchFeaturedPost();
//     }, []);

//     //make sure post is fetched before trying to render
//     if (!featuredPost) {
//         return <p>Loading featured post...</p>;
//     }

//     return (
//         <div className={`landing-page ${animationActive ? 'active' : ''}`}>
//             <div className="split-image left-side"></div>
//             <div className="split-image right-side"></div>

//             <div className="content">
//                 <div className="welcome-msg">
//                 <h2>
//   From
//   <span style={{ fontFamily: 'Nothing You Could Do', color: '#13729a' }}> Doula </span>
//   to
//   <span style={{ fontFamily: `"Source Code Pro", moonspace`, color: '#e67e22' }}> Developer </span>
// </h2>

//                     <p>Engineer. Creator. Problem-Solver."
// Building dependable web and cloud applications that merge empathy with innovation.
//                     {/* <p>Hello! I'm Michelle, but you can call me MJ. I am a passionate artist with a background in web development and design.
//                         I have a deep love for coding and enjoy bringing creative ideas to life through my work. My journey into the world of
//                          technology began with a fascination for how things work, leading me to pursue a career in this ever-evolving field.
//                         With experience in HTML, CSS, JavaScript, and various frameworks, I specialize in creating dynamic and responsive web
//                         applications. I am currently enhancing my skills through a professional development program called Techtonica, focusing
//                          on the latest trends and best practices in web development. Beyond my technical prowess, my background as a postpartum
//                          doula has honed my communication and organizational skills to a high level. This unique blend of experiences empowers me
//                           to tackle challenges with a mix of empathy and innovation. I am dedicated to creating solutions that are not just efficient,
//                           but also intuitively user-friendly, ensuring a seamless and pleasant experience for all users. Outside of coding, I enjoy
//                           spending time with my family, exploring new technologies, and contributing to open-source projects. I am always eager to learn
//                           and grow, and I am excited to bring my skills and passion to new challenges and opportunities. */}

//                         {/* This blog chronicles my unique journey from the world of birth work to the dynamic world of software development.
//                         For years, I dedicated myself to supporting families through one of life’s most transformative experiences—birth.
//                         As a doula, I learned the power of empathy, problem-solving, and resilience.
//                         Now, I’m harnessing those same skills to navigate the tech industry and create innovative solutions for the future.
//                         Here, you’ll find reflections on my transition into tech, insights into the challenges and triumphs I’ve encountered,
//                         and the lessons I’ve learned along the way. Whether you’re a fellow career-changer or someone simply curious about
//                         the journey, I’m excited to share this adventure with you. */}
//                         <br/><br/><span><Link to={`/posts/`}>My Journey</Link></span></p>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;

import { useState, useEffect } from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [text, setText] = useState("");
  const [excerptIndex, setExcerptIndex] = useState(0);

  const title = "From Doula to Developer";
  const excerpts = [
    "Engineer. Creator. Problem Solver.",
    "Merging empathy and innovation through code.",
    "Building meaningful web and cloud applications.",
  ];

  // Typing animation
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(title.slice(0, i + 1));
      i++;
      if (i === title.length) clearInterval(typing);
    }, 150);
    return () => clearInterval(typing);
  }, []);

  // Rotate excerpts
  useEffect(() => {
    const interval = setInterval(() => {
      setExcerptIndex((prev) => (prev + 1) % excerpts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-page active">
      <div className="content">
        <div className="welcome-msg minimal-hero">
          <h1 className="typing-title" aria-label="doula to dev">
            <span className="typing-text">{text}</span>
            <span className="typing-caret" aria-hidden="true">
              |
            </span>
          </h1>

          <h2 className="excerpt-rotator" aria-live="polite">
            {excerpts[excerptIndex]}
          </h2>
          <p>
            Hello! I&apos;m Michelle, but you can call me MJ. I’m a full-stack
            software engineer who enjoys building dependable, user-centered
            applications with <strong> JavaScript, React, Node.js, Express,</strong> and
            <strong> PostgreSQL.</strong> My experience includes creating responsive frontends,
            developing and testing <strong>APIs,</strong> and managing data with strong backend
            logic. I’ve also worked with <strong>AWS, Kubernetes, Jenkins,</strong> and <strong> CI/CD </strong>
            automation to improve reliability and streamline deployments. I take
            pride in writing clean, efficient code and creating solutions that
            merge empathy, functionality, and innovation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
