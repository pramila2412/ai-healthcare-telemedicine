import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WarningIcon from "@mui/icons-material/Warning";
import ActionButtons from "../components/common/ActionButtons";
import SectionHeader from "../components/common/SectionHeader";
import FormTextArea from "../components/form/FormTextArea";

const MedicalHistory = ({ data, updateData, onNext, onBack, onSkip }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    updateData({ [name]: value });
  };

  return (
    <section className="max-w-[930px]">
      <SectionHeader
        title="Medical History"
        description="Help us understand your medical background for better healthcare support."
      />

      <FormTextArea
        label="Allergies"
        name="allergies"
        value={data.allergies}
        onChange={handleChange}
        placeholder="List any allergies such as medicine, food, dust, pollen, etc."
        icon={<WarningIcon sx={{ fontSize: 14, color: "#00856F" }} />}
      />

      <FormTextArea
        label="Current Medications"
        name="currentMedications"
        value={data.currentMedications}
        onChange={handleChange}
        placeholder="Mention medicines you are currently taking"
        icon={<DescriptionIcon sx={{ fontSize: 14, color: "#00856F" }} />}
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
        icon={<AssignmentIcon sx={{ fontSize: 14, color: "#00856F" }} />}
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
