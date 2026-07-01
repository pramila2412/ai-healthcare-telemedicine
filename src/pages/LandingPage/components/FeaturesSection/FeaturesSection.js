import React from "react";
import { Container } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Icon } from "@iconify/react";
import AiHealthInsightsImage from "../../../../assets/LandingPage/AiHealthInsights.png";
import ConnectedMedicalRecordsImage from "../../../../assets/LandingPage/ConnectedMedicalRecords.png";
import SecureHealthcareNetworkImage from "../../../../assets/LandingPage/SecureHealthcareNetwork.png";
import ContinuousCareImage from "../../../../assets/LandingPage/ContinuousCare.png";

const features = [
  {
    title: "AI Health\nInsights",
    image: AiHealthInsightsImage,
    icon: (
      <Icon
        icon="hugeicons:ai-dna"
        width="24"
        height="24"
        className="text-primary"
      />
    ),
    desc: "Receive personalized health\nrecommendations and risk assessments.",
    bullets: [
      "Instant symptom analysis",
      "Health risk assessment",
      "Personalized recommendations",
    ],
  },
  {
    title: "Connected\nMedical Records",
    image: ConnectedMedicalRecordsImage,
    icon: (
      <Icon
        icon="tabler:clipboard-text"
        width="24"
        height="24"
        className="text-primary"
      />
    ),
    desc: "Access prescriptions, reports, and\nconsultations from one place.",
    bullets: [
      "All records in one place",
      "Easy access anytime",
      "100% secure & private",
    ],
  },
  {
    title: "Secure Healthcare\nNetwork",
    image: SecureHealthcareNetworkImage,
    icon: (
      <Icon
        icon="tabler:ambulance"
        width="24"
        height="24"
        className="text-primary"
      />
    ),
    desc: "Enterprise-grade security\nand privacy protection.",
    bullets: [
      "Instant symptom analysis",
      "Health risk assessment",
      "Personalized recommendations",
    ],
  },
  {
    title: "Continuous\nCare",
    image: ContinuousCareImage,
    icon: (
      <Icon
        icon="tabler:user-heart"
        width="24"
        height="24"
        className="text-primary"
      />
    ),
    desc: "From appointments to\nfollow-ups and monitoring.",
    bullets: [
      "Health tips & articles",
      "Lifestyle recommendations",
      "Connect with experts",
    ],
  },
];
const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container maxWidth="lg">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 px-4">
          <span className="text-[#096B58] font-bold text-xs tracking-[1.5px] uppercase block mb-3">
            WHY CHOOSE US?
          </span>
          <h2 className="text-[#141414] font-bold text-2xl sm:text-3xl md:text-4xl">
            Healthcare Powered by Intelligence
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full max-w-[285px] h-full mx-auto flex flex-col rounded-[20px] border border-gray-200 overflow-hidden bg-white"
              style={{ boxShadow: '0 8px 30px -10px rgba(0,0,0,0.06)' }}
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] xl:aspect-[4/3] flex items-center justify-center p-6 overflow-hidden">
                
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="relative z-10 w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                {/* Title & Icon Flow */}
                <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-[15px] bg-[#EEF4F3] flex items-center justify-center shrink-0">
  {feature.icon}
</div>
                  <h3 className="text-[#141414] font-bold text-[17px] leading-tight whitespace-pre-line mt-1">
                    {feature.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[#096B58] font-semibold text-[14px] leading-relaxed mb-6">
                  {feature.desc}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-2">
                  {feature.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-[#EAF5F2] flex items-center justify-center shrink-0">
                        <Icon
                          icon="charm:tick"
                          width="24"
                          height="24"
                          color="#096B58"
                        />
                      </div>
                      <span className="text-[#4D4D4D] text-[13px] font-medium leading-tight">
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
