// src/pages/layout/RootLayout.tsx
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const RootLayout: React.FC = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!auth.isLoggedIn && location.pathname !== '/authentication/login') {
			navigate('/authentication/login');
		} else if (
			auth.isLoggedIn &&
			location.pathname === '/authentication/login'
		) {
			navigate('/admin/dashboard'); // Change to /operator/dashboard for operator
		}
	}, [auth, navigate, location.pathname]);

	return (
		<>
			<Outlet />
		</>
	);
};

export default RootLayout;
