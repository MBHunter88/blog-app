import React from 'react';
import '../styles/Resume.css';

const Resume = () => {
  return (
    <div className="resume-page">
      <h1 className="resume-name">Michelle Bedford-Hunter</h1>

      <section className="resume-section">
        <h2>Summary</h2>
        <p>Passionate full-stack developer with a background in birth work. Seeking opportunities to build meaningful and accessible web applications.</p>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        <ul>
          <li>
            <strong>Postpartum Doula</strong> – Supported families during the postpartum period, developing strong communication and problem-solving skills.
          </li>
          <li>
            <strong>Software Developer</strong> – Created projects using React, Node.js and REST APIs while completing bootcamp coursework.
          </li>
        </ul>
      </section>

      <section className="resume-section">
        <h2>Education</h2>
        <ul>
          <li>Full-Stack Web Development Bootcamp</li>
          <li>Continuing self-study of modern web technologies</li>
        </ul>
      </section>

      <section className="resume-section">
        <h2>Skills</h2>
        <p>JavaScript, React, Node.js, Express, SQL, HTML, CSS</p>
      </section>
    </div>
  );
};

export default Resume;
