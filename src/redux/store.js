import { configureStore } from '@reduxjs/toolkit';
import storiesSlice from './storiesSlice';

export const store = configureStore({
  reducer: {
    stories: storiesSlice,
  },
});

