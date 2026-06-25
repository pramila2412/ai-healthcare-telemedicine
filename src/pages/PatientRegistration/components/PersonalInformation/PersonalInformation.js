import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import user from "../../../../assets/patientRegistration/user.svg";
import phone from "../../../../assets/patientRegistration/phone.svg";
import email from "../../../../assets/patientRegistration/email.svg";
import location from "../../../../assets/patientRegistration/location.svg";
import dob from "../../../../assets/patientRegistration/dob.svg";
import bloodgrp from "../../../../assets/patientRegistration/bloodgrp.svg";
import gender from "../../../../assets/patientRegistration/gender.svg";
import downArrow from "../../../../assets/patientRegistration/downarrow.svg";
import calender from "../../../../assets/patientRegistration/calender.svg";
import star from "../../../../assets/patientRegistration/star.svg";


const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

const bloodGroups = [
  "O+",
  "A+",
  "B+",
  "AB+",
  "O-",
  "A-",
  "B-",
  "AB-",
  "Don't Know",
];

const stateCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Pasighat"],
  Assam: ["Guwahati", "Dibrugarh", "Silchar"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg"],
  Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  Haryana: ["Gurugram", "Faridabad", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Varanasi"],
  Uttarakhand: ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
  Other: ["Other"],
};

const CustomSelect = ({
  name,
  value,
  options,
  placeholder,
  searchPlaceholder,
  icon,
  inputClass,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (option) => {
    onSelect(name, option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={`${inputClass} relative flex items-center text-left ${
          value ? "text-[#141414]" : "text-[#666666]"
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <img
          src={icon}
          alt=""
          className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
        />
        <span className="block truncate">{value || placeholder}</span>
        <img
          src={downArrow}
          alt=""
          className={`absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_10px_28px_rgba(20,20,20,0.14)]">
          <div className="p-3">
            <div className="relative">
              <Search
                size={16}
                strokeWidth={1.75}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-md border border-[#E5E7EB] pl-12 pr-4 text-sm font-normal text-[#141414] outline-none cursor-pointer placeholder:text-[#777777] focus:border-[#D0D0D0]"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto px-3 pb-2" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option === value;

                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option)}
                    className={`relative flex h-12 w-full items-center border-b border-[#E5E7EB] text-left text-sm font-normal last:border-b-0 cursor-pointer px-3 transition-colors duration-150
                         ${isSelected ? "bg-[#F4FAF7] text-[#096B58]" : "text-[#202020] hover:bg-[#F3F4F6]"}`}
                  >
                    {isSelected && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-[#096B58]" />
                    )}
                    {option}
                  </button>
                );
              })
            ) : (
              <div className="flex h-12 items-center text-sm text-[#666666]">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const PersonalInformation = () => {
  const dobInputRef = useRef(null);
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const openDatePicker = () => {
    if (dobInputRef.current?.showPicker) {
      dobInputRef.current.showPicker();
    } else {
      dobInputRef.current?.focus();
    }
  };

  const inputClass =
    "w-full h-10 border border-[#E5E7EB] rounded-lg px-6 pl-12 pr-10 text-xs font-normal text-[#141414] focus:outline-none cursor-pointer";

  const labelClass = "block mb-2 text-[12px] font-normal  text-[#202020]";

  return (
    <div className="px-10 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className={labelClass}>
            Full Name <span className="text-[#EF4444]">*</span>
          </label>

          <div className="relative">
            <img
              src={user}
              alt="user"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3"
            />

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`${inputClass} pl-12 placeholder:text-[#666666]`}
            />
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className={labelClass}>
            Date of Birth <span className="text-[#EF4444]">*</span>
          </label>

          <div className="relative">
            <img
              src={dob}
              alt="dob"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
            />

            <input
              ref={dobInputRef}
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onClick={openDatePicker}
              className={`${inputClass} date-input ${
                !formData.dob ? "date-input-empty" : "text-[#141414]"
              }`}
            />

            {!formData.dob && (
              <span className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-xs font-normal text-[#666666]">
                Select date of birth
              </span>
            )}

            <button
              type="button"
              onClick={openDatePicker}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
            >
              <img src={calender} alt="calendar" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number</label>

          <div className="relative">
            <img
              src={phone}
              alt="phone"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-3"
            />

            <input
              type="text"
              value={formData.phone}
              disabled
              className={`${inputClass} pl-12 bg-[#F5F5F5] text-[#666666]`}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email Address</label>

          <div className="relative">
            <img
              src={email}
              alt="email"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-3"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email (optional)"
              className={`${inputClass} pl-12 placeholder:text-[#666666]`}
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className={labelClass}>
            Gender <span className="text-[#EF4444]">*</span>
          </label>

          <CustomSelect
            name="gender"
            value={formData.gender}
            options={genders}
            placeholder="Select your gender"
            searchPlaceholder="Search Gender"
            icon={gender}
            inputClass={inputClass}
            onSelect={handleSelectChange}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className={labelClass}>
            Blood Group <span className="text-[#EF4444]">*</span>
          </label>

          <CustomSelect
            name="bloodGroup"
            value={formData.bloodGroup}
            options={bloodGroups}
            placeholder="Select your blood group"
            searchPlaceholder="Search Blood Group"
            icon={bloodgrp}
            inputClass={inputClass}
            onSelect={handleSelectChange}
          />
        </div>

        {/* State */}
        <div>
          <label className={labelClass}>
            State <span className="text-[#EF4444]">*</span>
          </label>

          <CustomSelect
            name="state"
            value={formData.state}
            options={states}
            placeholder="Select state"
            searchPlaceholder="Search State"
            icon={location}
            inputClass={inputClass}
            onSelect={handleSelectChange}
          />
        </div>

        {/* City */}
        <div>
          <label className={labelClass}>
            Current City <span className="text-[#EF4444]">*</span>
          </label>

          <CustomSelect
            name="city"
            value={formData.city}
            options={formData.state ? stateCities[formData.state] || [] : []}
            placeholder="Select your current city"
            searchPlaceholder="Search City"
            icon={location}
            inputClass={inputClass}
            onSelect={handleSelectChange}
          />
        </div>
      </div>

      
      <div className="mt-12 w-136.25 h-10 border border-[#E5E7EB] rounded-lg px-4 flex items-center gap-2 bg-[#FBFBFB] relative">
        <img
          src={star}
          alt="star"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3"
        />
        <span className="text-xs font-medium text-[#141414] pl-5">
          These fields are required!
        </span>
      </div>
      {/* Personal Information Fields */}

<div className="mt-25 flex justify-end">
  <button
    type="button"
    className="w-[223px] h-[56px] rounded-lg bg-[#096B58] px-6 text-xs font-medium text-white flex items-center justify-center cursor-pointer 
    shadow-[0px_1px_1px_0px_rgba(9,107,88,0.24),0px_2px_2px_0px_rgba(9,107,88,0.07),0px_4px_4px_0px_rgba(9,107,88,0.07),0px_8px_8px_0px_rgba(9,107,88,0.07)]"
  >
    Add Additional Information
  </button>
</div>
    </div>
    
  );
};

export default PersonalInformation;
