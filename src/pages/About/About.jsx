import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 pt-28 space-y-12 text-gray-800">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-blue-700">About Us</h1>

      {/* Intro Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Empowering You to Take Control of Your Device’s Health</h2>
        <p>
          <span className="font-semibold">Predictive Maintenance for Personal Electronics</span> is a smart, user-friendly web
          application built to help you monitor, understand, and extend the lifespan of your smartphones and personal devices.
        </p>
        <p>
          We believe <span className="italic">prevention is better than repair</span>. Most electronic failures can be anticipated
          — and even prevented — with the right data and insights at the right time.
        </p>
      </section>

      {/* What We Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600">What We Do</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Analyze device health:</strong> Understand key metrics from manual input or real-time browser APIs.</li>
          <li><strong>Monitor performance:</strong> Track battery life, overheating, storage, RAM usage, and more.</li>
          <li><strong>Smart maintenance tips:</strong> Get actionable advice tailored to your usage.</li>
          <li><strong>Failure prediction:</strong> Receive warnings and timelines of potential component issues.</li>
          <li><strong>Exportable insights:</strong> Download your personalized report as a PDF.</li>
        </ul>
      </section>

      {/* Why It Matters */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600">Why It Matters</h2>
        <p>
          Devices are essential and expensive. Most users don’t realize that they can prevent breakdowns — they wait
          until something fails. This often leads to higher repair costs and shorter device lifespans.
        </p>
        <p>
          Our goal is to reduce <strong>waste, expense, and frustration</strong> by encouraging smarter, proactive maintenance habits.
        </p>
      </section>

      {/* Privacy */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600">Privacy First</h2>
        <p>
          Your privacy is important to us. All insights and reports are generated <strong>locally in your browser</strong> — no personal
          data is stored or transmitted. You stay in full control of your information.
        </p>
      </section>

      {/* Collaboration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-blue-600">Join Us on the Journey</h2>
        <p>
          We are continuously improving this platform based on real feedback and new technology. Have ideas, suggestions,
          or want to collaborate? Reach out and be a part of the movement toward smarter electronics care.
        </p>
      </section>

      {/* Footer Note */}
      <footer className="text-center text-gray-500 pt-8 border-t mt-12">
        &copy; {new Date().getFullYear()} Predictive Maintenance. All rights reserved.
      </footer>
    </div>
  );
};

export default About;


// import { Card } from '../../components/ui/Card';
// import { Button } from '../../components/ui/Button';
