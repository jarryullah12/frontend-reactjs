import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  results: any[];
  isSearching: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  isSearching: false,
  error: null
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.results = action.payload;
      state.isSearching = false;
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.results = [];
      state.query = '';
    },
    startSearching: (state) => {
      state.isSearching = true;
      state.error = null;
    },
    setSearchError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isSearching = false;
    }
  }
});

export const { 
  setSearchQuery, 
  setSearchResults, 
  clearSearchResults, 
  startSearching, 
  setSearchError 
} = searchSlice.actions;

export default searchSlice.reducer;
