import React from 'react';

import '../styles/AboutPage.css'; 

const About = () => {
  return (
    <div className="about-page">
      <h1>About Me... </h1>
      <div className="about-content">
        <div className="about-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet consectetur mi. Nam auctor dolor a odio dictum,
             in congue felis bibendum. Nulla facilisi. Mauris hendrerit magna ac risus varius, ac convallis orci vehicula. Integer 
             dictum est sit amet metus consectetur, sed egestas felis congue. Curabitur fermentum turpis sed nisl tristique, et aliquam 
             sapien lobortis. Aliquam erat volutpat. Donec vehicula ligula orci, in accumsan arcu volutpat vitae. Pellentesque convallis, 
             est eget cursus faucibus, sem nunc malesuada dui, in egestas felis felis sit amet ex. Sed in odio at quam vehicula fringilla. 
             Proin rhoncus magna sed feugiat mollis. Nulla mollis turpis a risus faucibus, eget convallis eros tristique. Nam sit amet mi eu 
             orci fringilla luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
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
          <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        </div>
    </div>
  );
};

export default About;

