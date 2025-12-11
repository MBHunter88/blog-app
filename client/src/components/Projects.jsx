// src/pages/Projects.jsx
import "../styles/ProjectsPage.css";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Queer Conceptions",
      description:
        "Queer Conceptions is part of a larger initiative designed to support LGBTQ+ families navigating their family planning journey. The app provides personalized support through a conception plan generator, virtual doula, and tailored resources. It aims to simplify the complex and often overwhelming process of conception for LGBTQ+ individuals. The app guides users step by step, whether they are considering IVF, surrogacy, sperm/egg donation, or other family-building options. Features: User Login/Signup: Users can create an account or log in securely, allowing them to save and track their personalized conception plans. AI-Generated Conception Plan: Based on user input (e.g., method choice, legal/medical needs, timeline), an AI generates a personalized plan, helping users stay organized and progress through their conception journey. Resource Library: Users can access a library of relevant resources, including LGBTQ+-inclusive medical and legal information. Virtual Doula Chatbot: A virtual doula chatbot provides users with real-time assistance for frequently asked questions regarding conception and family planning, using AI to ensure responses are tailored and informative. Users can ask questions about legal, medical, and emotional aspects of conception, and receive empathetic, comprehensive answers.",
      image: "https://camo.githubusercontent.com/db79f86ae85226b15614536a1f86ba4f7ab7b982406f7236c62b812f0af6c69f/68747470733a2f2f692e67697068792e636f6d2f6d656469612f76312e59326c6b505463354d4749334e6a45784d5449306558526a64325236635849345a474d785a6e59794e32356d4d584a77597a55354f4731306232527a617a49784f47783459795a6c634431324d563970626e526c636d35686246396e61575a66596e6c666157516d593351395a772f4a6b6a6d51364e4658755677345163474b572f67697068792e676966",
      link: "https://queerconceptions.up.railway.app/",
    },
    {
      id: 3,
      title: "BrainBuster Trivia App",
      description:
        "A responsive trivia game built with React and Express, designed for dynamic interactions and accessibility. Technologies Used: React, Jest, Node.js, PostgreSQL, Express, CSS.",
      image: "https://camo.githubusercontent.com/19dd0825a2751673bdfb735b9aff531cbc8849355d9299387cb6893dedc8febe/68747470733a2f2f692e67697068792e636f6d2f6d656469612f76312e59326c6b505463354d4749334e6a457861546b3262446734626d686a5a4463314e474a77625764785a32526f656d5a77613368784d334a7a4e577476626a4e6f5a6a646b4f435a6c634431324d563970626e526c636d35686246396e61575a66596e6c666157516d593351395a772f36497147316e34504c6e62314756477330332f67697068792e676966",
      link: "https://github.com/MBHunter88/brain_buster_quiz_app",
    },
    {
      id: 4,
      title: "Eventonica",
      description:
        "Eventonica is a web app built with React, Node.js, and PostgreSQL that allows users to manage events. Users can add, delete, search, and update events. The app also includes features like filtering events by category or location. It provides a user-friendly interface for event management and is designed to be responsive across devices.",
      image: "https://camo.githubusercontent.com/9053b4813cb3a704e435b7894d28862f50b19b8d9715e79ed476571f99946b78/68747470733a2f2f692e67697068792e636f6d2f6d656469612f76312e59326c6b505463354d4749334e6a457863586332623238315a6d5668626a5530596e67344e4745774f48683562335579616d3034596d4a77627a5a6d626e593365546c765a535a6c634431324d563970626e526c636d35686246396e61575a66596e6c666157516d593351395a772f58484662343272726f5077474964784e61332f67697068792e676966",
      link: "https://github.com/MBHunter88/eventonica",
    },
    {
      id: 5,
      title: "Animal Sighting Tracker",
      description:
        "Wolf-Bear-Bee is a full-stack web application designed to track endangered species, focusing on the Red Wolf, Sloth Bear, and Rusty Patched Bumble Bee. This app allows scientists to track individual animals, add sightings, and monitor their health and status in the wild. The project is built using the PERN stack (PostgreSQL, Express, React, and Node.js).",
      image: "https://camo.githubusercontent.com/b77bb25a72071144652e1dbefc363aa41a8d528a097bdf6fd934d9b52768ed76/68747470733a2f2f692e67697068792e636f6d2f6d656469612f76312e59326c6b505463354d4749334e6a457864326b784f4841305a5749314e6e6b3363336f314f44426c62546333646e5a36646e49795a6e4130635735734d44467962544a3664695a6c634431324d563970626e526c636d35686246396e61575a66596e6c666157516d593351395a772f485678326c516857794f66784d36543432372f67697068792e676966",
      link: "https://github.com/MBHunter88/animal_sighting_tracker",
    },
      {
      id: 2,
      title: "Dragon Slayer",
      description:
        "Dragon Slayer is a simple, interactive game developed to practice React fundamentals, including state management, component interaction, and conditional rendering. Players can battle the dragon through various attack options, each impacting health points differently. Victory depends on skillful planning and a bit of luck!. React: Built with React for component-based structure and interactivity. CSS: Custom styles for UI components and health bars. JavaScript: Core logic for game mechanics and state management.",
      image: "https://raw.githubusercontent.com/MBHunter88/dragon-slayer/main/public/dragon_slayer.png",
      link: "https://github.com/MBHunter/dragon-slayer",
    },
  ];

  return (
    <div className="projects-page">
      <h1 className="page-title">Recent Projects</h1>
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
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
