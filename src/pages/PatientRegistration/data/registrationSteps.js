import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const STEP_INDEXES = {
  PERSONAL_DETAILS: 0,
  ADDITIONAL_INFORMATION: 1,
  MEDICAL_HISTORY: 2,
  INSURANCE_INFORMATION: 3,
  HEALTH_RECORDS: 4,
  REVIEW_COMPLETE: 5,
};

export const registrationSteps = [
  {
    id: STEP_INDEXES.PERSONAL_DETAILS,
    label: "Personal Details",
    icon: PersonIcon,
  },
  {
    id: STEP_INDEXES.ADDITIONAL_INFORMATION,
    label: "Additional Information",
    icon: AssignmentIcon,
  },
  {
    id: STEP_INDEXES.MEDICAL_HISTORY,
    label: "Medical History",
    icon: FavoriteBorderIcon,
  },
  {
    id: STEP_INDEXES.INSURANCE_INFORMATION,
    label: "Insurance Information",
    icon: VerifiedUserIcon,
  },
  {
    id: STEP_INDEXES.HEALTH_RECORDS,
    label: "Health Records",
    icon: FolderOpenIcon,
  },
  {
    id: STEP_INDEXES.REVIEW_COMPLETE,
    label: "Review & Complete",
    icon: CheckCircleIcon,
  },
];

export const profileProgressByStep = {
  [STEP_INDEXES.PERSONAL_DETAILS]: 20,
  [STEP_INDEXES.ADDITIONAL_INFORMATION]: 35,
  [STEP_INDEXES.MEDICAL_HISTORY]: 50,
  [STEP_INDEXES.INSURANCE_INFORMATION]: 65,
  [STEP_INDEXES.HEALTH_RECORDS]: 80,
  [STEP_INDEXES.REVIEW_COMPLETE]: 100,
};
