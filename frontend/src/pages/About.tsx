// ✅ Correct
import React from 'react';
import './About.css';



const About: React.FC = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About  Dairy Farm</h1>
        <p>
          Establish in coming soon,  Farm is a family-owned business located in the heart of Telangana.
          Our mission is to deliver premium-quality dairy products directly to your doorstep.
        </p>
        <p>
          From farm-fresh milk to homemade curd and paneer, everything we produce is 100% organic, free from harmful
          chemicals, and rich in taste.
        </p>
        <p>
          We care deeply about our cows and our community. Hygiene, sustainability, and transparency are at the core of
          what we do.
        </p>
        <p>
          Visit us and discover why so many trust us with their family’s daily nutrition!
        </p>
      </div>
    </div>
  );
};

export default About;

