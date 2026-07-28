import {
  RESET_REGISTRATION,
  SET_ACTIVE_STEP,
  SET_ADDITIONAL_INFO,
  SET_HEALTH_RECORDS,
  SET_INSURANCE_INFO,
  SET_MEDICAL_HISTORY,
  SET_PERSONAL_INFO,
  SET_REVIEW_COMPLETE,
} from "./patientRegistrationActions";

import { 
  healthRecordsInit, 
  insuranceInfoInit, 
  medicalHistoryInit, 
  personalInformationInit, 
  reviewAndCompleteInit 
} from './utils';

const initialState = {
  activeStep: "personal",
  personalInformation: { ...personalInformationInit },
  healthRecords: { ...healthRecordsInit },
  medicalHistory: { ...medicalHistoryInit },
  insuranceInformation: { ...insuranceInfoInit },
  reviewAndComplete: { ...reviewAndCompleteInit }
};

export const patientRegistrationReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_ACTIVE_STEP:
      return {
         ...state, 
         activeStep: action.payload 
      }

    case SET_PERSONAL_INFO:
     return { 
      ...state, 
      personalInformation: { ...state.personalInformation, ...action.payload }
    };

    case SET_ADDITIONAL_INFO:
      
      return {
        ...state, 
        additionalInformation: action.payload
      };

    case SET_MEDICAL_HISTORY:
      
      return {
        ...state, medicalHistory:
         action.payload 
      };

    case SET_INSURANCE_INFO:
      
      return { 
        ...state, 
        insuranceInformation: action.payload 
      };

    case SET_HEALTH_RECORDS:
      
      return {
        ...state, 
        healthRecords: action.payload
      };

    case SET_REVIEW_COMPLETE:
      return {
        ...state, 
        reviewAndComplete: { ...state.reviewAndComplete, ...action.payload }
      };

    case RESET_REGISTRATION:
       return {
          ...state,
          ...initialState
        };
    default:
      return state;
  }
};


