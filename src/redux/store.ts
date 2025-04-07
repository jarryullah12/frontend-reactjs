import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import postsReducer from './slices/postsSlice';
import userReducer from './slices/userSlice';
import themeReducer from './slices/themeSlice';
import chatsReducer from './slices/chatsSlice';
import storiesReducer from './slices/storiesSlice';
import searchReducer from './slices/searchSlice';
import activityReducer from './slices/activitySlice';
import authMiddleware from './middleware/authMiddleware';
import activityMiddleware from './middleware/activityMiddleware';
import rootSaga from './sagas/index';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    theme: themeReducer,
    chats: chatsReducer,
    stories: storiesReducer,
    search: searchReducer,
    activity: activityReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(authMiddleware, activityMiddleware, sagaMiddleware),
  devTools: true,
});

// Run the saga
sagaMiddleware.run(rootSaga);

// These types will be used throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;