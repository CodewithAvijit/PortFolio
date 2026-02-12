import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[400px] bg-teal-900/10 rounded-full blur-[100px]" />
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch("https://portfolio-backend-t56b.onrender.com/projects")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch projects");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-x-hidden scroll-smooth">
      <Navbar />
      <AbyssBackground />

      <main className="flex-grow px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Creative</span> Work
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              A collection of projects exploring modern web technologies, 
              scalable architectures, and intuitive design.
            </p>
          </motion.div>

          <div className="w-full">
            {loading ? (
              <div className="flex flex-col justify-center h-64 items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
                <p className="text-cyan-500/50 text-sm font-medium animate-pulse">Scanning the abyss...</p>
              </div>
            ) : projects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 bg-white/5 rounded-3xl border border-white/10"
              >
                <p className="text-slate-500 text-lg">No projects found in the abyss.</p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
              >
                {projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants}>
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;