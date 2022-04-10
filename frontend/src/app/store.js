import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import userMatchReducer from '../features/userMatches/userMatchSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    userMatches: userMatchReducer,
  },
});
