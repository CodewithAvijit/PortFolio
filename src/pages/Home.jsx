import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Summary from "../components/Summary";
import Footer from "../components/Footer";
import ProfileCard from "../components/Profile";
import LeetcodeCard from "../components/Leetcodecard";
import SocialMediaCard from "../components/SocialMediaCard";

// --- 1. SPOTLIGHT BACKGROUND COMPONENT ---
const SpotlightBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Static Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000" />
      
      {/* Mouse Follower */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-full blur-[100px]"
        style={{
          left: useMotionTemplate`${mouseX}px`,
          top: useMotionTemplate`${mouseY}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
    </div>
  );
};

// --- 2. 3D TILT CARD WRAPPER ---
const TiltCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 20 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(yPct * -12);
    y.set(xPct * 12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// --- LOADER COMPONENT ---
const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); 
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 2; 
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020405] text-white"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
        <motion.h1 
          className="text-[10rem] sm:text-[14rem] font-bold font-mono tracking-tighter leading-none text-emerald-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {count}%
        </motion.h1>
        <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden mt-8 relative">
           <div className="absolute inset-0 bg-emerald-500/20 blur-[2px]"></div>
          <motion.div 
            className="h-full bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]"
            style={{ width: `${count}%` }}
          />
        </div>
    </motion.div>
  );
};

// --- MAIN HOME COMPONENT ---
const Home = () => {
  const [loading, setLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem("portfolio_visited");
    return !hasVisited;
  });

  const handleLoadingComplete = () => {
    setLoading(false);
    sessionStorage.setItem("portfolio_visited", "true");
  };

  return (
    <div className="bg-[#020405] min-h-[100dvh] text-white selection:bg-emerald-500/30 selection:text-emerald-100 overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="content"
            className="relative flex flex-col min-h-screen"
          >
            <SpotlightBackground />
            <Navbar />

            {/* --- MAIN CONTENT AREA --- */}
            {/* COMPACT UPDATE: Reduced pt-32 to pt-24 for better fit */}
            <main className="flex-grow flex flex-col px-4 sm:px-8 lg:px-16 pt-24 pb-20 relative z-10">
              <div className="max-w-[1400px] mx-auto w-full">
                
                {/* 1. HERO SECTION */}
                {/* COMPACT UPDATE: Reduced mb-24 to mb-12 */}
                <motion.div 
                  className="w-full flex justify-center mb-12"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }} 
                >
                  <div className="text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />
                    <Hero />
                  </div>
                </motion.div>

                {/* 2. BENTO GRID SHOWCASE */}
                {/* COMPACT UPDATE: Reduced gap-8 to gap-6 */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Row 1 Left: Profile Card (5 Cols) */}
                  <motion.div 
                    className="lg:col-span-5 flex flex-col justify-center"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <TiltCard className="h-full flex items-center justify-center">
                        <div className="relative group w-full max-w-md h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
                            <div className="relative bg-[#050a0a] rounded-2xl border border-white/5 p-1 shadow-2xl backdrop-blur-sm h-full">
                                <ProfileCard />
                            </div>
                        </div>
                    </TiltCard>
                  </motion.div>

                  {/* Row 1 Right: LeetCode Card (7 Cols) */}
                  <motion.div 
                    className="lg:col-span-7 flex flex-col justify-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <TiltCard className="h-full flex items-center justify-center">
                        <div className="relative group w-full h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 via-cyan-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
                            <div className="relative bg-[#050a0a] rounded-2xl border border-white/5 p-1 shadow-2xl overflow-hidden flex items-center justify-center min-h-[300px] backdrop-blur-sm h-full">
                                <LeetcodeCard 
                                    username="codewithavijit_2004" 
                                    theme="dark"
                                    width="100%" 
                                />
                            </div>
                        </div>
                    </TiltCard>
                  </motion.div>

                  {/* Row 2: Social Media Card */}
                  {/* FIX: Changed col-span-6 to col-span-12 to fill the empty space */}
                  <motion.div 
                    className="lg:col-span-12 flex flex-col"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                     <TiltCard className="h-full">
                        <div className="relative group w-full h-full">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-700"></div>
                            <div className="relative h-full bg-[#050a0a] rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm">
                                <SocialMediaCard />
                            </div>
                        </div>
                    </TiltCard>
                  </motion.div>
                  
                  {/* Removed the empty placeholder div to fix the layout gap */}

                </div>
              </div>
            </main>

            {/* --- SUMMARY & FOOTER --- */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-10 mt-8" /* Reduced margin-top for compactness */
            >
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-50 mb-0" />
              
              <div className="backdrop-blur-2xl bg-[#010203]/80 border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.9)]">
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