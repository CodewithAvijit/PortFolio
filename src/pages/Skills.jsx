import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkillBadge from "../components/SkillBadge";

const Skills = () => {
  const skills = [
    "React",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "Node.js",
    "Python",
    "ML",
    "Git",
    "GitHub",
  ];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-extrabold">Skills</h1>
          <p className="text-gray-400 mt-4">
            Technologies and tools I work with
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8 flex flex-wrap gap-3 justify-center">
          {skills.map((skill, index) => (
            <SkillBadge key={index} text={skill} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Skills;
