import React from 'react';
import { motion } from 'framer-motion';

const GlowCard = ({ title, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative h-full rounded-2xl"
    >
      {/* 1. PERSISTENT OUTER GLOW (Bioluminescence) */}
      {/* This creates a soft, constant teal glow behind the card */}
      <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-2xl blur-md opacity-70 transition duration-500 group-hover:opacity-100 group-hover:blur-lg" />

      {/* 2. MAIN CARD SURFACE */}
      <div className="relative h-full bg-[#0a0f16]/90 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 group-hover:border-cyan-500/40 group-hover:bg-[#0a0f16] overflow-hidden">
        
        {/* SUBTLE INNER LIGHT ON HOVER */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* HEADER Section */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          
          {/* GLOWING ICON */}
          <div className="h-12 w-12 rounded-full border border-cyan-500/30 bg-cyan-950/30 flex items-center justify-center group-hover:border-cyan-400/60 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300">
            {/* Inner subtle glow for the icon */}
            <div className="absolute inset-1 rounded-full bg-cyan-400/10 blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="font-bold text-cyan-300 text-lg relative z-10">
              {title ? title.substring(0, 1).toUpperCase() : "S"}
            </span>
          </div>
          
          {/* TECH STATUS BADGE */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-900/50 bg-cyan-950/30 text-[10px] font-medium text-cyan-300/80 tracking-wider">
             <span className="relative flex h-1.5 w-1.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
             </span>
             ACTIVE
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
        </div>

      </div>
    </motion.div>
  );
};

export default GlowCard;