import React from "react";
import FormInput from "../../../shared/components/PatientRegistration/form/FormInput";
import FormSelect from "../../../shared/components/PatientRegistration/form/FormSelect";

import {
  genders,
  bloodGroups,
  materialStatus,
  occupations,
} from "../../../shared/constants/PatientRegistration/registrationConfig";

const BasicDetails = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#141414]">Basic Details</h2>
        <p className="mt-1 text-sm text-[#666666]">
          Tell us a little about yourself so we can personalize your healthcare
          experience.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-9 gap-y-8">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>

          <FormInput
            name="fullName"
            value=""
            placeholder="Enter your full name"
            icon="tabler:user"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <FormInput
            name="dob"
            value=""
            placeholder="Select your date of birth"
            icon="tabler:calendar"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Gender <span className="text-red-500">*</span>
          </label>

          <FormSelect
            name="gender"
            value=""
            options={genders}
            placeholder="Select your gender"
            icon="tabler:gender-bigender"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Blood Group <span className="text-red-500">*</span>
          </label>

          <FormSelect
            name="bloodGroup"
            value=""
            options={bloodGroups}
            placeholder="Select your blood group"
            icon="tabler:droplet"
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Marital Status
          </label>

          <FormSelect
            name="maritalStatus"
            value=""
            options={materialStatus}
            placeholder="Select your marital status"
            icon="tabler:heart-handshake"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Occupation
          </label>

          <FormSelect
            name="occupation"
            value=""
            options={occupations}
            placeholder="Select your occupation"
            icon="tabler:briefcase"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <FormInput
            name="phone"
            value="+91 98765 43210"
            icon="tabler:phone"
            disabled
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <FormInput
            name="email"
            value=""
            placeholder="Enter your email address"
            icon="tabler:mail"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;