import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GlowCard from '../components/GlowCard';

const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[400px] bg-teal-900/10 rounded-full blur-[100px]" />
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "https://portfolio-backend-t56b.onrender.com/skills";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchSkills = async () => {
      try {
        const res = await axios.get(API_URL);
        setSkills(res.data);
      } catch (err) {
        setSkills([
          { id: 1, skill: "React" },
          { id: 2, skill: "Tailwind CSS" },
          { id: 3, skill: "Node.js" },
          { id: 4, skill: "C++" },
          { id: 5, skill: "Java" },
          { id: 6, skill: "Spring Boot" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <AbyssBackground />

      <div className="relative z-10 px-6 pt-32 pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Avijit <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Technical</span> Stack
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto mb-10"
          >
            Building scalable modern web apps with the technologies listed below.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            <button
              onClick={() => navigate("/projects")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              View Projects
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-slate-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/5 hover:border-slate-500 transition-colors"
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-r-2 border-blue-500 rounded-full animate-spin reverse"></div>
            </div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div key={skill.id || index} variants={itemVariants}>
                <GlowCard
                  title={skill.skill}
                  index={index}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Skills;