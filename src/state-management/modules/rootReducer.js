import { combineReducers } from "redux";

import secuirityReducer from "./security/securityReducer";
import patientRegistrationReducer from "./patientRegistration/patientRegistrationReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
  patientRegistration: patientRegistrationReducer,
});

export default rootReducer;