// Static reference/config data for the patient registration form dropdowns.
// Consolidated from the previous dropdownOptions.js + indianStates.js files.

// ── Personal Information ───────────────────────────────────────────────────────
export const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];

export const bloodGroups = [
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

// ── Additional Information ─────────────────────────────────────────────────────
export const heightUnits = ["cm", "ft"];
export const weightUnits = ["kg", "lb"];

export const activityLevels = [
  "Very Active",
  "Moderately Active",
  "Lightly Active",
  "Moderately Active",
  "Athlete",
  "Sedentary",
];

export const dietaryPreferences = [
  "Vegetarian",
  "Non-Vegetarian",
  "Vegan",
  "Eggetarian",
  "No Preference",
];

export const smokingStatuses = [
  "Never Smoked",
  "Regular Smoker",
  "Former Smoker",
  "Occasional Smoker",
  "Trying to Quit",
];

export const alcoholOptions = [
  "Never",
  "Occasionally",
  "Social Drinker",
  "Former Drinker",
  "Weekly",
  "Daily",
];

export const relationships = [
  "Parent",
  "Spouse",
  "Sibling",
  "Child",
  "Relative",
  "Friend",
  "Caregiver",
  "Guardian",
  "Other",
];

// ── Medical History ────────────────────────────────────────────────────────────
export const chronicConditions = [
  "None",
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "Arthritis",
  "Cancer",
  "Kidney Disease",
  "Liver Disease",
  "Thyroid Disorder",
  "Other",
];

export const medicationFrequencies = [
  "Daily",
  "Twice a Day",
  "Weekly",
  "As Needed",
  "Not Currently",
];

// ── Insurance Information ──────────────────────────────────────────────────────
export const insuranceTypes = [
  "Government (Ayushman Bharat)",
  "Private Insurance",
  "Employer Provided",
  "Personal Policy",
  "No Insurance",
];

export const insuranceProviders = [
  "LIC Health",
  "Star Health",
  "HDFC ERGO",
  "ICICI Lombard",
  "Bajaj Allianz",
  "New India Assurance",
  "United India Insurance",
  "Oriental Insurance",
  "Max Bupa",
  "Religare Health",
  "Other",
];

// ── Location (State / City) ────────────────────────────────────────────────────
export const states = [
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

// Cities indexed by state name
export const stateCities = {
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

export const materialStatus = ["Single", "Married", "Prefer not to say"];

export const occupations = [
  "Student",
  "Employed",
  "Self-employed",
  "Business Owner",
  "Government Employee",
  "Retired",
  "Unemployed",
  "Other",
];

export const nationality = ["Indian"];

export const emergencyContacts = [
  "Father",
  "Mother",
  "Husband",
  "wife",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "GrandFather",
  "GrandMother",
  "Uncle",
  "Aunt",
  "Cousin",
  "Nephew",
  "Guardian",
  "Friend",
  "Neighbor",
  "Father-in-law",
  "Mother-in-law",
  "Brother-in-law",
  "Sister-in-law",
  "Other",
];
