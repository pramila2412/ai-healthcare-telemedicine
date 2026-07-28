import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

export const FIELD_LABELS_AND_ICONS = {
  basicDetails: {
    fullName: { label: "Full Name", icon: "tabler:user" },
    dob: { label: "Date of Birth", icon: "tabler:calendar" },
    gender: { label: "Gender", icon: "tabler:gender-bigender" },
    bloodGroup: { label: "Blood Group", icon: "tabler:droplet" },
    maritalStatus: { label: "Marital Status", icon: "tabler:heart-handshake" },
    occupation: { label: "Occupation", icon: "tabler:briefcase" },
    phone: { label: "Phone Number", icon: "tabler:phone" },
    email: { label: "Email Address", icon: "tabler:mail" }
  },
  contactLocation: {
    nationality: { label: "Nationality", icon: "tabler:map-pin" },
    state: { label: "State", icon: "tabler:map-pin" },
    city: { label: "Current City", icon: "tabler:map-pin" }
  },
  emergencyContact: {
    relationship: { label: "Emergency Contact Relationship", icon: "tabler:heart-handshake" },
    name: { label: "Emergency Contact Name", icon: "tabler:user" },
    phone: { label: "Emergency Contact Phone Number", icon: "tabler:phone" }
  },
  healthOverview: { 
    height: { label: "Height", icon: "tabler:ruler-measure-2" },
    weight: { label: "Weight", icon: "tabler:scale-outline" },
    bloodPressure: { label: "Blood Pressure", icon: "tabler:heartbeat" },
    bloodSugar: { label: "Blood Sugar", icon: "tabler:droplet" },
    physicalActivityLevel: { label: "Physical Activity Level", icon: "tabler:run" },
    dietaryPreference: { label: "Dietary Preference", icon: "tabler:chef-hat" },
    smokingStatus: { label: "Smoking Status", icon: "tabler:smoking" },
    alcoholConsumption: { label: "Alcohol Consumption", icon: "tabler:glass-full" }
  },
  medicalConditions: {
    allergies: { label: "Allergies", icon: WbSunnyOutlinedIcon },
    existingConditions: { label: "Existing Conditions", icon: MedicalServicesOutlinedIcon },
    previousSurgeries: { label: "Previous Surgeries", icon: LocalHospitalOutlinedIcon },
    currentMedications: { label: "Current Medications", icon: MedicationOutlinedIcon }
  },
  insuranceInformation: {
    insuranceType: { label: "Insurance Type", icon: HealthAndSafetyOutlinedIcon },
    insuranceProvider: { label: "Insurance Provider", icon: AccountBalanceOutlinedIcon },
    insuredMemberName: { label: "Insured Member Name", icon: Person2OutlinedIcon },
    policyNumber: { label: "Customer ID/Policy Number", icon: CreditCardOutlinedIcon }
  }
};
