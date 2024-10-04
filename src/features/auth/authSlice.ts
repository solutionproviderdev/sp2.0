import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// Define the structure of the JWT payload
interface JwtPayload {
	exp: number; // Expiration time in seconds
}

interface User {
	_id: string;
	nameAsPerNID: string;
	nickname: string;
	email: string;
	personalPhone: string;
	officePhone: string;
	gender: string;
	address: string;
	profilePicture?: string;
	coverPhoto?: string;
	status: string;
	roleId?: string;
	departmentId?: string;
}

interface AuthState {
	user: User | null;
	isLoggedIn: boolean;
	token: string | null;
}

// Helper to check if the token is expired
const isTokenValid = (token: string | null): boolean => {
	if (!token) return false;

	try {
		const decodedToken = jwtDecode<JwtPayload>(token);
		const currentTime = Date.now() / 1000; // Get the current time in seconds
		return decodedToken.exp > currentTime; // Check if the token has not expired
	} catch (error) {
		return false; // If the token is invalid or decoding fails, treat it as expired
	}
};

// Initialize user and token from local storage if available and valid
const userFromLocalStorage = localStorage.getItem('user');
const tokenFromLocalStorage = localStorage.getItem('token');
const initialTokenIsValid = isTokenValid(tokenFromLocalStorage);

const initialState: AuthState = {
	user:
		initialTokenIsValid && userFromLocalStorage
			? JSON.parse(userFromLocalStorage)
			: null,
	isLoggedIn: initialTokenIsValid, // Only set to true if the token is valid
	token: initialTokenIsValid ? tokenFromLocalStorage : null,
};

// If the token is invalid, remove it from localStorage immediately
if (!initialTokenIsValid) {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
			state.user = action.payload.user;
			state.isLoggedIn = true;
			state.token = action.payload.token;

			// Store token and user in localStorage
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('user', JSON.stringify(action.payload.user));
		},
		logoutUser: state => {
			state.user = null;
			state.isLoggedIn = false;
			state.token = null;

			// Remove token and user from localStorage
			localStorage.removeItem('token');
			localStorage.removeItem('user');
		},
	},
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
