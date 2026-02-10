import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button"; // Assuming you might want a button inside

// Reusing the Background Component for consistency
const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-cyan-900/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-0 w-[40vw] h-[400px] bg-teal-900/10 rounded-full blur-[100px]" />
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      <Navbar />
      <AbyssBackground />

      <main className="flex-grow px-6 pt-32 pb-20 relative z-10 flex items-center justify-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full"
        >

          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              About <span className="text-blue-500">Me</span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto md:mx-0" />
          </div>

          {/* Glass Card Content */}
          <div className="bg-[#0a0f16]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

            {/* Decorative decorative gradient blob inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10 space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                <span className="text-white font-semibold text-xl">Hello! I’m Avijit.</span>
              </p>

              <p>
                I am a <strong className="text-cyan-400">Computer Science student</strong> and
                <strong className="text-blue-400"> full-stack developer</strong> with a strong focus on building
                reliable, scalable, and well-structured web applications. I enjoy understanding systems deeply,
                from application logic to underlying infrastructure.
              </p>

              <p>
                My primary focus is on <span className="text-slate-200 border-b border-slate-700">backend engineering</span>,
                where I design scalable APIs, data models, and system workflows that emphasize performance,
                reliability, and maintainability. I work with modern backend technologies to build
                well-structured services that support real-world application demands.
              </p>

              <p>
                In parallel, I have a strong interest in
                <span className="text-slate-200 border-b border-slate-700"> artificial intelligence and machine learning</span>,
                particularly in applying data-driven techniques to solve practical problems and enhance
                application intelligence. I enjoy exploring how backend systems and AI can work together
                to deliver smarter, more adaptive solutions.
              </p>


            </div>

            {/* Optional Stats / Highlights Row */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/5 pt-8">
              <div>
                <h3 className="text-white font-bold text-xl">Education</h3>
                <p className="text-sm text-slate-500 mt-1">Btech Narula Institute of Technology</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Focus</h3>
                <p className="text-sm text-slate-500 mt-1">Web Dev & AIML</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Location</h3>
                <p className="text-sm text-slate-500 mt-1">Kolkata</p>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;