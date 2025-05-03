// Simple Redux-like state management without React dependencies

// Global store
// Initialize with user, appointments, and patients from localStorage if available
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const storedAppointments = localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [];
const storedPatients = localStorage.getItem('patients') ? JSON.parse(localStorage.getItem('patients')) : [];
const storedDoctors = localStorage.getItem('doctors') ? JSON.parse(localStorage.getItem('doctors')) : [];

// Debug stored data
console.log('Initializing Redux with stored user:', storedUser);
console.log('Initializing Redux with stored appointments:', storedAppointments);
console.log('Initializing Redux with stored patients:', storedPatients);
console.log('Initializing Redux with stored doctors:', storedDoctors);

let globalState = {
  auth: {
    user: storedUser,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null
  },
  appointments: {
    appointments: storedAppointments,
    loading: false,
    error: null
  },
  patients: {
    patients: storedPatients,
    loading: false,
    error: null
  },
  doctors: {
    doctors: storedDoctors,
    loading: false,
    error: null
  }
};
let listeners = [];

// Mock Redux
export const createStore = (reducer) => {
  // Initialize state with reducer
  globalState = reducer(undefined, { type: '@@INIT' });
  
  const getState = () => globalState;
  
  const dispatch = (action) => {
    // Handle thunk actions (functions)
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    
    // Regular action objects
    globalState = reducer(globalState, action);
    listeners.forEach(listener => listener());
    return action;
  };
  
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };
  
  return { getState, dispatch, subscribe };
};

// Combine multiple reducers into one
export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const nextState = {};
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
};

// Simple middleware implementation
export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;
    
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    
    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = chain.reduce((a, b) => (...args) => a(b(...args)))(store.dispatch);
    
    return { ...store, dispatch };
  };
};

// Simplified React-Redux
export const Provider = ({ children }) => {
  return children;
};

// Hooks that use our global state
export const useSelector = (selector) => {
  return selector(globalState);
};

// Root reducer that handles all action types
const rootReducer = (state = {}, action) => {
  switch (action.type) {
    // Auth actions
    case 'LOGIN_REQUEST':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: true,
          error: null
        }
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null
        }
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: action.payload
        }
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null
        }
      };
      
    // Appointment actions
    case 'FETCH_APPOINTMENTS_REQUEST':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          loading: true,
          error: null
        }
      };
    case 'FETCH_APPOINTMENTS_SUCCESS':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          appointments: action.payload,
          loading: false,
          error: null
        }
      };
    case 'FETCH_APPOINTMENTS_FAILURE':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          loading: false,
          error: action.payload
        }
      };
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          appointments: [...state.appointments.appointments, action.payload]
        }
      };
    case 'UPDATE_APPOINTMENT':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          appointments: state.appointments.appointments.map(appointment =>
            appointment.id === action.payload.id ? action.payload : appointment
          )
        }
      };
    case 'DELETE_APPOINTMENT':
      return {
        ...state,
        appointments: {
          ...state.appointments,
          appointments: state.appointments.appointments.filter(appointment => appointment.id !== action.payload)
        }
      };
      
    // Patient actions
    case 'FETCH_PATIENTS_REQUEST':
      return {
        ...state,
        patients: {
          ...state.patients,
          loading: true,
          error: null
        }
      };
    case 'FETCH_PATIENTS_SUCCESS':
      return {
        ...state,
        patients: {
          ...state.patients,
          patients: action.payload,
          loading: false,
          error: null
        }
      };
    case 'FETCH_PATIENTS_FAILURE':
      return {
        ...state,
        patients: {
          ...state.patients,
          loading: false,
          error: action.payload
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          patients: [...state.patients.patients, action.payload]
        }
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          patients: state.patients.patients.map(patient =>
            patient.id === action.payload.id ? action.payload : patient
          )
        }
      };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          patients: state.patients.patients.filter(patient => patient.id !== action.payload)
        }
      };
      
    // Doctor actions
    case 'FETCH_DOCTORS_REQUEST':
      return {
        ...state,
        doctors: {
          ...state.doctors,
          loading: true,
          error: null
        }
      };
    case 'FETCH_DOCTORS_SUCCESS':
      return {
        ...state,
        doctors: {
          ...state.doctors,
          doctors: action.payload,
          loading: false,
          error: null
        }
      };
    case 'FETCH_DOCTORS_FAILURE':
      return {
        ...state,
        doctors: {
          ...state.doctors,
          loading: false,
          error: action.payload
        }
      };
    case 'ADD_DOCTOR':
      return {
        ...state,
        doctors: {
          ...state.doctors,
          doctors: [...state.doctors.doctors, action.payload]
        }
      };
    case 'UPDATE_DOCTOR':
      return {
        ...state,
        doctors: {
          ...state.doctors,
          doctors: state.doctors.doctors.map(doctor =>
            doctor.id === action.payload.id ? action.payload : doctor
          )
        }
      };
    case 'DELETE_DOCTOR':
      return {
        ...state,
        doctors: {
          ...state.doctors,
          doctors: state.doctors.doctors.filter(doctor => doctor.id !== action.payload)
        }
      };
      
    default:
      return state;
  }
};

// Create store with our root reducer
const store = createStore(rootReducer);

export const useDispatch = () => {
  return (action) => {
    if (typeof action === 'function') {
      return action(store.dispatch, store.getState);
    }
    return store.dispatch(action);
  };
};

// Mock Redux-Thunk (already handled in our dispatch)
const thunk = () => next => action => {
  return typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
};

export { thunk };
