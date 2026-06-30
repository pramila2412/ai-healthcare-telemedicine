import { STEP_INDEXES } from "../../../shared/constants/PatientRegistration/registrationSteps";
import { PATIENT_REGISTRATION_ACTION_TYPES } from "./patientRegistrationActions";

export const initialPatientRegistrationState = {
  currentStep: STEP_INDEXES.MEDICAL_HISTORY,

  formData: {
    medicalHistory: {
      allergies: "",
      currentMedications: "",
      existingConditions: "",
      previousSurgeries: "",
    },

    insurance: {
      provider: "",
      policyNumber: "",
      insuranceCard: null,
      confirmation: false,
    },

    healthRecords: [],
  },

  notificationOpen: false,
};

const patientRegistrationReducer = (
  state = initialPatientRegistrationState,
  action
) => {
  switch (action.type) {
    case PATIENT_REGISTRATION_ACTION_TYPES.UPDATE_FORM_SECTION: {
      const { section, sectionData } = action.payload;

      return {
        ...state,
        formData: {
          ...state.formData,
          [section]: {
            ...state.formData[section],
            ...sectionData,
          },
        },
      };
    }

    case PATIENT_REGISTRATION_ACTION_TYPES.SET_FORM_DATA: {
      const updatedFormData =
        typeof action.payload === "function"
          ? action.payload(state.formData)
          : action.payload;

      return {
        ...state,
        formData: updatedFormData,
      };
    }

    case PATIENT_REGISTRATION_ACTION_TYPES.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };

    case PATIENT_REGISTRATION_ACTION_TYPES.GO_TO_NEXT_STEP: {
      if (state.currentStep < STEP_INDEXES.HEALTH_RECORDS) {
        return {
          ...state,
          currentStep: state.currentStep + 1,
        };
      }

      return {
        ...state,
        notificationOpen: true,
      };
    }

    case PATIENT_REGISTRATION_ACTION_TYPES.GO_TO_PREVIOUS_STEP: {
      if (state.currentStep > STEP_INDEXES.MEDICAL_HISTORY) {
        return {
          ...state,
          currentStep: state.currentStep - 1,
        };
      }

      return state;
    }

    case PATIENT_REGISTRATION_ACTION_TYPES.OPEN_NOTIFICATION:
      return {
        ...state,
        notificationOpen: true,
      };

    case PATIENT_REGISTRATION_ACTION_TYPES.CLOSE_NOTIFICATION:
      return {
        ...state,
        notificationOpen: false,
      };

    case PATIENT_REGISTRATION_ACTION_TYPES.RESET_REGISTRATION:
      return initialPatientRegistrationState;

    default:
      return state;
  }
};

export default patientRegistrationReducer;