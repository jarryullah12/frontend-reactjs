import * as types from '../actions/actionTypes';

// Get user from localStorage if available
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

// Check if token is expired (if we had a token)
// For now we're just using the presence of user, but in a real app
// you would check token validity/expiration

const initialState = {
  user: user,
  loading: false,
  error: null,
  isAuthenticated: !!user,
  lastLogin: user ? new Date().toISOString() : null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registeredUser: action.payload,
        error: null
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
    case types.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: state.isAuthenticated // Keep current authentication state
      };
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
