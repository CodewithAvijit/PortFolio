import React from "react";

const SkillBadge = ({ text }) => {
  return (
    <span className="
      px-3 py-1 text-xs font-medium
      rounded-full
      bg-gray-900 text-gray-300
      border border-gray-700
      hover:border-blue-500 hover:text-blue-400
      transition
    ">
      {text}
    </span>
  );
};

export default SkillBadge;
