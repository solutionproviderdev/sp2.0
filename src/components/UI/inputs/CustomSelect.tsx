import React from 'react';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Grid,
	IconButton,
	InputAdornment,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface CustomSelectProps {
	label?: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
	options: { value: string; label: string }[];
	fullWidth?: boolean;
	required?: boolean;
	size?: 'small' | 'medium';
	disabled?: boolean;
	clearable?: boolean; // New prop for making it cleanable
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
	clearable = false, // Default value is false
}) => {
	// Function to clear the selection
	const handleClear = () => {
		const event = {
			target: { value: '' }, // Set the value to an empty string
		};
		onChange(event as React.ChangeEvent<{ value: unknown }>);
	};

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
					endAdornment={
						clearable && value ? (
							<InputAdornment position="end">
								<IconButton
									edge="end"
									onClick={handleClear}
									aria-label={`Clear ${label}`}
									style={{ marginRight: 8 }}
								>
									<ClearIcon />
								</IconButton>
							</InputAdornment>
						) : null
					}
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
