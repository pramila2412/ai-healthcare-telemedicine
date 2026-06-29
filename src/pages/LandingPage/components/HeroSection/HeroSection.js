import './HeroSection.css';
import React from 'react';
import { Button, Container, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

const HeroSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-6">
          
          {/* Left Content Column */}
          <div className="flex-1">
            <div className="md:pr-8">
              <div className="flex items-center mb-6 border border-gray-200 rounded-full px-4 py-2 w-fit bg-[#F8FAFC]">
                <AutoAwesomeIcon className="text-primary text-base mr-2" />
                <span className="text-primary font-semibold text-xs tracking-wide">
                  AI-Powered Healthcare Ecosystem
                </span>
              </div>
              
              <h1 className="mb-6 text-gray-900 text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-tight">
                One Platform for the Entire{' '}
                <span className="text-primary">
                  Healthcare
                </span>{' '}
                Ecosystem
              </h1>
              
              <p className="mb-8 text-gray-500 text-lg leading-relaxed max-w-[600px]">
                Connect Patients, Doctors, Hospitals, Laboratories, Pharmacies, Insurance, and Healthcare providers through one secure AI-powered platform.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button className="px-6 py-3 flex items-center justify-center gap-2 text-base font-normal bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors border-none cursor-pointer">
                  <CalendarMonthIcon className="text-[20px]" />
                  Book Appointment
                </button>
                <button className="px-6 py-3 flex items-center justify-center gap-2 text-base font-normal border border-primary text-primary bg-transparent rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                  <VideocamOutlinedIcon className="text-[20px]" />
                  Consult Online
                </button>
              </div>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap gap-4 sm:gap-4 justify-between w-full lg:w-[115%] relative z-10">
              {[
                { icon: <VerifiedUserOutlinedIcon className="text-primary text-[20px]" />, title: 'Trusted by', desc: '1M+ Patients' },
                { icon: <VerifiedOutlinedIcon className="text-primary text-[20px]" />, title: 'Verified', desc: 'Healthcare Experts' },
                { icon: <LockOutlinedIcon className="text-primary text-[20px]" />, title: 'Secure & Confidential', desc: 'Your data is protected' },
                { icon: <HeadsetMicOutlinedIcon className="text-primary text-[20px]" />, title: '24/7 Care', desc: "We're here for you" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7FBFA] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#666666] text-xs leading-tight">
                      {item.title}
                    </p>
                    <p className="font-normal text-[#666666] text-[0.7rem]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image Column */}
          <div className="flex-1 flex justify-center w-full relative">
            <div className="relative w-full max-w-[700px] flex justify-end">
              <img
                src="/images/hero-image.png"
                alt="Doctor with patient"
                className="w-full h-auto object-contain z-10"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                }}
              />
              
              {/* Floating Card 1: Consult Online (Top Right) */}
              <Paper elevation={3} className="absolute top-10 right-0 p-3 rounded-xl flex items-center gap-3 z-20 min-w-[200px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
                 <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <VideocamOutlinedIcon className="text-primary text-[20px]" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900 text-sm">Consult Online</p>
                   <p className="text-[#556660] text-[0.7rem]">Connect in Few Seconds</p>
                 </div>
              </Paper>

              {/* Floating Card 2: Find Doctors (Top Left) */}
              <Paper elevation={3} className="absolute top-[140px] -left-5 p-3 rounded-xl flex items-center gap-3 z-20 min-w-[180px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
                 <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <PersonSearchOutlinedIcon className="text-primary text-[20px]" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900 text-sm">Find Doctors</p>
                   <p className="text-[#556660] text-[0.7rem]">Verified specialists</p>
                 </div>
              </Paper>

              {/* Floating Card 3: Lab Tests (Bottom Left) */}
              <Paper elevation={3} className="absolute bottom-[60px] left-10 p-3 rounded-xl flex items-center gap-3 z-20 min-w-[180px] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)]">
                 <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <ScienceOutlinedIcon className="text-primary text-[20px]" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900 text-sm">Lab Tests</p>
                   <p className="text-[#556660] text-[0.7rem]">Book tests at home</p>
                 </div>
              </Paper>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
