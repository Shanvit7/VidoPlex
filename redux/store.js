import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountReducer from './slices/accountSlice';


export const store = configureStore({
    reducer: {
      authorization: authReducer,
      account: accountReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk:true}),
})