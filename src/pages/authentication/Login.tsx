import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	TextField,
	Button,
	Typography,
	Checkbox,
	FormControlLabel,
	Link,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import eye icons
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice'; // Adjust the import for setUser
import { useLoginUserMutation } from '../../features/auth/authAPI';
import { AiOutlinePhone } from 'react-icons/ai';
import logo from '../../images/logop-ng.png'; // Import the logo from the image folder
import icon from '../../images/Asset2.svg'; // Import the SVG icon
// import animation from '../../images/Asset 3.svg'; // Import the animation SVG
import smartname from '../../images/advanceSoftwear.png';

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // State for password visibility
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginUser, { isLoading }] = useLoginUserMutation();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrorMessage(''); // Clear previous errors
		try {
			// Attempt to log in the user
			const { user, token } = await loginUser({
				email: username,
				password,
			}).unwrap();

			// Store the token in localStorage
			localStorage.setItem('token', token);

			// Dispatch user and token to Redux
			dispatch(setUser({ user, token }));

			// Navigate to the dashboard after successful login
			navigate('/admin/dashboard');
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			setErrorMessage(err?.data?.msg || 'Failed to login'); // Set error message
		}
	};

	// Toggle password visibility
	const handleClickShowPassword = () => setShowPassword(prev => !prev);

	return (
		<div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-row-reverse justify-between items-center w-full p-8 relative">
			{/* Background Image with Opacity */}
			<div
				className="absolute inset-0 z-0"
				style={{
					backgroundImage: `url(${icon})`,
					backgroundSize: 'contain',
					backgroundPosition: '-300px center',
					backgroundRepeat: 'no-repeat',
					opacity: 0.1, // 20% opacity
					// overlay: 'rgba(0, 0, 0, 0.5)',
					// display: 'none',
				}}
			/>
			{/* Left Side: Login Form */}
			<div className="flex-1 flex justify-center z-10">
				<div className="bg-gray-100 p-8 rounded-lg shadow-md w-full max-w-lg">
					<form onSubmit={handleSubmit} className="w-full">
						{/* Logo */}
						<div className="flex justify-center mb-2">
							<img
								src={logo}
								alt="Solution Provider Logo"
								className="w-full h-auto object-cover"
							/>
						</div>

						{/* Email Field */}
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
							autoFocus
							value={username}
							onChange={e => setUsername(e.target.value)}
							className="mb-4"
						/>

						{/* Password Field */}
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? 'text' : 'password'} // Toggle password visibility
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							style={{ borderBlockColor: '#046288' }}
							className="mb-4"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						{/* Remember Me Checkbox */}
						<FormControlLabel
							control={
								<Checkbox
									checked={rememberMe}
									onChange={e => setRememberMe(e.target.checked)}
									color="primary"
								/>
							}
							label="Remember me"
							className="mb-2"
						/>

						{/* Forgot Password Link */}
						<Link
							href="#"
							variant="body2"
							className="block text-right mb-4 text-blue-600 hover:text-blue-800"
						>
							Forgot Password?
						</Link>

						{/* Error Message */}
						{errorMessage && (
							<Typography
								color="error"
								variant="body2"
								className="mb-4 text-red-600"
							>
								{errorMessage}
							</Typography>
						)}

						{/* Login Button */}
						<Button
							type="submit"
							fullWidth
							variant="contained"
							// className="mt-4 py-3 bg-black text-white"
							disabled={isLoading}
							style={{ backgroundColor: '#046288' }}
						>
							{isLoading ? 'Logging in...' : 'Login'}
						</Button>
					</form>
				</div>
			</div>

			{/* Right Side: Visible SVG Icon */}
			<div className="flex-1 flex justify-center items-center relative z-10 opacity-100">
				<img
					src={smartname}
					alt="Decorative Icon"
					className="w-3/4 h-auto max-w-2xl"
				/>
			</div>

			{/* Footer */}
			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-600 z-10">
				<Typography
					variant="body2"
					className="flex justify-center items-center"
				>
					<AiOutlinePhone className="mr-2" /> 01949-654499
				</Typography>
				<Typography variant="body2" className="mb-2">
					© Solution Provider. All rights reserved under copyright law.
				</Typography>
			</div>
		</div>
	);
};

export default Login;
