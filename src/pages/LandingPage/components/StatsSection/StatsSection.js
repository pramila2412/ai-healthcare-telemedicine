import './StatsSection.css';
import React from 'react';
import { Container } from '@mui/material';

const GroupIcon = (props) => (
  <svg {...props} viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
    <path d="M9.751 24.751C0.752005 19.9516 0.752004 17.5519 0.752004 16.752C0.752004 15.9521 0.752005 13.5524 9.751 8.753M9.751 8.753C18.75 13.5504 18.75 15.9521 18.75 16.752C18.75 17.5519 18.75 19.9516 9.751 24.751C0.752005 29.5504 0.752004 31.1502 0.752004 32.75M9.751 8.753C18.75 3.9536 18.75 2.3538 18.75 0.754M9.751 8.753L5.37577 6.23931C0.75 3.31568 0.75 2.03384 0.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.6721 20.75V24.71M16.75 27.75H20.8234M32.6746 27.75H36.75M32.6765 33.698H36.75M16.75 33.698H20.8234M23.6721 36.79V40.748M29.677 36.788V40.75M29.6572 20.75V24.708M22.8086 36.684H30.6895C31.2159 36.684 31.7209 36.4733 32.0931 36.0982C32.4654 35.7231 32.6746 35.2144 32.6746 34.684V26.71C32.6746 26.1796 32.4654 25.6709 32.0931 25.2958C31.7209 24.9207 31.2159 24.71 30.6895 24.71H22.8086C22.2821 24.71 21.7772 24.9207 21.4049 25.2958C21.0326 25.6709 20.8234 26.1796 20.8234 26.71V34.686C20.8234 35.2164 21.0326 35.7251 21.4049 36.1002C21.7772 36.4753 22.2821 36.686 22.8086 36.686V36.684Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const stats = [
  {
    number: '1M+',
    label: 'Patients Supported',
    icon: <GroupIcon className="text-[#6B0953] text-[32px]" />, 
    bgColor: '#F4EEF3'
  },
  {
    number: '50K+',
    label: 'Appointments Completed',
    icon: <GroupIcon className="text-[#093D6B] text-[32px]" />, 
    bgColor: '#EBF4FC'
  },
  {
    number: '500+',
    label: 'Healthcare Providers',
    icon: <GroupIcon className="text-[#22096B] text-[32px]" />, 
    bgColor: '#F6F4FC'
  },
  {
    number: '99.9%',
    label: 'Platform Availability',
    icon: <GroupIcon className="text-[#6B3309] text-[32px]" />, 
    bgColor: '#FEF2E9'
  }
];

const StatsSection = () => {
  return (
    <section className="section-padding">
      <Container maxWidth="lg">
        <div className="mb-12 max-w-[800px]">
          <p className="text-primary font-medium mb-4 text-[15px]">
            Our Impact In Numbers
          </p>
          <h2 className="text-gray-900 font-semibold text-3xl md:text-[2.5rem] leading-snug">
            Healthcare you can trust,<br />
            backed by <span className="text-primary">real results</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="p-7 rounded-2xl border border-gray-200 flex flex-col w-full max-w-[260px] h-[260px] mx-auto justify-between bg-white transition-all duration-300 ease-in-out hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.02)]"
            >
              <div 
                className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: stat.bgColor }}
              >
                {stat.icon}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-[1.75rem]">
                  {stat.number}
                </h3>
                <p className="text-[#4D4D4D] font-medium text-xs">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
