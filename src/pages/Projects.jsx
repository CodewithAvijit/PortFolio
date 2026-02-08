import React from "react";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "Personal portfolio built with React and Tailwind CSS showcasing projects and skills.",
      skills: ["React", "Tailwind", "Vite"],
      liveLink: "https://example.com",
      codeLink: "https://github.com/example",
    },
    {
      id: 2,
      title: "AI Frame Recommender",
      description:
        "AI-based real-time frame recommender using ML and computer vision.",
      skills: ["Python", "ML", "OpenCV"],
      codeLink: "https://github.com/example",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* TOP */}
      <Navbar />

      {/* CONTENT */}
      <main className="flex-grow px-6 py-20">
        {/* Heading */}
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Projects
          </h1>
          <p className="text-gray-400 mt-4">
            Some of the things I’ve built recently
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          {projects.length === 0 ? (
            <p className="text-center text-gray-500">
              No projects available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* BOTTOM */}
      <Footer />
    </div>
  );
};

export default Projects;
