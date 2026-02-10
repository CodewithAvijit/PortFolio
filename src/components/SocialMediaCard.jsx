import React from "react";
import { FaLinkedin, FaGithub, FaCode } from "react-icons/fa"; // Standard icons
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si"; // Specific tech icons

const SocialMediaCard = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/avijit-bhadra-990a65253/", // REPLACE THIS
      icon: <FaLinkedin className="text-3xl text-blue-500 group-hover:text-white transition-colors" />,
      color: "hover:bg-blue-600",
      description: "Professional Network",
    },
    {
      name: "GitHub",
      url: "https://github.com/CodewithAvijit", 
      icon: <FaGithub className="text-3xl text-gray-400 group-hover:text-white transition-colors" />,
      color: "hover:bg-gray-700",
      description: "Code Repositories",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/codewithavijit_2004/", 
      icon: <SiLeetcode className="text-3xl text-yellow-500 group-hover:text-white transition-colors" />,
      color: "hover:bg-yellow-600",
      description: "Problem Solving",
    },
    {
      name: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/profile/avijit20000004", 
      icon: <SiGeeksforgeeks className="text-3xl text-green-500 group-hover:text-white transition-colors" />,
      color: "hover:bg-green-600",
      description: "DSA Practice",
    },
  ];

  return (
    <div className="w-full h-full p-6 flex flex-col justify-center">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-cyan-500 rounded-full"></span>
        Connect
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ${social.color} hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="mb-2 transition-transform duration-300 group-hover:scale-110">
              {social.icon}
            </div>
            <span className="text-sm font-semibold text-gray-300 group-hover:text-white">
              {social.name}
            </span>
            <span className="text-[10px] text-gray-500 mt-1 group-hover:text-white/80">
              {social.description}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaCard;