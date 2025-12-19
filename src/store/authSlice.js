import { createSlice } from '@reduxjs/toolkit';

// Helper to load user from localStorage
const loadUser = () => {
    try {
        const serializedUser = localStorage.getItem('user');
        if (serializedUser === null) {
            return null;
        }
        return JSON.parse(serializedUser);
    } catch (e) {
        console.warn("Failed to load user from storage:", e);
        localStorage.removeItem('user'); // Clear corrupted data
        return null;
    }
};

const initialState = {
    user: loadUser(),
    isAuthenticated: !!loadUser(),
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
});

export const { loginSuccess, loginFailure, logout, clearError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
