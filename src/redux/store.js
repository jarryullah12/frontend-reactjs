import { createStore, applyMiddleware, combineReducers, thunk } from './mockRedux';
import doctorsReducer from './reducers/doctorsReducer';
import patientsReducer from './reducers/patientsReducer';
import appointmentsReducer from './reducers/appointmentsReducer';
import authReducer from './reducers/authReducer';

// Combine all reducers
const rootReducer = combineReducers({
  doctors: doctorsReducer,
  patients: patientsReducer,
  appointments: appointmentsReducer,
  auth: authReducer
});

// Create store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
