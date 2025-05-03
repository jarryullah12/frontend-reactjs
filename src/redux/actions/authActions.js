import * as types from './actionTypes';

// Action creators for authentication

// Login request
export const loginRequest = () => ({
  type: types.LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
  type: types.LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error
});

// Register request
export const registerRequest = () => ({
  type: types.REGISTER_REQUEST
});

export const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error
});

// Login user
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }
      
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Define default admin users for demo purposes
      const defaultUsers = [
        {
          id: 1,
          email: 'admin@example.com',
          password: 'password',
          name: 'Admin User',
          role: 'admin'
        },
        {
          id: 2,
          email: 'doctor@example.com',
          password: 'doctor123',
          name: 'Dr. Smith',
          role: 'doctor'
        },
        {
          id: 3,
          email: 'patient@example.com',
          password: 'patient123',
          name: 'John Doe',
          role: 'patient'
        }
      ];
      
      // Combine default users with registered users
      const allUsers = [...defaultUsers, ...registeredUsers];
      
      // Find matching user
      const matchedUser = allUsers.find(
        user => user.email === credentials.email && user.password === credentials.password
      );
      
      if (matchedUser) {
        // Update lastLogin time for the user
        const currentTime = new Date().toISOString();
        
        // Create user object without password
        const user = {
          id: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          phone: matchedUser.phone || '',
          role: matchedUser.role,
          lastLogin: currentTime
        };
        
        // Update the lastLogin in registeredUsers if this is a registered user
        if (registeredUsers.length > 0) {
          const updatedRegisteredUsers = registeredUsers.map(regUser => 
            regUser.email === user.email ? { ...regUser, lastLogin: currentTime } : regUser
          );
          localStorage.setItem('registeredUsers', JSON.stringify(updatedRegisteredUsers));
        }
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user));
        
        // Set session expiry (for demo purposes - 1 hour)
        const expiryTime = new Date();
        expiryTime.setHours(expiryTime.getHours() + 1);
        sessionStorage.setItem('sessionExpiry', expiryTime.toISOString());
        
        dispatch(loginSuccess(user));
        return { success: true, user };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { success: false, error: error.message };
    }
  };
};

// Register user
export const register = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      // Validate registration data
      if (!userData.email || !userData.password || !userData.name || !userData.phone) {
        throw new Error('All fields are required');
      }
      
      // Check if email already exists in registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const emailExists = registeredUsers.some(user => user.email === userData.email);
      
      if (emailExists) {
        throw new Error('Email already registered. Please use a different email.');
      }
      
      // Create new user object
      const newUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // In a real app, this would be hashed
        role: userData.role || 'user', // Use provided role or default to 'user'
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString() // Set initial login time
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add to registered users list
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Create a user object without sensitive data for the Redux store
      const safeUser = { ...newUser };
      delete safeUser.password; // Remove password from the object sent to Redux
      
      // Dispatch success with the safe user object
      dispatch(registerSuccess(safeUser));
      return { success: true, user: safeUser };
    } catch (error) {
      dispatch(registerFailure(error.message));
      return { success: false, error: error.message };
    }
  };
};

// Logout user
export const logout = () => {
  return (dispatch) => {
    // Clear all user data from localStorage
    localStorage.removeItem('user');
    
    // Note: We don't remove registeredUsers as we want to keep track of all registered users
    // localStorage.removeItem('registeredUsers');
    
    // Clear any other app-specific data from localStorage if needed
    // localStorage.removeItem('appointments');
    // localStorage.removeItem('userPreferences');
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Dispatch logout action to update Redux state
    dispatch({ type: types.LOGOUT });
    
    return { success: true };
  };
};

// Update profile action creators
export const updateProfileRequest = () => ({
  type: types.UPDATE_PROFILE_REQUEST
});

export const updateProfileSuccess = (user) => ({
  type: types.UPDATE_PROFILE_SUCCESS,
  payload: user
});

export const updateProfileFailure = (error) => ({
  type: types.UPDATE_PROFILE_FAILURE,
  payload: error
});

// Update profile
export const updateProfile = (userData) => {
  return async (dispatch) => {
    dispatch(updateProfileRequest());
    try {
      // Validate profile data
      if (!userData.name || !userData.email) {
        throw new Error('Name and email are required');
      }
      
      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      if (!currentUser.id) {
        throw new Error('User not found. Please log in again.');
      }
      
      // Create updated user object
      const updatedUser = {
        ...currentUser,
        name: userData.name,
        email: userData.email,
        phone: userData.phone || currentUser.phone || '',
        updatedAt: new Date().toISOString()
      };
      
      // If password is provided, update it
      if (userData.password) {
        // In a real app, you would hash the password
        // For this demo, we need to update the password in the registered users list
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const defaultUsers = [
          {
            id: 1,
            email: 'admin@example.com',
            password: 'password',
            name: 'Admin User',
            role: 'admin'
          },
          {
            id: 2,
            email: 'doctor@example.com',
            password: 'doctor123',
            name: 'Dr. Smith',
            role: 'doctor'
          },
          {
            id: 3,
            email: 'patient@example.com',
            password: 'patient123',
            name: 'John Doe',
            role: 'patient'
          }
        ];
        
        // Find and update the user in the appropriate list
        let userUpdated = false;
        
        // Check in registered users first
        const updatedRegisteredUsers = registeredUsers.map(user => {
          if (user.id === currentUser.id) {
            userUpdated = true;
            return {
              ...user,
              name: userData.name,
              email: userData.email,
              phone: userData.phone || user.phone || '',
              password: userData.password
            };
          }
          return user;
        });
        
        // If user was found and updated in registered users, save the updated list
        if (userUpdated) {
          localStorage.setItem('registeredUsers', JSON.stringify(updatedRegisteredUsers));
        } else {
          // Check in default users
          const updatedDefaultUsers = defaultUsers.map(user => {
            if (user.id === currentUser.id) {
              userUpdated = true;
              return {
                ...user,
                name: userData.name,
                email: userData.email,
                phone: userData.phone || user.phone || '',
                password: userData.password
              };
            }
            return user;
          });
          
          // For demo purposes, we'll update the default users in localStorage too
          if (userUpdated) {
            localStorage.setItem('defaultUsers', JSON.stringify(updatedDefaultUsers));
          }
        }
        
        if (!userUpdated) {
          throw new Error('User not found in the system. Please log in again.');
        }
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Dispatch success with the updated user
      dispatch(updateProfileSuccess(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      dispatch(updateProfileFailure(error.message));
      return { success: false, error: error.message };
    }
  };
};
