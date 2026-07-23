import { combineReducers } from "redux";
import { patientRegistrationReducer } from './patientRegistration/patientRegistrationReducer';
import { registrationReducer } from './SidebarRegistration/registrationReducer';


const RegistrationRootReducer = combineReducers({
    sidebarRegistration: registrationReducer,
    patientRegistration: patientRegistrationReducer
})

export default RegistrationRootReducer