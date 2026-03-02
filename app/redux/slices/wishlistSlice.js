import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem
        });
      }
    },
    
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    
    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.items.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists in wishlist, remove it
        state.items.splice(existingItemIndex, 1);
      } else {
        // Item doesn't exist in wishlist, add it
        state.items.push({
          ...item
        });
      }
    },
    
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer; 