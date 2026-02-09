import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import Navbar from '../components/Navbar';
// 1. Import the SkillBadge Component
import SkillBadge from '../components/SkillBadge'; 

// --- 1. THE MAGICAL CARD COMPONENT ---
const MagicalSkillCard = ({ title, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative border border-white/10 bg-gray-900/50 overflow-hidden rounded-xl px-8 py-10 transition-colors hover:border-white/20"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Spotlight Border */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.4),
              transparent 80%
            )
          `,
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between z-10">
        
        {/* Top Icon Area */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-300">
            <span className="font-mono text-xl font-bold text-emerald-400">
                {title ? title.substring(0, 2).toUpperCase() : "SK"}
            </span>
          </div>
          <div className="flex gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover:bg-emerald-400 animate-pulse"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 group-hover:bg-cyan-400 animate-pulse delay-75"></div>
          </div>
        </div>

        {/* Skill Name & Badge */}
        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors mb-4">
            {title}
          </h3>
          
          {/* 2. REPLACED TEXT WITH SKILL BADGE */}
          <div className="flex items-center">
             <SkillBadge text="Verified Skill" color="emerald" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 2. BACKGROUND COMPONENT ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
     <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-900/10 rounded-full blur-[120px]" />
     <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-900/10 rounded-full blur-[120px]" />
     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
  </div>
);

// --- 3. MAIN COMPONENT ---
const SkillsList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://portfolio-backend-t56b.onrender.com/skills";

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(API_URL);
        setSkills(res.data);
      } catch (err) {
        setError("System Offline. Could not establish connection to Skills DB.");
      } finally {
        setTimeout(() => setLoading(false), 800); 
      }
    };
    fetchSkills();
  }, []);

  if (loading) return (
    <div className="bg-[#020405] min-h-screen text-emerald-500 flex flex-col items-center justify-center font-mono">
       <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-4"></div>
       <div className="animate-pulse tracking-widest">INITIALIZING SKILL MATRIX...</div>
    </div>
  );

  return (
    <div className="bg-[#020405] min-h-screen relative text-slate-100 font-sans selection:bg-emerald-500/30">
      <AmbientBackground />
      
      <div className="relative z-10">
        <Navbar />

        <div className="px-6 py-24 sm:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="inline-block mb-4 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-mono tracking-widest uppercase"
              >
                // System Capabilities
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6"
              >
                Technical <span className="text-emerald-400">Arsenal</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg text-slate-400 leading-relaxed"
              >
                A comprehensive collection of tools, languages, and frameworks 
                powering high-performance applications.
              </motion.p>
            </div>

            {/* ERROR STATE */}
            {error && (
              <div className="p-6 border border-red-500/30 bg-red-500/10 rounded-xl text-red-400 text-center font-mono">
                 ⚠️ {error}
              </div>
            )}

            {/* SKILLS GRID */}
            {!error && skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {skills.map((skill, index) => (
                  <MagicalSkillCard 
                    key={skill.id || index} 
                    title={skill.skill} 
                    index={index} 
                  />
                ))}
              </div>
            ) : (
                !error && (
                    <div className="text-center p-20 border border-dashed border-white/10 rounded-2xl">
                        <p className="text-slate-500">No skills data detected in the matrix.</p>
                    </div>
                )
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsList;