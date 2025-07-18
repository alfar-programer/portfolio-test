import React from "react";

const ProjectCard = ({ title, description, image, link }) => {
  return (
    <a className="project-card" href={link} target="_blank" rel="noopener noreferrer">
      <div className="project-card-image-wrapper">
        <img src={image} alt={title} className="project-card-image" />
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
      </div>
    </a>
  );
};

export default ProjectCard; 