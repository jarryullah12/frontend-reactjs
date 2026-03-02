import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMenuOpen: false,
  searchOpen: false,
  cartDrawerOpen: false,
  filterDrawerOpen: false,
  notification: null,
  theme: 'light'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      
      // Close other UI elements when mobile menu is opened
      if (state.mobileMenuOpen) {
        state.searchOpen = false;
        state.cartDrawerOpen = false;
        state.filterDrawerOpen = false;
      }
    },
    
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen;
      
      // Close other UI elements when search is opened
      if (state.searchOpen) {
        state.mobileMenuOpen = false;
        state.cartDrawerOpen = false;
        state.filterDrawerOpen = false;
      }
    },
    
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
      
      // Close other UI elements when cart drawer is opened
      if (state.cartDrawerOpen) {
        state.mobileMenuOpen = false;
        state.searchOpen = false;
        state.filterDrawerOpen = false;
      }
    },
    
    closeCartDrawer: (state) => {
      state.cartDrawerOpen = false;
    },
    
    toggleFilterDrawer: (state) => {
      state.filterDrawerOpen = !state.filterDrawerOpen;
      
      // Close other UI elements when filter drawer is opened
      if (state.filterDrawerOpen) {
        state.mobileMenuOpen = false;
        state.searchOpen = false;
        state.cartDrawerOpen = false;
      }
    },
    
    closeFilterDrawer: (state) => {
      state.filterDrawerOpen = false;
    },
    
    showNotification: (state, action) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type || 'info',
        duration: action.payload.duration || 3000
      };
    },
    
    clearNotification: (state) => {
      state.notification = null;
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  }
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  toggleSearch,
  closeSearch,
  toggleCartDrawer,
  closeCartDrawer,
  toggleFilterDrawer,
  closeFilterDrawer,
  showNotification,
  clearNotification,
  setTheme
} = uiSlice.actions;

export default uiSlice.reducer; 