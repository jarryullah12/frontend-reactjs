import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for activity data
export interface ActivityUser {
  name: string;
  image: string;
  initials?: string;
}

export interface ActivityItem {
  id: number;
  user: ActivityUser;
  action: string;
  target?: string;
  targetUser?: string;
  targetAction?: string;
  extraText?: string;
  time: string;
  visibility?: string;
  reactions?: string[];
  comment?: string;
}

// Interface for activity state
interface ActivityState {
  activities: ActivityItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

// Initial state
const initialState: ActivityState = {
  activities: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1
};

// Create the activity slice
const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    // Action to fetch activities
    fetchActivitiesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchActivitiesSuccess: (state, action: PayloadAction<ActivityItem[]>) => {
      state.loading = false;
      state.activities = action.payload;
      state.hasMore = action.payload.length >= 5; // Assuming 5 is the page size
    },
    fetchActivitiesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action to load more activities
    loadMoreActivitiesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadMoreActivitiesSuccess: (state, action: PayloadAction<ActivityItem[]>) => {
      state.loading = false;
      state.activities = [...state.activities, ...action.payload];
      state.page = state.page + 1;
      state.hasMore = action.payload.length >= 5; // Assuming 5 is the page size
    },
    loadMoreActivitiesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Action to add a new activity
    addActivity: (state, action: PayloadAction<ActivityItem>) => {
      state.activities.unshift(action.payload);
    },
    
    // Action to remove an activity
    removeActivity: (state, action: PayloadAction<number>) => {
      state.activities = state.activities.filter(activity => activity.id !== action.payload);
    },
    
    // Action to clear all activities
    clearActivities: (state) => {
      state.activities = [];
      state.page = 1;
      state.hasMore = true;
    }
  }
});

// Export actions
export const {
  fetchActivitiesRequest,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  loadMoreActivitiesRequest,
  loadMoreActivitiesSuccess,
  loadMoreActivitiesFailure,
  addActivity,
  removeActivity,
  clearActivities
} = activitySlice.actions;

// Export reducer
export default activitySlice.reducer;
