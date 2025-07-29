// src/components/ui/Button.jsx
import React from "react";

const Button = ({ children, type = "button", onClick, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };
