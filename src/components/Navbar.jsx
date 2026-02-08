import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-black border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-white cursor-pointer"
        >
          Avijit<span className="text-blue-500">.</span>
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-3 flex-wrap">
          
          <Button
            text="Home"
            variant="secondary"
            onClick={() => navigate("/")}
          />

          <Button
            text="About"
            variant="secondary"
            onClick={() => navigate("/about")}
          />

          <Button
            text="Skills"
            variant="secondary"
            onClick={() => navigate("/skills")}
          />

          <Button
            text="Projects"
            variant="secondary"
            onClick={() => navigate("/projects")}
          />

          <Button
            text="Contact"
            variant="secondary"
            onClick={() => navigate("/contact")}
          />

          <Button
            text="Admin"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
