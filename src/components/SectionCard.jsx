// components/SectionCard.jsx
import React from "react";

const SectionCard = ({ title, children, icon }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6 h-fit transition-transform hover:scale-[1.02] duration-300">
    <h2 className="text-xl font-semibold mb-4 flex items-center text-indigo-600">
      {icon && <span className="mr-2 text-2xl">{icon}</span>}
      {title}
    </h2>
    <div className="space-y-1 text-gray-700">{children}</div>
  </div>
);

export default SectionCard;
