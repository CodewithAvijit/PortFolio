import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-white cursor-pointer"
      >
        Avijit<span className="text-blue-500">.</span>
      </h1>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/")} className="nav-link">
          Home
        </button>

        <button onClick={() => navigate("/about")} className="nav-link">
          About
        </button>

        <button onClick={() => navigate("/skills")} className="nav-link">
          Skills
        </button>

        <button onClick={() => navigate("/projects")} className="nav-link">
          Projects
        </button>

        <Button
          text="Contact"
          variant="secondary"
          onClick={() => navigate("/contact")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
