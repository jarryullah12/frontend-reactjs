import * as types from '../actions/actionTypes';

const initialState = {
  patients: [],
  loading: false,
  error: null
};

const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.payload,
        error: null
      };
    case types.FETCH_PATIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.ADD_PATIENT:
      return {
        ...state,
        patients: [...state.patients, action.payload]
      };
    case types.UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map(patient =>
          patient.id === action.payload.id ? action.payload : patient
        )
      };
    case types.DELETE_PATIENT:
      return {
        ...state,
        patients: state.patients.filter(patient => patient.id !== action.payload)
      };
    default:
      return state;
  }
};

export default patientsReducer;
