import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import GlowCard from '../components/GlowCard';

// --- VISUAL ASSETS ---

// 1. The Deep Abyss Background
// mimics the radial fade in Screenshot 1
const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    {/* Subtle central glow to break the flat black */}
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />

    {/* Bottom glow */}
    <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[400px] bg-teal-900/10 rounded-full blur-[100px]" />

    {/* Optional: subtle noise for texture */}
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

// --- MAIN COMPONENT ---

const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://portfolio-backend-t56b.onrender.com/skills";

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(API_URL);
        setSkills(res.data);
      } catch (err) {
        // Fallback data if API fails
        setSkills([
          { id: 1, skill: "React" },
          { id: 2, skill: "Tailwind CSS" },
          { id: 3, skill: "Node.js" },
          { id: 4, skill: "C++" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30">
      <Navbar />
      <AbyssBackground />


      <div className="relative z-10 px-6 pt-32 pb-20 max-w-7xl mx-auto">

        {/* Header Section replicating Screenshot 1 typography */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Avijit <span className="text-[#3b82f6]">Technical</span> Stack
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Building scalable modern web apps with the technologies listed below.
          </motion.p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/projects")}
              className="bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition shadow-[0_4px_14px_0_rgba(29,78,216,0.39)]"
            >
              View Projects
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-slate-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/5 transition"
            >
              Contact Me
            </button>
          </div>

        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <GlowCard
                key={skill.id || index}
                title={skill.skill}
                index={index}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default SkillsList;