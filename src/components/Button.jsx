import React from "react";

const Button = ({
  text,
  children, // Added children support for flexibility
  onClick,
  variant = "primary",
  type = "button",
  className = "", // Allow passing extra classes
}) => {
  // Base styles: Fonts, transitions, and focus states
  const base =
    "px-6 py-3 rounded-lg font-medium transition-all duration-300 active:scale-95 focus:outline-none flex items-center justify-center";

  const variants = {
    // Matches the "View Projects" button: Deep Blue with a specific glow/shadow
    primary: 
      "bg-[#1d4ed8] text-white hover:bg-blue-600 shadow-[0_4px_14px_0_rgba(29,78,216,0.39)] hover:shadow-[0_6px_20px_rgba(29,78,216,0.23)]",
    
    // Matches the "Contact Me" button: Transparent with Slate border
    secondary:
      "bg-transparent border border-slate-700 text-slate-200 hover:bg-white/5 hover:border-slate-500 hover:text-white",
    
    // Cyan variant (good for 'Live Demo' buttons)
    cyan: 
      "bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",

    // Danger variant for delete actions
    danger: 
      "bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300",
  };

  // Allow 'text' prop OR children (e.g. <Button>Click Me</Button>)
  const content = text || children;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </button>
  );
};

export default Button;