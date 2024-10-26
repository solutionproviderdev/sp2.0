import React from 'react';
import { Box, Typography, Switch, Grid } from '@mui/material';

const AccessRoleTab: React.FC = () => {
	// Dummy permission data
	const permissions = {
		Dashboard: ['Dashboard', 'Tracking Dashboard', 'Visiting Dashboard'],
		Analytics: ['Sales Analytics', 'Product Analytics', 'Activity Analytics'],
		User: [
			'Notifications',
			'Read Notification',
			'Fetch Current Location',
			'Delivery Details',
		],
		Attendance: ['All Attendances', 'Attendance Details'],
		'Visit Shop': [
			'Visit Shop History',
			'Visit Shop Details',
			'Visit Shop Statement',
		],
		Category: [
			'All Categories',
			'Add Category',
			'Update Category',
			'Category Status',
		],
	};

	return (
		<Box p={3}>
			<Typography variant="h6" gutterBottom>
				Set Permissions
			</Typography>
			{Object.keys(permissions).map(category => (
				<Box key={category} mb={3}>
					{/* Category title */}
					<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
						{category}
					</Typography>
					{/* Permission switches */}
					<Grid container spacing={3}>
						{permissions[category].map((permission: string, index: number) => (
							<Grid item xs={12} sm={6} md={4} key={index}>
								<Box display="flex" alignItems="center">
									<Switch color="primary" />
									<Typography ml={1}>{permission}</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			))}
		</Box>
	);
};

export default AccessRoleTab;
