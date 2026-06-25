import './FeaturesSection.css';
import React from 'react';
import { Container } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const features = [
  {
    title: 'AI Health\nInsights',
    image: '/images/whychoose.png',
    icon: <SmartToyOutlinedIcon className="text-primary" />,
    desc: 'Receive personalized health\nrecommendations and risk assessments.',
    bullets: ['Instant symptom analysis', 'Health risk assessment', 'Personalized recommendations']
  },
  {
    title: 'Connected\nMedical Records',
    image: '/images/whychoose1.png',
    icon: <ReceiptLongOutlinedIcon className="text-primary" />,
    desc: 'Access prescriptions, reports, and\nconsultations from one place.',
    bullets: ['All records in one place', 'Easy access anytime', '100% secure & private']
  },
  {
    title: 'Secure Healthcare\nNetwork',
    image: '/images/whychoose2.png',
    icon: <SecurityOutlinedIcon className="text-primary" />,
    desc: 'Enterprise-grade security\nand privacy protection.',
    bullets: ['Instant symptom analysis', 'Health risk assessment', 'Personalized recommendations']
  },
  {
    title: 'Continuous\nCare',
    image: '/images/whychoose3.png',
    icon: <FavoriteBorderOutlinedIcon className="text-primary" />,
    desc: 'From appointments to\nfollow-ups and monitoring.',
    bullets: ['Health tips & articles', 'Lifestyle recommendations', 'Connect with experts']
  }
];

const FeaturesSection = () => {
  return (
    <section className="section-padding">
      <Container maxWidth="lg">
        <div className="text-center mb-24">
          <span className="section-overline">
            WHY CHOOSE US?
          </span>
          <h2 className="section-heading mb-0">
            Healthcare Powered by Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="w-full max-w-[285px] h-[540px] mx-auto flex flex-col rounded-lg border border-[#D0D0D0] shadow-[0_12px_24px_-6px_rgba(0,0,0,0.1)] overflow-hidden bg-white"
            >
              {/* Fallback image wrapper */}
              <div 
                className="h-[60%] relative overflow-hidden flex items-center justify-center bg-[#F9FAFB]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-contain w-full h-full p-4 hidden"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    e.target.style.display = 'block';
                    if(e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                  }}
                />
                <div className="flex items-center justify-center h-full w-full">
                  <span className="text-xs text-gray-500">Image placeholder</span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0F9F6] flex items-center justify-center mr-4 shrink-0">
                    {feature.icon}
                  </div>
                  <h3 className="font-extrabold text-gray-900 leading-tight whitespace-pre-line text-[1.05rem]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-primary mb-6 font-medium leading-relaxed whitespace-pre-line text-sm">
                  {feature.desc}
                </p>
                <ul className="mt-auto space-y-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <div className="min-w-[26px] mt-1">
                        <div className="w-4 h-4 rounded-full bg-[#E5F3F0] flex items-center justify-center">
                          <CheckIcon className="text-[12px] text-primary" style={{ stroke: '#0D8B72', strokeWidth: 1 }} />
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium leading-snug">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
