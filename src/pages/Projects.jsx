import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- VISUAL ASSETS (Reused for consistency) ---

const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    {/* Central Glow */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
    {/* Bottom Glow */}
    <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[400px] bg-teal-900/10 rounded-full blur-[100px]" />
    {/* Noise Texture */}
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

// --- MAIN COMPONENT ---

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-backend-t56b.onrender.com/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.descripion || item.description,
          codeLink: item.codelink,
          liveLink: item.livelink,
          skills: item.skills ? item.skills.map((s) => s.skill) : [],
        }));

        setProjects(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setLoading(false);
      });
  }, []);

  return (
    // Updated container to match the "Abyss" theme colors
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Component */}
      <AbyssBackground />

      {/* Main Content with Z-Index to sit above background */}
      <main className="flex-grow px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              My <span className="text-[#3b82f6]">Creative</span> Work
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A collection of projects exploring modern web technologies and design.
            </p>
          </div>

          {/* Content Grid */}
          <div className="w-full">
            {loading ? (
              // Custom Spinner matching the Cyan theme
              <div className="flex justify-center h-64 items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : projects.length === 0 ? (
              <p className="text-center text-slate-500 text-lg">
                No projects found in the abyss.
              </p>
            ) : (
              // Grid Layout
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;