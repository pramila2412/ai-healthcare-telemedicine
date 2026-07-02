import './ParticipantsSection.css';
import React from 'react';
import { Container, Button } from '@mui/material';

const DoctorIcon = (props) => (
  <svg {...props} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
    <path d="M26.6654 29.3342V25.3342C26.6654 21.5636 26.6654 19.6769 25.4934 18.5062C24.3227 17.3342 22.436 17.3342 18.6654 17.3342L15.9987 20.0009L13.332 17.3342C9.56136 17.3342 7.6747 17.3342 6.50403 18.5062C5.33203 19.6769 5.33203 21.5636 5.33203 25.3342V29.3342M21.332 17.3342V24.6676" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3307 17.3337L11.3307 22.667M11.3307 22.667C12.038 22.667 12.7162 22.9479 13.2163 23.448C13.7164 23.9481 13.9974 24.6264 13.9974 25.3337V26.667M11.3307 22.667C10.6235 22.667 9.94521 22.9479 9.44511 23.448C8.94501 23.9481 8.66406 24.6264 8.66406 25.3337V26.667M20.6641 8.66699V7.33366C20.6641 6.72082 20.5434 6.11399 20.3088 5.5478C20.0743 4.98162 19.7306 4.46717 19.2972 4.03383C18.8639 3.60049 18.3494 3.25674 17.7833 3.02222C17.2171 2.7877 16.6102 2.66699 15.9974 2.66699C15.3846 2.66699 14.7777 2.7877 14.2115 3.02222C13.6454 3.25674 13.1309 3.60049 12.6976 4.03383C12.2642 4.46717 11.9205 4.98162 11.686 5.5478C11.4514 6.11399 11.3307 6.72082 11.3307 7.33366V8.66699C11.3307 9.27983 11.4514 9.88666 11.686 10.4528C11.9205 11.019 12.2642 11.5335 12.6976 11.9668C13.1309 12.4002 13.6454 12.7439 14.2115 12.9784C14.7777 13.213 15.3846 13.3337 15.9974 13.3337C16.6102 13.3337 17.2171 13.213 17.7833 12.9784C18.3494 12.7439 18.8639 12.4002 19.2972 11.9668C19.7306 11.5335 20.0743 11.019 20.3088 10.4528C20.5434 9.88666 20.6641 9.27983 20.6641 8.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.332 25.667C22.332 25.9322 22.2267 26.1866 22.0391 26.3741C21.8516 26.5616 21.5972 26.667 21.332 26.667C21.0668 26.667 20.8125 26.5616 20.6249 26.3741C20.4374 26.1866 20.332 25.9322 20.332 25.667C20.332 25.4018 20.4374 25.1474 20.6249 24.9599C20.8125 24.7723 21.0668 24.667 21.332 24.667C21.5972 24.667 21.8516 24.7723 22.0391 24.9599C22.2267 25.1474 22.332 25.4018 22.332 25.667Z" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const PatientIcon = (props) => (
  <svg {...props} viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
    <path d="M20.75 24.75V21.15C20.75 17.7564 20.75 16.0584 19.6512 15.0048C18.5537 13.9488 16.785 13.9488 13.25 13.9488H8.25C4.715 13.9488 2.94625 13.9488 1.84875 15.0048C0.75 16.0584 0.75 17.7564 0.75 21.1488C0.75 22.2684 0.75 22.8276 0.94 23.268C1.06564 23.5594 1.24987 23.8241 1.48215 24.0471C1.71444 24.2701 1.99023 24.447 2.29375 24.5676C2.7525 24.75 3.335 24.75 4.5 24.75V14.55M7.625 13.95L11.375 24.75H13.875C14.3723 24.75 14.8492 24.5604 15.2008 24.2228C15.5525 23.8852 15.75 23.4274 15.75 22.95C15.75 22.4726 15.5525 22.0148 15.2008 21.6772C14.8492 21.3396 14.3723 21.15 13.875 21.15H10.75M15.125 6.15V4.95C15.125 4.39845 15.0118 3.8523 14.792 3.34273C14.5721 2.83316 14.2498 2.37016 13.8436 1.98015C13.4373 1.59015 12.955 1.28078 12.4242 1.06971C11.8934 0.858636 11.3245 0.75 10.75 0.75C10.1755 0.75 9.60656 0.858636 9.07576 1.06971C8.54496 1.28078 8.06266 1.59015 7.65641 1.98015C7.25015 2.37016 6.92789 2.83316 6.70803 3.34273C6.48816 3.8523 6.375 4.39845 6.375 4.95V6.15C6.375 6.70155 6.48816 7.2477 6.70803 7.75727C6.92789 8.26684 7.25015 8.72984 7.65641 9.11985C8.06266 9.50985 8.54496 9.81922 9.07576 10.0303C9.60656 10.2414 10.1755 10.35 10.75 10.35C11.3245 10.35 11.8934 10.2414 12.4242 10.0303C12.955 9.81922 13.4373 9.50985 13.8436 9.11985C14.2498 8.72984 14.5721 8.26684 14.792 7.75727C15.0118 7.2477 15.125 6.70155 15.125 6.15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const participants = [
  {
    role: 'Patients',
    desc: 'Manage your health and\naccess care'
  },
  {
    role: 'Doctors',
    desc: 'Doctor care and\nconsultations'
  },
  {
    role: 'Hospitals',
    desc: 'Streamline operations and\npatient care'
  },
  {
    role: 'Laboratories',
    desc: 'Accurate tests and timely\nreports'
  },
  {
    role: 'Pharmacies',
    desc: 'Dispense and deliver\nmedicine with ease'
  },
  {
    role: 'Insurance',
    desc: 'Simplify policies and\nclaims'
  }
];

const ParticipantsSection = () => {
  return (
    <section className="py-10 md:py-16 bg-white text-center overflow-hidden">
      <Container maxWidth="xl">
        <span className="section-kicker">
          ONE CONNECTED HEALTHCARE NETWORK
        </span>
        <h2 className="text-gray-900 font-semibold mb-4 text-3xl md:text-[2.5rem] leading-snug px-4">
          Built to connect every participant in the<br className="hidden md:block"/> healthcare journey
        </h2>
        <p className="text-[#666666] mb-12 md:mb-24 max-w-[800px] mx-auto font-normal text-xs px-4">
          From booking to recovery, we make healthcare simple, accessible and personalized for you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center gap-x-2 gap-y-10 lg:gap-10 mb-12 md:mb-24 px-2 sm:px-0">
          {participants.map((item, index) => (
            <div key={index} className="relative w-full lg:w-[140px] mx-auto lg:mx-0">
              
              {/* Dashed Connecting Line with Arrow (hidden on last item or mobile) */}
              {index !== participants.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+45px)] w-[calc(100%-50px)] z-0 hidden lg:block">
                  <div className="w-full border-t-[1.5px] border-dashed border-gray-300"></div>
                  {/* Arrow head chevron */}
                  <div className="absolute right-0 top-[-3.5px] w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-gray-300 transform rotate-45" />
                </div>
              )}

              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 border border-gray-100 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                  {index === 0 ? (
                    <PatientIcon className="text-[24px] md:text-[32px] text-primary" />
                  ) : (
                    <DoctorIcon className="text-[24px] md:text-[32px] text-primary" />
                  )}
                </div>
                <p className="font-semibold text-[#141414] mb-2 text-xs">
                  {item.role}
                </p>
                <p className="text-gray-500 text-center whitespace-pre-line leading-relaxed px-2 text-[0.7rem]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors border-none cursor-pointer">
          Explore Ecosystem
        </button>
      </Container>
    </section>
  );
};

export default ParticipantsSection;
