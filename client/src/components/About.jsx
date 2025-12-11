import '../styles/AboutPage.css'; 

const About = () => {
  return (
    <div className="about-page">
      <h1>About Me... </h1>
      <div className="about-content">
        <div className="about-text">
          <p>I was born in Los Angeles and grew up in Compton, California. 
            After several attempts at traditional higher education, I found my path in childcare, 
            where I started as a nanny and grew into a household manager.
             My work eventually led me to birth care, 
             where I became a postpartum doula supporting new families during one of the most transformative times in their lives.
              Along the way, I met my wife, and together we’re planning to grow our family. 
              Beyond my professional work, I’ve stayed involved in community
               initiatives that advocate for better maternal care and help parents find support and connection.
          </p>
        </div>
        <div className="about-image">
          {/* Placeholder for the image */}
          <img src="./headshot.jpg" alt="headshot" />
        </div>
      </div>
      <div>
        <h3>Let&apos;s Connect!</h3>
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

