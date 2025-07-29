import { FaPlug, FaMicrochip, FaTools } from 'react-icons/fa';

export const steps = [
  {
    icon: FaPlug,
    title: 'Connect Your Device',
    description: 'Use manual input to provide your device’s details like model, usage, and symptoms.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: FaMicrochip,
    title: 'Get Real-Time Insights',
    description: 'We analyze device data and display performance stats using browser-based monitoring.',
    color: 'bg-green-100 text-green-600'
  },
  {
    icon: FaTools,
    title: 'Receive Maintenance Advice',
    description: 'We provide tailored maintenance suggestions to extend your device’s lifespan.',
    color: 'bg-yellow-100 text-yellow-600'
  },
];
