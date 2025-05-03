import { combineReducers } from 'redux';
import appointmentsReducer from './reducers/appointmentsReducer';
import doctorsReducer from './reducers/doctorsReducer';
import patientsReducer from './reducers/patientsReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  appointments: appointmentsReducer,
  doctors: doctorsReducer,
  patients: patientsReducer,
  auth: authReducer
});

export default rootReducer;
