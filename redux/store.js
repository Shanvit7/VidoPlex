import { configureStore, } from '@reduxjs/toolkit';
import { videoApi } from './services/videoService';
import {authApi} from './services/authService';
import {userApi} from './services/userService';

export const store = configureStore({
    reducer: {
      [videoApi.reducerPath]:videoApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]:userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({thunk:true})
    .prepend(videoApi.middleware,authApi.middleware,userApi.middleware),
})
