import { configureStore, } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import { videoApi } from './services/videoService';
import {authApi} from './services/authService';

export const store = configureStore({
    reducer: {
      account: accountReducer,
      [videoApi.reducerPath]:videoApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk:true})
    .prepend(videoApi.middleware,authApi.middleware),
})
