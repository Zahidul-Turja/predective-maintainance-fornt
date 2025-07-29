import { FaMobileAlt, FaTabletAlt, FaLaptop, FaDesktop, FaCamera, FaHeadphones } from 'react-icons/fa';

export const supportedDevices = [
  { icon: FaMobileAlt, name: 'Mobile', color: 'bg-blue-100 text-blue-600' },
  { icon: FaTabletAlt, name: 'Tablet', color: 'bg-green-100 text-green-600' },
  { icon: FaLaptop, name: 'Laptop', color: 'bg-purple-100 text-purple-600' },
  { icon: FaDesktop, name: 'Desktop', color: 'bg-red-100 text-red-600' },
  { icon: FaCamera, name: 'Camera', color: 'bg-yellow-100 text-yellow-600' },
  { icon: FaHeadphones, name: 'Accessories', color: 'bg-indigo-100 text-indigo-600' },
];
