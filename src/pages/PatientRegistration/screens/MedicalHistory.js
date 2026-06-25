import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import React from "react";
import ActionButtons from "../components/ActionButtons";
import FormTextArea from "../components/FormTextArea";

const MedicalHistory = ({ data, updateData, onNext, onBack, onSkip }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    updateData({
      [name]: value,
    });
  };

  return (
    <section className="max-w-[930px]">
      <div className="mb-7">
        <h1 className="m-0 text-[22px] font-bold text-slate-900">
          Medical History
        </h1>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Help us understand your medical background for better healthcare
          support.
        </p>
      </div>

      <FormTextArea
        label="Allergies"
        name="allergies"
        value={data.allergies}
        onChange={handleChange}
        placeholder="List any allergies such as medicine, food, dust, pollen, etc."
        icon={<WarningAmberOutlinedIcon sx={{ fontSize: 14, color: "#00856F" }} />}
      />

      <FormTextArea
        label="Current Medications"
        name="currentMedications"
        value={data.currentMedications}
        onChange={handleChange}
        placeholder="Mention medicines you are currently taking"
        icon={<MedicationOutlinedIcon sx={{ fontSize: 14, color: "#00856F" }} />}
      />

      <FormTextArea
        label="Existing Conditions"
        name="existingConditions"
        value={data.existingConditions}
        onChange={handleChange}
        placeholder="Example: Diabetes, blood pressure, asthma, thyroid, heart disease"
        icon={<FavoriteBorderIcon sx={{ fontSize: 14, color: "#00856F" }} />}
      />

      <FormTextArea
        label="Previous Surgeries"
        name="previousSurgeries"
        value={data.previousSurgeries}
        onChange={handleChange}
        placeholder="Mention previous surgeries or hospitalizations if any"
        icon={<MedicalServicesOutlinedIcon sx={{ fontSize: 14, color: "#00856F" }} />}
      />

      <ActionButtons
        onSkip={onSkip}
        onBack={onBack}
        onNext={onNext}
        nextLabel="Add Insurance Information"
      />
    </section>
  );
};

export default MedicalHistory;