import './ServicesSection.css';
import React from 'react';
import { Container } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import doctorIcon from '../../../../assets/LandingPage/Doctor.svg';
import groupIcon from '../../../../assets/LandingPage/Group.svg';
import pharmacyIcon from '../../../../assets/LandingPage/Pharmacy.svg';
import recordsIcon from '../../../../assets/LandingPage/Records.svg';
import insuranceIcon from '../../../../assets/LandingPage/Insurance.svg';
import monitorIcon from '../../../../assets/LandingPage/Monitor.svg';

const services = [
  {
    title: 'Doctor\nConsultation',
    description: 'Book appointments\nwith verified doctors\nacross specialities.',
    icon: <img src={doctorIcon} alt="Doctor" style={{ width: 24, height: 24 }} />
  },
  {
    title: 'Lab Tests',
    description: 'Book lab tests at\nhome with certified\nlaboratories.',
    icon: <img src={groupIcon} alt="Lab Tests" style={{ width: 24, height: 24 }} />
  },
  {
    title: 'Online\nPharmacy',
    description: 'Order medicines\nonline and get them\ndelivered to your doorstep.',
    icon: <img src={pharmacyIcon} alt="Pharmacy" style={{ width: 24, height: 24 }} />
  },
  {
    title: 'Health\nRecords',
    description: 'Access prescriptions,\nreports and medical\nhistory securely.',
    icon: <img src={recordsIcon} alt="Records" style={{ width: 24, height: 24 }} />
  },
  {
    title: 'Insurance\nClaims',
    description: 'Verify coverage, file\nclaims and track\napprovals.',
    icon: <img src={insuranceIcon} alt="Insurance" style={{ width: 24, height: 24 }} />
  },
  {
    title: 'Remote\nMonitoring',
    description: 'Track your vitals and\nstay connected with\nyour care team.',
    icon: <img src={monitorIcon} alt="Monitor" style={{ width: 24, height: 24 }} />
  }
];

const popularSearches = ['Dermatologist', 'Gynecologist', 'Paediatrician', 'Orthopaedic', 'Dentist'];

const ServicesSection = () => {
  return (
    <section className="py-10 md:py-16 bg-white">
      <Container maxWidth="lg">
        

        {/* Services Header */}
        <div className="mb-12 max-w-[800px]">
          <span className="section-kicker">
            EVERYTHING YOU NEED FOR BETTER HEALTHCARE
          </span>
          <h2 className="text-gray-900 font-semibold text-2xl md:text-[1.85rem] leading-snug">
            Access care, diagnostics, medicines, records,<br/>
            insurance, and AI-powered health services from a<br/>
            <span className="text-primary">single platform.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="h-[320px] w-full max-w-[190px] mx-auto flex flex-col rounded border border-[#D0D0D0] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg bg-white"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="icon-wrapper mb-6">
                  {service.icon}
                </div>
                <h3 className="mb-3 font-semibold text-gray-900 whitespace-pre-line leading-tight text-[15px]">
                  {service.title}
                </h3>
                <p className="text-gray-500 mb-6 flex-grow text-xs leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
                <div className="flex justify-end">
                  <button className="bg-[#F4F4F4] w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors outline-none border-none cursor-pointer">
                    <ArrowForwardIosIcon style={{ fontSize: '10px' }} className="text-[#343434]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
};

export default ServicesSection;
