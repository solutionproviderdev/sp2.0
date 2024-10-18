import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';

interface CustomSelectProps {
	label: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
	options: { value: string; label: string }[];
	fullWidth?: boolean;
	required?: boolean;
	size?: 'small' | 'medium';
	disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	label,
	name,
	value,
	onChange,
	options,
	fullWidth = true,
	required = false,
	size = 'small',
	disabled = false,
}) => {
	return (
		<Grid item xs={12} md={6}>
			<FormControl fullWidth={fullWidth} required={required} size={size}>
				<InputLabel>{label}</InputLabel>
				<Select
					label={label}
					name={name}
					value={value}
					onChange={event =>
						onChange(event as React.ChangeEvent<{ value: unknown }>)
					}
					disabled={disabled}
				>
					{options?.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Grid>
	);
};
export default CustomSelect;
