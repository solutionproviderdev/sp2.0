import React, { useState } from 'react';
import { Grid, Typography, IconButton, InputAdornment } from '@mui/material';
import CustomTextField from '../UI/inputs/CustomTextField';
import CustomSelect from '../UI/inputs/CustomSelect'; // Assuming you have a custom select component
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginCredentialsProps {
	formData: {
		nickname: string;
		password: string;
		type: string; // Adding the type field to formData
	};
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const LoginCredentials: React.FC<LoginCredentialsProps> = ({
	formData,
	handleChange,
}) => {
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

	// Handle confirm password change
	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = e.target.value;
		setConfirmPassword(value);

		// Validate if the passwords match
		if (formData.password && value !== formData.password) {
			setPasswordError('Passwords do not match');
		} else {
			setPasswordError('');
		}
	};

	// Toggle password visibility
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleClickShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);

	return (
		<div>
			<Typography variant="body1" gutterBottom mt={4}>
				Login Credentials
			</Typography>
			<Grid container spacing={2}>
				{/* Password field with eye button */}
				<CustomTextField
					label="Password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					required
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleClickShowPassword} edge="end">
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{/* Confirm Password field with eye button */}
				<CustomTextField
					label="Confirm Password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					required
					type={showConfirmPassword ? 'text' : 'password'}
					error={!!passwordError}
					helperText={passwordError}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleClickShowConfirmPassword} edge="end">
									{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{/* Nickname field */}
				<CustomTextField
					label="Nickname"
					name="nickname"
					value={formData.nickname}
					onChange={handleChange}
					required
				/>
				{/* Type Dropdown for Admin or Operator */}
				<CustomSelect
					label="Type"
					name="type"
					value={formData.type}
					onChange={handleChange}
					required
					options={[
						{ value: 'Admin', label: 'Admin' },
						{ value: 'Operator', label: 'Operator' },
					]}
				/>
			</Grid>
		</div>
	);
};

export default LoginCredentials;
