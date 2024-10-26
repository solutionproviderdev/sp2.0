import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmploymentDetailsTabProps {
	user: any;
}

const EmploymentDetailsTab: React.FC<EmploymentDetailsTabProps> = ({
	user,
}) => {
	return (
		<Box p={3}>
			<Typography variant="h6">Employment Details</Typography>
			<Typography>Role: {user.role?.roleName}</Typography>
			<Typography>Department: {user.department?.departmentName}</Typography>
			<Typography>
				Joining Date: {new Date(user.joiningDate).toLocaleDateString()}
			</Typography>
			{/* Add any other employment-related fields here */}
		</Box>
	);
};

export default EmploymentDetailsTab;
