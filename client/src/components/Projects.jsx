// src/pages/Projects.jsx
import React from "react";
import "../styles/ProjectsPage.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Queer Conceptions",
      description:
        "A full-stack PERN app designed to support LGBTQ+ family planning. Features AI-generated conception plans, user authentication, and a privacy-focused design.",
      image: "/images/queer-conceptions.gif",
      link: "https://queerconceptions.up.railway.app/",
    },
    {
      id: 2,
      title: "Doula to Developer Blog",
      description:
        "A personal blog chronicling my journey from birth work to software engineering, with posts on learning, growth, and inclusive tech.",
      image: "/images/doula-to-dev.gif",
      link: "https://doula-to-dev.com/",
    },
    {
      id: 3,
      title: "BrainBuster Trivia App",
      description:
        "A React-based trivia game that fetches data from an API, tracks scores, and tests your knowledge across topics. Built with Jest and React Testing Library.",
      image: "/images/brainbuster.gif",
      link: "https://github.com/MBHunter88/BrainBuster",
    },
    {
      id: 4,
      title: "Eventonica",
      description:
        "A full-stack event management app using React, Express, and PostgreSQL. Features CRUD operations, Bootstrap styling, and event search filters.",
      image: "/images/eventonica.gif",
      link: "https://github.com/MBHunter88/Eventonica",
    },
    {
      id: 5,
      title: "Animal Sighting Tracker",
      description:
        "A PERN stack web app for logging endangered species sightings. Includes joined SQL queries, React modals, and PostgreSQL database integration.",
      image: "/images/animal-tracker.gif",
      link: "https://github.com/MBHunter88/Animal-Sighting-Tracker",
    },
  ];

  return (
    <div className="projects-page">
      <h1 className="page-title">My Projects</h1>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id} className="post-item">
            <img
              src={project.image}
              alt={`${project.title} demo`}
              className="project-image-wide"
              loading="lazy"
            />
            <div className="project-text">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <a
                href={project.link}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
