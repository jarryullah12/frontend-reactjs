import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Define types to be used throughout the app
export interface PostsStateType {
  posts: any[];
  loading: boolean;
  error: string | null;
}

export interface ThemeStateType {
  mode: 'light' | 'dark';
}

export interface UserStateType {
  currentUser: any | null;
  allUsers: any[];
  friends: any[];
  loading: boolean;
  error: string | null;
}

export interface ChatsStateType {
  chats: any[];
  contacts: any[];
  activeChat: string | null;
  loading: boolean;
  error: string | null;
}

export interface StoriesStateType {
  stories: any[];
  loading: boolean;
  error: string | null;
}

export interface SearchStateType {
  query: string;
  results: any[];
  isSearching: boolean;
  error: string | null;
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Enhanced selector with error handling
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => {
  try {
    return useSelector(selector);
  } catch (error) {
    console.error('Redux selector error:', error);
    return null;
  }
};

// Helper hook for accessing specific state slices
export const usePosts = () => useAppSelector((state) => state.posts);
export const useTheme = () => useAppSelector((state) => state.theme);
export const useUser = () => useAppSelector((state) => state.user);
export const useChats = () => useAppSelector((state) => state.chats);
export const useStories = () => useAppSelector((state) => state.stories);
export const useSearch = () => useAppSelector((state) => state.search);