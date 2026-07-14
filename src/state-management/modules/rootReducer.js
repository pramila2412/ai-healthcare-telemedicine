import { combineReducers } from "redux";

import notificationReducer from "./notification/notificationReducer";
import patientRegistrationReducer from "./patientRegistration/patientRegistrationReducer";
import secuirityReducer from "./security/securityReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
  patientRegistration: patientRegistrationReducer,
  notification: notificationReducer,
});

export default rootReducer;