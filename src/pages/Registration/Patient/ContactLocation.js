import FormInput from "@/shared/components/Registration/form/FormInput";
import FormSelect from "@/shared/components/Registration/form/FormSelect";
import {
  stateCities,
  nationality,
  states,
  emergencyContacts,
} from "@/shared/constants/PatientRegistration/registrationConfig";
import React, { useState } from "react";

const ContactLocation = () => {
  const [selectedState, setSelectedState] = useState("");
  const cityOptions = stateCities[selectedState] || [];

  return (
    <div className="space-y-8">
      <div className='w-82'>
        <h2 className="text-sm font-medium text-text-heading">
          Emergency Contact
        </h2>
        <p className="mt-1 text-xs font-TypeFace font-normal text-[#6B7280]">
          Choose someone we can contact in case of an emergency. This
          information stays private and secure.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-9 gap-y-8">
        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Emergency Contact Relationship{" "}
            <span className="text-red-500">*</span>
          </label>

          <FormSelect
            name="emergencyContacts"
            value=""
            options={emergencyContacts}
            placeholder="Select your emergency contact relationship"
            icon="tabler:heart-handshake"
          />
        </div>

        {/* Emergency Contact Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Emergency Contact Name <span className="text-red-500">*</span>
          </label>

          <FormInput
            name="contactName"
            value=""
            placeholder="Enter emergency contact name"
            icon="tabler:user"
          />
        </div>

        {/* Emergency Contact Phone Number*/}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Emergency Contact Phone Number{" "}
            <span className="text-red-500">*</span>
          </label>

          <FormInput
            name="phoneNumber"
            value=""
            placeholder="Enter emergency contact phone number"
            icon="tabler:phone"
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-text-heading">Location </h2>
        <p className="mt-1 text-xs font-TypeFace font-normal text-[#6B7280]">
          Help us reach you when needed and show healthcare services available
          in your area.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-x-9 gap-y-8">
        {/* Nationality */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Nationality <span className="text-red-500">*</span>
          </label>

          <FormSelect
            name="nationality"
            value="Indian"
            options={nationality}
            placeholder="Select your nationality"
            icon="tabler:map-pin"
          />
        </div>

        {/* State */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            State <span className="text-danger">*</span>
          </label>
          <FormSelect
            name="state"
            value={selectedState}
            onChange={(val) => setSelectedState(val)}
            options={states}
            placeholder="Select state"
            searchPlaceholder="Search state"
            icon="tabler:map-pin"
          />
        </div>

        {/* Current City */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Current City <span className="text-danger">*</span>
          </label>
          <FormSelect
            name="city"
            value=""
            options={cityOptions}
            placeholder={
              selectedState
                ? "Select your current city"
                : "Select a state first"
            }
            searchPlaceholder="Search city"
            icon="tabler:map-pin"
            disabled={!selectedState}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
