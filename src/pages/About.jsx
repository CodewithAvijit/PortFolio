import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gray-950 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold mb-6">About Me</h1>

          <p className="text-gray-400 leading-relaxed mb-4">
            I’m Avijit, a Computer Science student and full-stack developer
            passionate about building modern, scalable web applications.
          </p>

          <p className="text-gray-400 leading-relaxed mb-4">
            I work mainly with React, Tailwind CSS, and backend technologies.
            I’m also deeply interested in AI, ML, and real-world problem solving.
          </p>

          <p className="text-gray-400 leading-relaxed">
            My goal is to become a strong full-stack engineer and work on
            impactful products.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
