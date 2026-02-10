import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden">
      
      {/* Optional: Local Background Glow if not provided by parent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-blue-900/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto space-y-8 z-10">
        

        {/* 2. Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
        >
          Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Avijit</span>
          <br />
          <span className="text-4xl md:text-6xl text-slate-400">Building Digital Experiences.</span>
        </motion.h1>

        {/* 3. Subheadline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Full-Stack Developer & AI Enthusiast. I craft scalable modern web apps 
          with a focus on performance and user experience.
        </motion.p>

        {/* 4. Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
        >
          <Button
            text="View My Work"
            variant="primary"
            onClick={() => navigate("/projects")}
          />
          <Button
            text="Contact Me"
            variant="secondary"
            onClick={() => navigate("/contact")}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;