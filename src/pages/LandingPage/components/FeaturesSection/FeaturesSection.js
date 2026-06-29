import './FeaturesSection.css';
import React from 'react';
import { Container } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const features = [
  {
    title: 'AI Health\nInsights',
    image: '/images/whychoose.png',
    icon: '/images/Group.svg',
    desc: 'Receive personalized health\nrecommendations and risk assessments.',
    bullets: ['Instant symptom analysis', 'Health risk assessment', 'Personalized recommendations']
  },
  {
    title: 'Connected\nMedical Records',
    image: '/images/whychoose1.png',
    icon: '/images/Records.svg',
    desc: 'Access prescriptions, reports, and\nconsultations from one place.',
    bullets: ['All records in one place', 'Easy access anytime', '100% secure & private']
  },
  {
    title: 'Secure Healthcare\nNetwork',
    image: '/images/whychoose2.png',
    icon: '/images/Insurance.svg',
    desc: 'Enterprise-grade security\nand privacy protection.',
    bullets: ['Instant symptom analysis', 'Health risk assessment', 'Personalized recommendations']
  },
  {
    title: 'Continuous\nCare',
    image: '/images/whychoose3.png',
    icon: '/images/Monitor.svg',
    desc: 'From appointments to\nfollow-ups and monitoring.',
    bullets: ['Health tips & articles', 'Lifestyle recommendations', 'Connect with experts']
  }
];

const FeaturesSection = () => {
  return (
    <section className="section-padding">
      <Container maxWidth="lg">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wide uppercase block mb-4">
            WHY CHOOSE US?
          </span>
          <h2 className="text-gray-900 font-semibold text-3xl md:text-4xl lg:text-[2.5rem] leading-tight mb-0">
            Healthcare Powered by Intelligence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="w-full h-[580px] mx-auto flex flex-col rounded-[20px] border border-gray-200 overflow-hidden bg-white"
              style={{ boxShadow: '0 8px 30px -10px rgba(0,0,0,0.06)' }}
            >
              {/* Image filling the top area */}
              <div className="h-[45%] w-full relative shrink-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#F0F9F6] flex items-center justify-center mr-3 shrink-0">
                    <img src={feature.icon} alt="Icon" className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 leading-tight whitespace-pre-line text-[0.95rem]">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-primary mb-6 font-medium leading-snug whitespace-pre-line text-[0.8rem]">
                  {feature.desc}
                </p>
                
                <ul className="mt-auto space-y-2.5">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start">
                      <div className="min-w-[20px] mt-[1px]">
                        <CheckIcon className="text-[14px]" style={{ color: '#0D8B72', stroke: '#0D8B72', strokeWidth: 1 }} />
                      </div>
                      <span className="text-[0.75rem] text-gray-500 font-medium leading-snug">
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
