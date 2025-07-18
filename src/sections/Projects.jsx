import React from "react";

const projectsData = [
  {
    title: "Al-Hurriya",
    image: "media/Al-Hurriya.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem laudantium cumque voluptas maiores ex amet inventore quas accusamus iusto fuga odio velit error natus, aliquam, pariatur cum, est officiis et.",
    link: "https://al-horria.com/home",
    reverse: false,
  },
  {
    title: "Store",
    image: "media/Coza-Store-Free-HTML5-eCommerce-Website-Template-1.jpg",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, quibusdam voluptatem aspernatur hic ab numquam fuga voluptatum illo repellendus ratione iste reiciendis provident accusantium ut impedit possimus necessitatibus voluptas quas?",
    link: "https://abdelrahmankhattab.github.io/store/",
    reverse: true,
  },
  {
    title: "App Web",
    image: "media/app.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://abdelrahmankhattab.github.io/app/",
    reverse: false,
  },
];

const ProjectItem = ({ title, image, description, link, reverse }) => (
  <div className={`worksection ${reverse ? "reverse" : "norm"}`}>
    <div className={`leftwork ${reverse ? "rightimg" : ""}`}>
      <img className="imgwork" src={image} alt={title} />
    </div>
    <div className="rightwork">
      <h4>{title}</h4>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button>visit →</button>
      </a>
    </div>
  </div>
);

function Projects() {
  return (
    <section className="work" id="work">
      <div className="work-header-text">
        <h1>projects</h1>
      </div>

      <div className="workhider"></div>

      <div className="projects">
        {projectsData.map((project, index) => (
          <ProjectItem key={index} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
