import React from "react";
import { motion } from "framer-motion";
import "../components/Projects.css";

const projectsData = [
  {
    title: "Al-Hurriya",
    image: "media/Al-Hurriya.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem laudantium cumque voluptas maiores ex amet inventore quas accusamus iusto fuga odio velit error natus, aliquam, pariatur cum, est officiis et.",
    link: "https://al-horria.com/home",
  },
  {
    title: "Store",
    image: "media/Coza-Store-Free-HTML5-eCommerce-Website-Template-1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quibusdam voluptatem aspernatur hic ab numquam fuga voluptatum illo repellendus ratione iste reiciendis provident accusantium ut impedit possimus necessitatibus voluptas quas?",
    link: "https://abdelrahmankhattab.github.io/store/",
  },
  {
    title: "App Web",
    image: "media/app.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://abdelrahmankhattab.github.io/app/",
  },
];

function Projects() {
  return (
    <section className="work projects-scroll-section" id="work">
      <div className="work-header-text">
        <h1>projects</h1>
      </div>
      <div className="projects-scroll-container">
        {projectsData.map((project) => (
          <motion.section
            className="project-slide"
            key={project.title}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <div className="project-slide-content">
              <div className="project-slide-img-wrap">
                <img src={project.image} alt={project.title} className="project-slide-img" />
              </div>
              <div className="project-slide-details">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <button>visit →</button>
                </a>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </section>
  );
}

export default Projects;
