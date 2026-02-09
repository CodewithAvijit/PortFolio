import React from "react";
import { motion } from "framer-motion";

const SkillBadge = ({ text, color = "blue" }) => {
  // Map standard colors to modern cyberpunk-inspired accents
  const variants = {
    blue: "hover:border-blue-500/50 hover:text-blue-400 group-hover:bg-blue-500/10",
    emerald: "hover:border-emerald-500/50 hover:text-emerald-400 group-hover:bg-emerald-500/10",
    cyan: "hover:border-cyan-500/50 hover:text-cyan-400 group-hover:bg-cyan-500/10",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative inline-block cursor-default"
    >
      {/* Dynamic Glow Effect */}
      <div className={`absolute -inset-1 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500 
        ${color === "blue" ? "bg-blue-500" : "bg-emerald-500"}`} 
      />

      <span className={`
        relative flex items-center gap-2
        px-4 py-1.5 text-sm font-medium
        rounded-full leading-none
        bg-gray-950/80 backdrop-blur-md
        text-gray-400 border border-white/10
        transition-all duration-300 ease-out
        ${variants[color] || variants.blue}
      `}>
        {/* Animated Dot Indicator */}
        <span className={`h-1.5 w-1.5 rounded-full animate-pulse 
          ${color === "blue" ? "bg-blue-500" : "bg-emerald-500"}`} 
        />
        {text}
      </span>
    </motion.div>
  );
};

export default SkillBadge;