import { combineReducers } from "redux";

import authReducer from "./auth/authReducer";
import notificationReducer from "./notification/notificationReducer";
import RegistrationRootReducer from "./Registrations/RegistrationRootReducer";
import secuirityReducer from "./security/securityReducer";

const rootReducer = combineReducers({
  security: secuirityReducer,
  registrations: RegistrationRootReducer,
  notification: notificationReducer,
  auth: authReducer,
});

export default rootReducer;