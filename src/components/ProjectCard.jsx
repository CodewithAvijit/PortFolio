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
    <div className="
      bg-gray-950
      border border-gray-800
      rounded-2xl
      p-6
      transition
      hover:-translate-y-1
      hover:border-blue-600
      hover:shadow-lg hover:shadow-blue-500/10
    ">

      {/* Title */}
      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 mt-3 text-sm leading-relaxed">
        {description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800 my-4" />

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <SkillBadge key={index} text={skill} />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        {liveLink && (
          <Button
            text="Live"
            onClick={() => window.open(liveLink, "_blank")}
          />
        )}

        {codeLink && (
          <Button
            text="Code"
            variant="secondary"
            onClick={() => window.open(codeLink, "_blank")}
          />
        )}
      </div>
    </div>
  );
};



export default ProjectCard;
