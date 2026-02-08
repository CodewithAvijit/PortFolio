import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Summary from "../components/Summary";
import Footer from "../components/Footer";
import ProfileCard from "../components/Profile";

// --- LOADER COMPONENT ---
const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate a loading counter (0% to 100%)
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit at 100% before clearing
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1; // Random jump
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="text-right">
        <motion.h1 
          className="text-9xl font-bold font-mono tracking-tighter"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count}%
        </motion.h1>
        <div className="h-1 w-full bg-gray-800 mt-4 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN HOME COMPONENT ---
const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#030303] min-h-[100dvh] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col min-h-screen"
          >
            
            {/* --- AMBIENT BACKGROUNDS --- */}
            {/* The "Cyberpunk" Mesh Gradient */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen" />
                {/* Dot Grid Texture */}
                <div className="absolute inset-0 opacity-[0.15]" 
                     style={{ backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>
            </div>

            <Navbar />

            {/* --- MAIN HERO SECTION --- */}
            <main className="flex-grow flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-28 pb-16 lg:pt-0">
              <div className="max-w-[1400px] mx-auto w-full">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                  
                  {/* HERO TEXT AREA (Takes up 7 cols on Desktop) */}
                  <motion.div 
                    className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  >
                    <Hero />
                  </motion.div>

                  {/* PROFILE CARD AREA (Takes up 5 cols on Desktop) */}
                  <motion.div 
                    className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
                    initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, type: "spring", bounce: 0.4 }}
                  >
                    <div className="relative group w-full max-w-md">
                      {/* Interactive Glow behind card that moves on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      
                      <div className="relative">
                        <ProfileCard />
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </main>

            {/* --- SUMMARY & FOOTER STAGGERED ENTRY --- */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative z-10"
            >
              <div className="backdrop-blur-xl bg-white/5 border-t border-white/10">
                <Summary />
              </div>
              <Footer />
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;