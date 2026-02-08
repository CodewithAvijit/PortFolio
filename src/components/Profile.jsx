import React from "react";
import profileImg from "../assets/PROFILEPIC.jpg";

const Profile = () => {
  return (
    <div className="
      bg-gray-950 border border-gray-800 rounded-2xl
      p-6 md:p-8
      w-full max-w-sm
      text-center
      shadow-xl shadow-blue-500/10
    ">
      <img
        src={profileImg}
        alt="Profile"
        className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover border-4 border-blue-600"
      />

      <h2 className="text-xl md:text-2xl font-bold text-white mt-4">
        Avijit Bhadra
      </h2>

      <p className="text-gray-400 text-sm md:text-base mt-1">
        Full-Stack Developer • AI Enthusiast
      </p>

      <p className="text-gray-500 text-sm mt-3">
        Building modern web apps with React, Tailwind & AI-driven solutions.
      </p>
    </div>
  );
};

export default Profile;
