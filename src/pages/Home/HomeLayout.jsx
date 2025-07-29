import HeroSection from './HeroSection/HeroSection';
import HowItWorks from './HowItWorks/HowItWorks';
import SupportedDevices from './SuportedDevice/SupportedDevices';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import Testimonials from './Testimonials/Testimonials';
// import { Link } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />
      <HowItWorks />
      <SupportedDevices />
      <WhyChooseUs />
      <Testimonials />

  
    </div>
  );
};

export default HomeLayout;
