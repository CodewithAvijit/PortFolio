import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ResumeCard from "../components/ResumeCard"; 

const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[400px] bg-teal-900/10 rounded-full blur-[100px]" />
    {/* Noise texture overlay */}
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

const About = () => {
  // This link works perfectly with the Regex fix in ResumeCard
  const resumeLink = "https://drive.google.com/file/d/1tkZivW-YoQRNQkb91GPVbQNaVKlRX7je/view";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-x-hidden scroll-smooth">
      <Navbar />
      <AbyssBackground />

      <main className="flex-grow px-6 pt-32 pb-20 relative z-10 flex items-center justify-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              About <span className="text-blue-500">Me</span>
            </h1>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Text Content Column */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 bg-[#0a0f16]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden hover:border-white/20 transition-colors duration-500 group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />

              <div className="relative z-10 space-y-6 text-slate-400 leading-relaxed text-lg">
                <p>
                  <span className="text-white font-bold text-2xl tracking-tight">Hello! I’m Avijit.</span>
                </p>

                <p>
                  I am a <strong className="text-cyan-400 font-medium">Computer Science student</strong> and 
                  <strong className="text-blue-400 font-medium"> full-stack developer</strong> focused on building 
                  reliable, scalable web applications. I enjoy understanding systems deeply, 
                  from application logic to infrastructure.
                </p>

                <p>
                  My focus is <span className="text-slate-100 font-medium px-1 bg-white/5 rounded">backend engineering</span>—designing 
                  scalable APIs and workflows that emphasize performance and maintainability.
                </p>

                <p>
                  I also explore <span className="text-slate-100 font-medium px-1 bg-white/5 rounded">AI and machine learning</span>, 
                  applying data-driven techniques to solve practical problems.
                </p>
              </div>

              {/* Stats Row */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/5 pt-8">
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-lg tracking-tight">Education</h3>
                  <p className="text-sm text-slate-500">B.Tech, Narula Institute</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-lg tracking-tight">Focus</h3>
                  <p className="text-sm text-slate-500">Web Dev & AI/ML</p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-lg tracking-tight">Location</h3>
                  <p className="text-sm text-slate-500">Kolkata, India</p>
                </div>
              </div>
            </motion.div>

            {/* Resume Card Column */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-1 h-full"
            >
              {/* Added h-full and flex-col to ensure it stretches nicely */}
              <div className="bg-[#0a0f16]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center h-full min-h-[400px] hover:border-white/20 transition-all duration-500 hover:shadow-blue-500/5 group relative overflow-hidden">
                 {/* Subtle inner glow for the card container */}
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                 
                 <div className="relative z-10 w-full">
                    <ResumeCard driveLink={resumeLink} />
                 </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;