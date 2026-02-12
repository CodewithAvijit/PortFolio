import React from "react";
import Button from "./Button";
import SkillBadge from "./SkillBadge";

const ProjectCard = ({
  title,
  description,
  skills = [],
  liveLink,
  codeLink,
}) => {
  return (
    <div className="group relative h-full">
      {/* 1. GLOW EFFECT LAYER 
          Hidden by default, fades in on hover behind the card */}
      <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/30 to-teal-500/30 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* 2. MAIN CARD SURFACE */}
      <div className="
        relative h-full flex flex-col
        bg-[#0a0f16]/80 backdrop-blur-xl
        border border-white/10
        rounded-2xl
        p-6
        transition-all duration-300
        group-hover:border-cyan-500/30
        group-hover:bg-[#0a0f16]/95
        group-hover:-translate-y-2
        shadow-2xl
      ">

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 mt-3 text-sm leading-relaxed flex-grow">
          {description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-800/80 my-5" />

        {/* Skills Area */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill, index) => (
            <SkillBadge key={index} text={skill} />
          ))}
        </div>

        {/* Buttons Area */}
        <div className="flex gap-3 mt-auto">
          {liveLink && (
            <Button
              text="Live Demo"
              onClick={() => window.open(liveLink, "_blank")}
            />
          )}

          {codeLink && (
            <Button
              text="View Repo"
              variant="secondary"
              onClick={() => window.open(codeLink, "_blank")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;