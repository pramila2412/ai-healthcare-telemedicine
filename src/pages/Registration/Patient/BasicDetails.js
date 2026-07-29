import FormInput from "@/shared/components/Registration/form/FormInput";
import FormSelect from "@/shared/components/Registration/form/FormSelect";
import {
  bloodGroups,
  genders,
  materialStatus,
  occupations,
} from "@/shared/constants/PatientRegistration/registrationConfig";
import { Icon } from "@iconify/react";
import React from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

const getTodayDateInputValue = () => {
  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  );
  return localToday.toISOString().split("T")[0];
};

const BasicDetails = ({
  data = {},
  onChange,
  errors = {},
  touched = {},
  onFieldBlur,
}) => {
  const phoneNumber = useSelector((state) => state.security.phoneNumber);
  const updateField = (fieldName, value) => {
    onChange?.({
      ...data,
      [fieldName]: value,
    });
  };
  const getValidationProps = (fieldName) => ({
    error: errors[fieldName] || "",
    showError: Boolean(touched[fieldName]),
    onBlur: () => onFieldBlur?.(fieldName),
  });

  const dobValidation = getValidationProps("dob");

  return (
    <div className="space-y-8">
      <div className="w-full sm:w-82">
        <h2 className="text-sm font-medium text-text-heading">Basic Details</h2>
        <p className="mt-1 text-xs font-TypeFace font-normal text-[#6B7280]">
          Tell us a little about yourself so we can personalize your healthcare
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-8">
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Full Name <span className="required-asterisk">*</span>
          </label>

          <FormInput
            name="fullName"
            value={data.fullName || ""}
            placeholder="Enter your full name"
            icon="tabler:user"
            onChange={(event) => updateField("fullName", event.target.value)}
            {...getValidationProps("fullName")}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Date of Birth <span className="required-asterisk">*</span>
          </label>

          <div className="relative">
            <Icon
              icon="tabler:cake"
              width={24}
              height={24}
              strokeWidth={1}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none [&_path]:stroke-[1.5] ${
                data.dob ? "text-primary-dark" : "text-text-muted"
              }`}
            />

            <DatePicker
              selected={data.dob ? new Date(data.dob) : null}
              maxDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
              dateFormat="d MMMM yyyy"
              placeholderText="Select your date of birth"
              wrapperClassName="w-full"
              popperClassName="dob-datepicker-popper"
              className={`h-14 w-full rounded-lg border-[0.5px] border-[#D0D0D0] bg-white pl-12 pr-11 text-xs font-normal text-[#141414] outline-none placeholder:text-[#666666] transition-colors duration-150 focus:border-primary-dark ${
                dobValidation.error ? "border-danger" : ""
              }`}
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              onChange={(date) => {
                const value = date ? date.toISOString().split("T")[0] : "";
                updateField("dob", value);
              }}
              onChangeRaw={(event) => {
                const parsed = new Date(event.target.value);
                if (!isNaN(parsed.getTime())) {
                  updateField("dob", parsed.toISOString().split("T")[0]);
                }
              }}
              onCalendarClose={() => {
                dobValidation.onBlur?.();
              }}
            />

            <Icon
              icon="tabler:calendar-due"
              width={24}
              height={24}
              strokeWidth={1}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none [&_path]:stroke-[1.5] text-text-muted"
            />

            {dobValidation.error && (
              <p className="absolute left-0 top-[calc(100%+2px)] text-xs text-danger leading-none">
                {dobValidation.error}
              </p>
            )}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Gender <span className="required-asterisk">*</span>
          </label>

          <FormSelect
            name="gender"
            value={data.gender || ""}
            options={genders}
            placeholder="Select your gender"
            icon="tabler:gender-bigender"
            onSelect={updateField}
            {...getValidationProps("gender")}
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Blood Group <span className="required-asterisk">*</span>
          </label>

          <FormSelect
            name="bloodGroup"
            value={data.bloodGroup || ""}
            options={bloodGroups}
            placeholder="Select your blood group"
            icon="tabler:droplet"
            onSelect={updateField}
            {...getValidationProps("bloodGroup")}
          />
        </div>

        {/* Marital Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Marital Status
          </label>

          <FormSelect
            name="maritalStatus"
            value={data.maritalStatus || ""}
            options={materialStatus}
            placeholder="Select your marital status"
            icon="tabler:heart-handshake"
            onSelect={updateField}
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Occupation
          </label>

          <FormSelect
            name="occupation"
            value={data.occupation || ""}
            options={occupations}
            placeholder="Select your occupation"
            icon="tabler:briefcase"
            onSelect={updateField}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Phone Number
          </label>

          <FormInput
            name="phone"
            value={phoneNumber}
            icon="tabler:phone"
            disabled
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-text-heading">
            Email Address
          </label>

          <FormInput
            name="email"
            value={data.email || ""}
            placeholder="Enter your email address"
            icon="tabler:mail"
            onChange={(event) => updateField("email", event.target.value)}
            {...getValidationProps("email")}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;

