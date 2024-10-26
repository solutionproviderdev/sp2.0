import React from 'react';
import { TextField, Grid, InputProps as MuiInputProps } from '@mui/material';

interface CustomTextFieldProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	fullWidth?: boolean;
	required?: boolean;
	size?: 'small' | 'medium';
	type?: string;
	multiline?: boolean;
	error?: boolean;
	helperText?: string;
	InputProps?: Partial<MuiInputProps>; // Accepting InputProps for handling password visibility toggle
	rows?: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
	label,
	name,
	value,
	onChange,
	fullWidth = true,
	required = false,
	size = 'small',
	type = 'text',
	multiline = false,
	error,
	helperText,
	InputProps, // Destructuring InputProps for use
	rows,
}) => {
	return (
		<Grid item xs={12} md={6}>
			<TextField
				label={label}
				name={name}
				value={value}
				onChange={onChange}
				fullWidth={fullWidth}
				required={required}
				size={size}
				type={type}
				multiline={multiline}
				error={error}
				helperText={helperText}
				InputProps={InputProps} // Applying InputProps here
				rows={rows}
			/>
		</Grid>
	);
};

export default CustomTextField;
