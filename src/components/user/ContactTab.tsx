import React from 'react';
import { Box, Typography } from '@mui/material';

interface ContactTabProps {
	user: any;
}

const ContactTab: React.FC<ContactTabProps> = ({ user }) => {
	return (
		<Box className="p-2 flex items-start">
			<div className="flex-1">
				<Typography variant="h6" gutterBottom>
					Personal Info
				</Typography>
				<Typography>Name: {user.nameAsPerNID}</Typography>
				<Typography>Personal Phone: {user.personalPhone}</Typography>
				<Typography>Home Address: {user.address}</Typography>
				<Typography>Current Address: {user.address}</Typography>
			</div>

			<div className="flex-1">
				<Typography variant="h6" gutterBottom>
					Guardian Info
				</Typography>
				<Typography>Name: {user.guardian?.name}</Typography>
				<Typography>Phone: {user.guardian?.phone}</Typography>
				<Typography>Relation: {user.guardian?.relation}</Typography>
			</div>
		</Box>
	);
};

export default ContactTab;
