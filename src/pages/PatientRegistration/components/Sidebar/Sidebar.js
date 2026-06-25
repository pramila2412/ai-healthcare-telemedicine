import React from "react";

import logo from "../../../../assets/assets/logo.svg";
import time from "../../../../assets/patientRegistration/time.svg";

import user from "../../../../assets/patientRegistration/user.svg";
import userwhite from "../../../../assets/patientRegistration/userwhite.svg"

import AddInfor from "../../../../assets/patientRegistration/AddInfor.svg";
import AddInforwhite from "../../../../assets/patientRegistration/AddInforwhite.svg";

import medHis from "../../../../assets/patientRegistration/medHis.svg";
import medHiswhite from "../../../../assets/patientRegistration/medHiswhite.svg";

import insurInfor from "../../../../assets/patientRegistration/insurInfor.svg";
import insurInforwhite from "../../../../assets/patientRegistration/insurInforwhite.svg";

import healthRec from "../../../../assets/patientRegistration/healthRec.svg";
import healthRecwhite from "../../../../assets/patientRegistration/healthRecwhite.svg";

import reviewCom from "../../../../assets/patientRegistration/review&com.svg";
import reviewComwhite from "../../../../assets/patientRegistration/reviewComwhite.svg";

const steps = [
  {
    key: "personal",
    title: "Personal Information",
    icon: user,
    activeIcon: userwhite,
  },
  {
    key: "additional",
    title: "Additional Information",
    icon: AddInfor,
    activeIcon: AddInforwhite,
  },
  {
    key: "medical",
    title: "Medical History",
    icon: medHis,
    activeIcon: medHiswhite,
  },
  {
    key: "insurance",
    title: "Insurance Information",
    icon: insurInfor,
    activeIcon: insurInforwhite,
  },
  {
    key: "records",
    title: "Health Records",
    icon: healthRec,
    activeIcon: healthRecwhite,
  },
  {
    key: "review",
    title: "Review & Complete",
    icon: reviewCom,
    activeIcon: reviewComwhite,
  },
];

const Sidebar = ({ activeStep, setActiveStep }) => {
  return (
    <div className="relative w-85.5 min-h-screen bg-[#FBFBFB] border-r border-[#E6E6E6]">
      {/* Logo */}
      <div className="absolute top-10 left-10 flex items-center gap-1">
        <img
          src={logo}
          alt="MediConnect"
          className="w-12 h-11 object-contain"
        />

        <div className="flex flex-col">
          <h1 className="text-[16px] font-semibold leading-none text-[#2E6B5F">
            MediConnect
          </h1>

          <p className="text-[10px] font-normal leading-2.5 text-p[#5F6B6A]">
            Healthcare Ecosystem
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="absolute top-39 left-10 w-65.5 min-h-122">
        {steps.map((step, index) => {
          const isActive = activeStep === step.key;

          return (
            <div key={step.key}>
              <div
                onClick={() => setActiveStep(step.key)}
                className={`flex items-center gap-2 cursor-pointer transition-all duration-10 ${
                  isActive
                    ? "bg-[#F4FAF7] rounded-lg px-1.5 py-1.5"
                    : "px-1 py-2"
                }`}
              >
                <div
                  className={`flex items-center justify-center rounded-lg ${
                    isActive
                      ? "w-7 h-7 bg-[#3F6F63] text-[#F7FBFA] border border-white"
                      : "w-6 h-6"
                  }`}
                >
                   <img
              src={isActive ? step.activeIcon : step.icon}
              alt={step.title}
              className="w-4 h-4"
            />
                </div>

                <span
                  className={`text-[13px] font-semibold leading-none ${
                    isActive ? "text-[#2E6B5F]" : "text-[#202020]"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="ml-4.25 h-7 w-px bg-[#E6E6E6]" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Card */}
      <div
        className="absolute left-10 bottom-10 w-65.5 h-44.75 rounded-lg border-[0.5px] border-[#D0D0D0] bg-white px-6 py-5
            flex flex-col "
        style={{
          boxShadow:
            "0px 1px 1px rgba(0,0,0,0.03), 0px 2px 2px rgba(0,0,0,0.03), 0px 4px 4px rgba(0,0,0,0.03), 0px 8px 8px rgba(0,0,0,0.03)",
        }}
      >
        <h4 className="text-[16px] font-medium text-[#111827] leading-none">
          Profile Progress
        </h4>

        <div className="mt-8">
          <p className="text-[14px] font-semibold text-[#2E6B5F] leading-none mb-4">
            10% Complete
          </p>

          <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="w-[10%] h-full bg-[#2E6B5F] rounded-full" />
          </div>

          <p className="mt-7 flex items-center gap-1 text-[10px] font-normal text-[#6B7280] leading-none">
            <img src={time} alt="Time" className="w-3 h-3" />
            <span className="mt-1">Estimated Time: 2-3 Minutes</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
