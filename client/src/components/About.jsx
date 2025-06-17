import React from 'react';

import '../styles/AboutPage.css'; 

const About = () => {
  return (
    <div className="about-page">
      <h1>About Me... </h1>
      <div className="about-content">
        <div className="about-text">
          <p>I was born in Los Angeles and grew up in Compton, CA. 
            After many attempts at traditional higher education, 
            I decided to take a different route and enter the field of childcare. 
            Starting off as a nanny, I eventually evolved into a Household Manager 
            and later pivoted into birth work, becoming a postpartum doula. 
            These roles allowed me to support families in meaningful ways and build 
            lasting relationships. While working in this field, 
            I met my wife, and we are currently planning to grow our family.
             Additionally, I have been involved in community initiatives focused on 
             supporting new parents and advocating for better maternal care.
          </p>
        </div>
        <div className="about-image">
          {/* Placeholder for the image */}
          <img src="./headshot.jpg" alt="headshot" />
        </div>
      </div>
      <div>
        <h3>Let's Connect!</h3>
        <p></p>
        {/* 
        TODO: create database to post contact details
        <form>
          <label className="name">Name: </label>
          <input name="name" id="name" placeholder="John Doe" />
          <label className="email">Email: </label>
          <input name="email" id="email" placeholder="email@example.com" />
          <label className="phone">Phone: </label>
          <input name="phone" id="phone" placeholder="123-456-7890" />
         
        </form> */}
      </div>
      <div className="social-icons">
          <a href="https://www.linkedin.com/in/michelle-bedfordhunter"
          target="_blank"
          rel="noopener noreferrer"
          className="linkedin-icon"
          aria-label="LinkedIn">
          <span role="img" aria-label="LinkedIn">🔗</span>
          </a>
        </div>
    </div>
  );
};

export default About;

