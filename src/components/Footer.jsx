import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 text-center">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Avijit Bhadra. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
