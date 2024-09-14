// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import apiSlice from '../features/api/apiSlice'; // Import your base apiSlice

// Configure the Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer once
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the apiSlice middleware once
});

// Optional: Setup listeners for automatic cache re-fetching, etc.
setupListeners(store.dispatch);

export default store;
