import React from 'react';
import { Grid, Typography } from '@mui/material';
import CustomTextField from '../UI/inputs/CustomTextField';

interface EmergencyContactInfoProps {
	formData: any;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const EmergencyContactInfo: React.FC<EmergencyContactInfoProps> = ({
	formData,
	handleChange,
}) => (
	<div>
		<Typography variant="body1" gutterBottom mt={4}>
			Emergency Contact Information
		</Typography>
		<Grid container spacing={2}>
			<CustomTextField
				label="Guardian Name"
				name="guardian.name"
				value={formData?.guardian?.name}
				onChange={handleChange}
				required
			/>
			<CustomTextField
				label="Guardian Phone"
				name="guardian.phone"
				value={formData?.guardian?.phone}
				onChange={handleChange}
				required
			/>
			<CustomTextField
				label="Relation"
				name="guardian.relation"
				value={formData?.guardian?.relation}
				onChange={handleChange}
				required
			/>
		</Grid>
	</div>
);

export default EmergencyContactInfo;
