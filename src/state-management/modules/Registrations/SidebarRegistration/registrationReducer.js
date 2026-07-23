import {
  MARK_SECTION_COMPLETE,
  RESET_REGISTRATION,
  SAVE_SECTION_DATA,
  SET_ACTIVE_SECTION,
} from './registrationActions';

const initialState = {
  activeSectionKey: 'basic',   // which sidebar section is currently open
  formDataBySection: {},        // { basic: {...}, location: {...}, ... }
  completedSections: [],         // ['basic', 'location', ...] for checkmarks/progress
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      return { ...state, activeSectionKey: action.payload };

    case SAVE_SECTION_DATA:
      return {
        ...state,
        formDataBySection: {
          ...state.formDataBySection,
          [action.payload.sectionKey]: action.payload.data,
        },
      };

    case MARK_SECTION_COMPLETE:
      return {
        ...state,
        completedSections: state.completedSections.includes(action.payload)
          ? state.completedSections
          : [...state.completedSections, action.payload],
      };

    case RESET_REGISTRATION:
      return initialState;

    default:
      return state;
  }
}