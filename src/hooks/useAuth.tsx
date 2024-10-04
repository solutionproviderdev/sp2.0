import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { jwtDecode } from 'jwt-decode';
import { logoutUser } from '../features/auth/authSlice';

interface DecodedToken {
	exp: number; // Expiration time of the token
}

const useAuth = () => {
	const dispatch = useDispatch();
	const { user, isLoggedIn, token } = useSelector(
		(state: RootState) => state.auth
	);

	// Check if token is expired
	if (token) {
		const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
		const currentTime = Date.now() / 1000;

		if (decoded.exp < currentTime) {
			dispatch(logoutUser());
			return { user: null, isLoggedIn: false };
		}
	}

	return { user, isLoggedIn };
};

export default useAuth;
