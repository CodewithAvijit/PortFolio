import React from "react";

const Button = ({
  text = "Button",
  onClick,
  variant = "primary",
  type = "button",
}) => {
  const base =
    "px-6 py-3 rounded-lg font-medium transition active:scale-95 focus:outline-none";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "border border-gray-600 text-white hover:bg-gray-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {text}
    </button>
  );
};

export default Button;
