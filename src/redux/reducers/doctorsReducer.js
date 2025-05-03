import * as types from '../actions/actionTypes';

const initialState = {
  doctors: [],
  loading: false,
  error: null
};

const doctorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_DOCTORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.payload,
        error: null
      };
    case types.FETCH_DOCTORS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.ADD_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, action.payload]
      };
    case types.UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map(doctor =>
          doctor.id === action.payload.id ? action.payload : doctor
        )
      };
    case types.DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter(doctor => doctor.id !== action.payload)
      };
    default:
      return state;
  }
};

export default doctorsReducer;
