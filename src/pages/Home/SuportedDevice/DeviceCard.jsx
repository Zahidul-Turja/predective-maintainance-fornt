import React from 'react';

const DeviceCard = ({ icon: Icon, name, color }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition">
      <div className={`p-3 rounded-full text-3xl ${color}`}>
        <Icon />
      </div>
      <p className="mt-3 font-medium text-gray-700">{name}</p>
    </div>
  );
};

export default DeviceCard;
