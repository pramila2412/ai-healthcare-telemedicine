import { combineReducers } from "redux";

import secuirityReducer from "./security/securityReducer";
import patientRegistrationReducer from "./patientRegistration/patientRegistrationReducer";
import authReducer from "./auth/authReducer";
import registrationReducer from "./registration/registrationReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
  auth: authReducer,
  registration:registrationReducer,
  patientRegistration: patientRegistrationReducer,
});

export default rootReducer;