import './TestimonialsSection.css';
import React from 'react';
import { Container } from '@mui/material';

const testimonials = [
  {
    title: 'Fast & Reliable Lab Tests',
    text: '“I scheduled my lab test online and received reports quickly.”',
    name: 'John Smith',
    role: 'Business Analyst',
    avatar: '/images/testimonial-1.png',
  },
  {
    title: 'Consult Online',
    text: '“Convenient online consultations from home.”',
    name: 'Vikram Rao',
    role: 'Accountant',
    avatar: '/images/testimonial-2.png',
  },
  {
    title: 'Insurance Support',
    text: '“Smooth and hassle-free insurance support.”',
    name: 'Kavya',
    role: 'Teacher',
    avatar: '/images/testimonial-3.png',
  },
  {
    title: 'Hospital Care',
    text: '“Quick booking and quality care.”',
    name: 'Rahul Sharma',
    role: 'Software Engineer',
    avatar: '/images/testimonial-4.png',
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <Container maxWidth="lg">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-center">
          
          {/* Left Text Content */}
          <div className="flex-none w-full lg:w-[230px]">
            <span className="section-overline">
              WHAT OUR PATIENTS SAY
            </span>
            <h2 className="text-gray-900 font-semibold mb-6 text-2xl md:text-[1.75rem] leading-tight">
              Trusted by Millions
            </h2>
            <p className="text-[#666666] leading-relaxed">
              From booking to recovery, we make<br />
              healthcare simple, accessible and<br />
              personalized for you.
            </p>
          </div>

          {/* Right Cards Content */}
          <div className="flex-auto flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="w-[235px] h-[210px] flex-none flex flex-col rounded border border-[#D0D0D0] bg-[#FBFBFB] p-1"
              >
                <div className="flex-grow flex flex-col p-3 pb-3">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-[#FBC02D] gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-700 font-semibold text-sm">5/5</span>
                  </div>
                  <h3 className="font-normal text-gray-900 mb-3 text-[0.95rem]">
                    {testimonial.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center mt-auto mb-2">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-9 h-9 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
