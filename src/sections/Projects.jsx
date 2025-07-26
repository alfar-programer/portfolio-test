import React, { useState, useEffect, useRef } from "react";
import "../components/Projects.css";
import gsap from "gsap";

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
  {
    title: "Coffee Shop",
    image: "/public/images/project3.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://alfar-programer.github.io/coffee/",
  },
  {
    title: "Shoes Store",
    image: "/public/images/project2.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://alfar-programer.github.io/shoes-store/",
  },
  {
    title: "Gym Website",
    image: "/public/images/project1.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://alfar-programer.github.io/gym2/",
  },
  {
    title: "Restaurant",
    image: "/public/images/project4.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://alfar-programer.github.io/restaurant/",
  },
  {
    title: "Gym Website",
    image: "/public/images/project5.png",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aliquam ea nesciunt. Illum quae debitis consequuntur dicta perferendis, non, aliquid est nemo assumenda nobis expedita, molestiae similique. Maxime, modi quibusdam!",
    link: "https://alfar-programer.github.io/GYM/",
  },
];

function Projects() {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const timeoutRef = useRef(null);
  const slideRefs = useRef([]);
  const prevIdx = useRef(0);
  const modalRef = useRef(null);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const next = () => setCurrent((prev) => (prev + 1) % projectsData.length);
    timeoutRef.current = setInterval(next, 8000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  // Reset timer function
  const resetTimer = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    const next = () => setCurrent((prev) => (prev + 1) % projectsData.length);
    timeoutRef.current = setInterval(next, 8000);
  };

  // GSAP animation for all slides
  useEffect(() => {
    projectsData.forEach((_, idx) => {
      if (idx === current) {
        gsap.fromTo(
          slideRefs.current[idx],
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out", pointerEvents: 'auto' }
        );
      } else if (idx === prevIdx.current) {
        gsap.to(slideRefs.current[idx], { opacity: 0, x: -100, duration: 1, ease: "power2.in", pointerEvents: 'none' });
      } else {
        gsap.set(slideRefs.current[idx], { opacity: 0, x: 100, pointerEvents: 'none' });
      }
    });
    prevIdx.current = current;
  }, [current]);

  // GSAP animation for modal
  useEffect(() => {
    if (showModal && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [showModal]);

  const prevProject = () => {
    setCurrent((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    resetTimer();
  };
  const nextProject = () => {
    setCurrent((prev) => (prev + 1) % projectsData.length);
    resetTimer();
  };

  return (
    <section  className="w-full flex flex-col items-center py-12 pt-20 bg-black min-h-[60vh]" id="work">
      <div id="project" className="mb-8 text-center">
        <h1 className="text-6xl font-bold text-white mb-2">Interactive Projects</h1>
        <p className="text-lg text-gray-300">
          <span className="font-semibold text-white">Explore real results</span> from our recent projects. Each solution delivered <span className="font-semibold text-white">measurable business impact</span> for our clients.
        </p>
      </div>
      <div className="relative w-full max-w-7xl h-[600px] flex items-center justify-center bg-neutral-900 rounded-xl shadow-lg overflow-hidden transition-transform duration-500">
        {/* Left Arrow */}
        <button
          className="absolute left-4 z-20 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-2 transition"
          onClick={prevProject}
          aria-label="Previous Project"
        >
          &#8592;
        </button>
        {/* Slides */}
        {projectsData.map((project, idx) => (
          <div
            key={project.title}
            ref={el => (slideRefs.current[idx] = el)}
            className={`absolute top-0 left-0 w-full h-full flex flex-col md:flex-row items-center justify-center px-8 transition-all duration-500 ${idx === current ? 'z-10' : 'z-0 pointer-events-none'}`}
            style={{ opacity: idx === current ? 1 : 0 }}
          >
            <div className="flex-shrink-0 w-150 h-100 flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover rounded-lg w-full h-full shadow-md border-2 border-neutral-700"
              />
            </div>
            <div className="ml-0 md:ml-8 mt-6 md:mt-0 text-center md:text-left">
              <h2 className="text-6xl font-bold text-white mb-12">{project.title}</h2>
              <p className="text-gray-300 mb-12 max-w-md">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-400 hover:bg-blue-500 text-white px-12 py-5 rounded transition font-semibold">Visit →</button>
              </a>
            </div>
          </div>
        ))}
        {/* Right Arrow */}
        <button
          className="absolute right-4 z-20 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full p-2 transition"
          onClick={nextProject}
          aria-label="Next Project"
        >
          &#8594;
        </button>
      </div>
      {/* View All Projects Button (modal to be added) */}
      <div className="mt-8">
        <button
          className="bg-blue-300 hover:bg-blue-400 text-black font-semibold px-12 py-5 rounded shadow transition"
          onClick={() => setShowModal(true)}
        >
          View All Projects →
        </button>
      </div>
      {/* Modal Overlay */}
      {showModal && (
        <div  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div
            ref={modalRef}
            className="relative bg-white rounded-xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-center mb-8 text-black">All Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projectsData.map((project) => (
                <div key={project.title} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition-shadow">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded mb-4 border border-gray-300"
                  />
                  <h3 className="text-lg font-semibold mb-3 text-black text-center">{project.title}</h3>
                 
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <button className="w-full bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded transition font-semibold">Visit →</button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
