import React from 'react';
import DeviceCard from './DeviceCard';
import { supportedDevices } from './supportedDevicesData';

const SupportedDevices = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Devices We Support
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Our platform provides predictive maintenance for a wide range of personal electronics.
        </p>
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {supportedDevices.map((device, index) => (
            <DeviceCard key={index} {...device} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportedDevices;
