import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';


export const store = configureStore({
    reducer: {
      authorization: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk:true}),
})