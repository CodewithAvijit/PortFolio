import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[80vh] flex items-center justify-center text-center px-6">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          Hi, I’m <span className="text-blue-500">Avijit</span>
        </h1>

        <p className="text-gray-400 text-lg">
          Full-Stack Developer • AI Enthusiast • Building scalable modern web apps
        </p>

        <div className="flex justify-center gap-4">
          <Button
            text="View Projects"
            onClick={() => navigate("/projects")}
          />
          <Button
            text="Contact Me"
            variant="secondary"
            onClick={() => navigate("/contact")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
