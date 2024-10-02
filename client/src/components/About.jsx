import React from 'react';
import '../styles/AboutPage.css'; 

const About = () => {
  return (
    <div className="about-page">
      <h1>About This Blog</h1>
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
          <img src="your-image-url.jpg" alt="About us" />
        </div>
      </div>
    </div>
  );
};

export default About;

