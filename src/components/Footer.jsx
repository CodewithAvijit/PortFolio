import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#02040a] border-t border-white/5 py-8 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">Avijit Bhadra</span>. 
          Built with <span className="text-cyan-500">React Tailwind</span> & <span className="text-blue-500">Springboot</span> .
        </p>
      </div>
    </footer>
  );
};

export default Footer;