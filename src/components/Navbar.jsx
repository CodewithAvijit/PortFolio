import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#02040a]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg shadow-cyan-900/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* --- LOGO --- */}
          <div
            onClick={() => navigate("/")}
            className="text-3xl font-bold text-slate-100 cursor-pointer tracking-tighter hover:text-white transition-colors flex items-center gap-4 group"
          >
            Avijit<span className="text-cyan-500 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all">&nbsp;• Full Stack Developer</span>
          </div>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNav(link.path)}
                  className="relative group py-2"
                >
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {link.name}
                  </span>
                  
                  {/* Glowing Underline for Active/Hover State */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                      isActive ? "w-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "w-0 group-hover:w-full opacity-50"
                    }`}
                  />
                </button>
              );
            })}

            {/* Admin Button */}
            <div className="ml-4">
              <Button
                text="Admin"
                variant="secondary"
                onClick={() => navigate("/login")}
                className="!py-2 !px-5 text-sm"
              />
            </div>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors z-50 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#02040a] md:hidden flex flex-col items-center justify-center space-y-8"
          >
            {/* Background Glow for Mobile Menu */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />

            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => handleNav(link.path)}
                className={`text-2xl font-bold tracking-wide ${
                  location.pathname === link.path
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Button
                text="Admin Portal"
                variant="primary"
                onClick={() => handleNav("/login")}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;