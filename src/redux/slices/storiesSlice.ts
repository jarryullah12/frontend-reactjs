import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content?: string;
  image: string;
  timestamp: string;
  expiresAt: string; // Stories expire after 24 hours
  viewers: string[]; // List of user IDs who viewed the story
}

interface StoriesState {
  stories: Story[];
  loading: boolean;
  error: string | null;
}

const initialState: StoriesState = {
  stories: [],
  loading: false,
  error: null,
};

// Helper function to calculate expiration time (24 hours from creation)
const calculateExpirationTime = (): string => {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);
  return expirationDate.toISOString();
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      console.log('Setting stories in slice:', action.payload);
      state.stories = action.payload;
      state.loading = false;
      state.error = null;
    },
    addStory: (state, action: PayloadAction<Omit<Story, 'id' | 'expiresAt' | 'viewers'>>) => {
      console.log('Adding story in slice:', action.payload);
      
      const newStory: Story = {
        ...action.payload,
        id: uuidv4(), // Using uuid v4 instead of crypto.randomUUID()
        expiresAt: calculateExpirationTime(),
        viewers: []
      };
      
      state.stories.unshift(newStory);
      state.loading = false;
      state.error = null;
    },
    viewStory: (state, action: PayloadAction<{storyId: string, userId: string}>) => {
      const story = state.stories.find(story => story.id === action.payload.storyId);
      if (story && !story.viewers.includes(action.payload.userId)) {
        story.viewers.push(action.payload.userId);
      }
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.stories = state.stories.filter(story => story.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Remove expired stories
    cleanupExpiredStories: (state) => {
      const now = new Date().toISOString();
      state.stories = state.stories.filter(story => story.expiresAt > now);
    }
  },
});

export const { 
  setStories, 
  addStory, 
  viewStory, 
  deleteStory, 
  setLoading, 
  setError,
  cleanupExpiredStories
} = storiesSlice.actions;
export default storiesSlice.reducer;
