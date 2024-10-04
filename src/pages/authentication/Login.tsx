import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Container,
	TextField,
	Button,
	Box,
	Typography,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice'; // Adjust the import for setUser
import { useLoginUserMutation } from '../../features/auth/authAPI';

const Login: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
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
		} catch (err: any) {
			setErrorMessage(err?.data?.msg || 'Failed to login'); // Set error message
		}
	};

	const handleClickShowPassword = () => setShowPassword(prev => !prev);
	const handleMouseDownPassword = (event: React.MouseEvent) => {
		event.preventDefault();
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Sign in to your account
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email-address"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={username}
						onChange={e => setUsername(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type={showPassword ? 'text' : 'password'}
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{errorMessage && (
						<Typography color="error" variant="body2">
							{errorMessage}
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						color="primary"
						disabled={isLoading}
					>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;
