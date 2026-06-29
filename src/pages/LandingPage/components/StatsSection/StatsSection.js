import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@mui/material';

const StatIcon = ({ color }) => (
  <svg width="28" height="32" viewBox="0 0 38 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.751 24.751C0.752005 19.9516 0.752004 17.5519 0.752004 16.752C0.752004 15.9521 0.752005 13.5524 9.751 8.753M9.751 8.753C18.75 13.5504 18.75 15.9521 18.75 16.752C18.75 17.5519 18.75 19.9516 9.751 24.751C0.752005 29.5504 0.752004 31.1502 0.752004 32.75M9.751 8.753C18.75 3.9536 18.75 2.3538 18.75 0.754M9.751 8.753L5.37577 6.23931C0.75 3.31568 0.75 2.03384 0.75 0.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23.6721 20.75V24.71M16.75 27.75H20.8234M32.6746 27.75H36.75M32.6765 33.698H36.75M16.75 33.698H20.8234M23.6721 36.79V40.748M29.677 36.788V40.75M29.6572 20.75V24.708M22.8086 36.684H30.6895C31.2159 36.684 31.7209 36.4733 32.0931 36.0982C32.4654 35.7231 32.6746 35.2144 32.6746 34.684V26.71C32.6746 26.1796 32.4654 25.6709 32.0931 25.2958C31.7209 24.9207 31.2159 24.71 30.6895 24.71H22.8086C22.2821 24.71 21.7772 24.9207 21.4049 25.2958C21.0326 25.6709 20.8234 26.1796 20.8234 26.71V34.686C20.8234 35.2164 21.0326 35.7251 21.4049 36.1002C21.7772 36.4753 22.2821 36.686 22.8086 36.686V36.684Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const statsData = [
  { end: 1,    suffix: 'M+',   label: 'Patients Supported',       iconColor: '#6B0953', bgColor: '#F4EEF3' },
  { end: 50,   suffix: 'K+',   label: 'Appointments Completed',   iconColor: '#093D6B', bgColor: '#EBF4FC' },
  { end: 500,  suffix: '+',    label: 'Healthcare Providers',      iconColor: '#22096B', bgColor: '#F6F4FC' },
  { end: 99.9, suffix: '%',    label: 'Platform Availability',     iconColor: '#6B3309', bgColor: '#FEF2E9' },
];

const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const isDecimal = end % 1 !== 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * end;
      setCount(isDecimal ? parseFloat(value.toFixed(1)) : Math.floor(value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const StatCard = ({ end, suffix, label, iconColor, bgColor, start }) => {
  const count = useCountUp(end, 2000, start);
  return (
    <div className="
      group
      flex flex-col
      p-8
      rounded-[16px]
      border-[1px] border-[#D0D0D0]
      bg-white
      hover:shadow-xl hover:shadow-gray-200/50
      transition-all duration-300
      min-h-[220px]
    ">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: bgColor }}
      >
        <StatIcon color={iconColor} />
      </div>

      {/* CountUp Number + Label */}
      <div className="mt-auto">
        <h3 className="text-[#0D1412] font-extrabold text-[28px] leading-none mb-2">
          {count}{suffix}
        </h3>
        <p className="text-[#4D4D4D] font-medium text-[13px] tracking-tight">
          {label}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStartCount(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="mb-12 text-left">
          <p className="text-[#096B58] font-semibold text-sm tracking-wide uppercase mb-3">
            Our Impact in Numbers
          </p>
          <h2 className="text-[#141414] font-bold text-3xl md:text-4xl lg:text-[2.6rem] leading-tight max-w-[700px]">
            Healthcare you can trust,<br />
            backed by <span className="text-[#096B58]">real results</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} start={startCount} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
