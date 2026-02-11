import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaExclamationCircle 
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

// --- VISUAL ASSETS ---
const AbyssBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none bg-[#02040a]">
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[120px]" />
    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </div>
);

const Contact = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  // --- SOCIAL LINKS DATA ---
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/avijit-bhadra-990a65253/",
      icon: FaLinkedin,
      color: "hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10",
    },
    {
      name: "GitHub",
      url: "https://github.com/CodewithAvijit",
      icon: FaGithub,
      color: "hover:text-white hover:border-white/50 hover:bg-white/10",
    },
  ];

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    // Clear error state when user starts typing again
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Sending data matching your Postman screenshot
      const response = await axios.post("https://portfolio-backend-t56b.onrender.com/contacts", {
        name: formState.name,
        email: formState.email,
        message: formState.message
      });

      if (response.status === 200 || response.status === 201) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("error");
      
      // UX: Improve error message based on response
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Unable to reach the server. Is it running on port 8000?");
      } else {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong. Please try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-200 font-sans selection:bg-cyan-500/30 flex flex-col relative overflow-hidden">
      <Navbar />
      <AbyssBackground />

      <main className="flex-grow pt-32 pb-20 px-6 relative z-10 flex items-center justify-center">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: TEXT & INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Connect.</span>
            </h1>
            
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-lg">
              I'm currently looking for new opportunities in Full-Stack Development and AI. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 text-slate-300 group cursor-pointer" onClick={() => window.location.href = 'mailto:codewithavijit@gmail.com'}>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email Me</p>
                  <p className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    codewithavijit@gmail.com
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="text-lg font-semibold text-white">Kolkata, India</p>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-12 flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: THE FORM */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow Effect behind form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-20" />

            <div className="relative bg-[#0a0f16]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
              
              {status === "success" ? (
                <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-4xl mb-2">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400 font-medium ml-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className="w-full bg-[#02040a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400 font-medium ml-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        className="w-full bg-[#02040a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="yourmail@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium ml-1">Message</label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      value={formState.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full bg-[#02040a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tell me how I can help"
                    />
                  </div>

                  {/* UX: Error Message Display */}
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm border border-red-500/20">
                      <FaExclamationCircle />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button 
                    text={status === "loading" ? "Sending..." : "Send Message"} 
                    variant="primary" 
                    type="submit" 
                    className={`w-full ${status === "loading" ? 'opacity-70 cursor-wait' : ''}`}
                    disabled={status === "loading"}
                  />
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;