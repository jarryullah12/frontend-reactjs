import * as types from '../actions/actionTypes';

const initialState = {
  appointments: [],
  loading: false,
  error: null
};

const appointmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_APPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
        error: null
      };
    case types.FETCH_APPOINTMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      };
    case types.UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id ? action.payload : appointment
        )
      };
    case types.DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload)
      };
    default:
      return state;
  }
};

export default appointmentsReducer;
