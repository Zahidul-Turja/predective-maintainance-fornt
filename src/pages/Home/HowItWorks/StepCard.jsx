import React from 'react';

const StepCard = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition text-left">
      <div className={`text-4xl mb-4 p-3 rounded-full inline-block ${color}`}>
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default StepCard;
