import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';
import { checkTokenAndLogout } from '../../hooks/checkTokenAndLogout';

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		// baseUrl: `${import.meta.env.VITE_API_URL}/api`,
		baseUrl: `${import.meta.env.VITE_API_URL}`,
		prepareHeaders: (headers, { getState }) => {
			// Get token from auth state
			const token = (getState() as RootState).auth.token;

			// Check token validity, and if invalid, handle logout
			const isValid = checkTokenAndLogout(token);
			if (token && isValid) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: () => ({}),
});

export default apiSlice;
