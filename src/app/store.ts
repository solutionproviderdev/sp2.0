// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import apiSlice from '../features/api/apiSlice'; // Import your base apiSlice
import authReducer from '../features/auth/authSlice'; // Import your authReducer

// Configure the Redux store
const store = configureStore({
	reducer: {
		auth: authReducer, // Add your authReducer here
		[apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer once
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(apiSlice.middleware), // Add the apiSlice middleware once
});

// Optional: Setup listeners for automatic cache re-fetching, etc.
setupListeners(store.dispatch);

// RootState is inferred based on the store's reducer
export type RootState = ReturnType<typeof store.getState>;

export default store;
