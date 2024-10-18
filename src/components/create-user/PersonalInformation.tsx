import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomTextField from '../UI/inputs/CustomTextField';
import CustomSelect from '../UI/inputs/CustomSelect';

interface PersonalInfoProps {
	formData: any;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const PersonalInformation: React.FC<PersonalInfoProps> = ({
	formData,
	handleChange,
}) => (
	<div>
		<Typography variant="body1" gutterBottom>
			Personal Information
		</Typography>
		<Grid container spacing={2}>
			<CustomTextField
				label="Name (As per NID)"
				name="nameAsPerNID"
				value={formData.nameAsPerNID}
				onChange={handleChange}
				required
			/>
			<CustomTextField
				label="Email"
				name="email"
				value={formData.email}
				onChange={handleChange}
				required
			/>
			<CustomTextField
				label="Personal Phone"
				name="personalPhone"
				value={formData.personalPhone}
				onChange={handleChange}
				required
			/>
			<CustomTextField
				label="Office Phone"
				name="officePhone"
				value={formData.officePhone}
				onChange={handleChange}
				required
			/>
			<CustomTextField
				label="Address"
				name="address"
				value={formData.address}
				onChange={handleChange}
				required
			/>
			<CustomSelect
				label="Gender"
				name="gender"
				value={formData.gender}
				onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
				required
				options={[
					{ value: 'Male', label: 'Male' },
					{ value: 'Female', label: 'Female' },
					{ value: 'Other', label: 'Other' },
				]}
			/>
		</Grid>
	</div>
);
export default PersonalInformation;
