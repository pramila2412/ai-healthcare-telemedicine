import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";
import ActionButtons from "../../../../shared/components/PatientRegistration/common/ActionButtons";
import SectionHeader from "../../../../shared/components/PatientRegistration/common/SectionHeader";
import FormTextArea from "../../../../shared/components/PatientRegistration/form/FormTextArea";

const MedicalHistory = ({ data, updateData, onNext, onBack, onSkip }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    updateData({
      [name]: value,
    });
  };

  return (
    <section className="pr-screen">
      <SectionHeader
        title="Medical History"
        description="Add information about your past treatments, medications, and health conditions."
      />

      <FormTextArea
        label="Allergies"
        name="allergies"
        value={data.allergies}
        onChange={handleChange}
        placeholder="List any allergies you have (if any)"
        icon={<WarningIcon sx={{ fontSize: 14, color: "#00856F" }} />}
        maxLength={500}
      />

      <FormTextArea
        label="Current Medications"
        name="currentMedications"
        value={data.currentMedications}
        onChange={handleChange}
        placeholder="List your current medications with dosage"
        icon={<MedicationIcon sx={{ fontSize: 14, color: "#00856F" }} />}
        maxLength={500}
      />

      <FormTextArea
        label="Existing Conditions"
        name="existingConditions"
        value={data.existingConditions}
        onChange={handleChange}
        placeholder="Enter any Conditions (e.g., diabetes, hypertension, asthma, etc.)"
        icon={<FavoriteBorderIcon sx={{ fontSize: 14, color: "#00856F" }} />}
        maxLength={500}
      />

      <FormTextArea
        label="Previous Surgeries"
        name="previousSurgeries"
        value={data.previousSurgeries}
        onChange={handleChange}
        placeholder="Enter details of any past surgeries (if any)"
        icon={<LocalHospitalIcon sx={{ fontSize: 14, color: "#00856F" }} />}
        maxLength={500}
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