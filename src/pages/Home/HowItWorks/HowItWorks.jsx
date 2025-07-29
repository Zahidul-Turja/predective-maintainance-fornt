import React from 'react';
import StepCard from './StepCard';
import { steps } from './HowItWorksData';

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Just a few easy steps to get real-time diagnostics and maintenance suggestions for your devices.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
