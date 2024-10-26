import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Box,
	Avatar,
	Stack,
} from '@mui/material';
import { FaUserTie, FaUsers, FaInfoCircle } from 'react-icons/fa';
import { Department } from '../../features/auth/department/departmentAPI';

interface DepartmentCardProps {
	department: Department;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
	return (
		<Card
			sx={{
				backgroundColor: '#f5f5f5',
				borderRadius: '6px',
				height: '200px', // Set fixed height for all cards
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<CardContent
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
				}}
			>
				{/* Department Name */}
				<Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
					{department.departmentName}
				</Typography>

				{/* Department Description */}
				<Typography
					variant="body2"
					color="textSecondary"
					gutterBottom
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 3, // Limit description to 3 lines
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					<FaInfoCircle style={{ marginRight: 8 }} />
					{department.description || 'No description available'}
				</Typography>

				{/* Department Details */}
				<Stack direction="row" spacing={2} mt={2} alignItems="center">
					{/* Roles Icon */}
					<Box display="flex" alignItems="center">
						<Avatar sx={{ backgroundColor: '#1976D2', marginRight: 1 }}>
							<FaUserTie style={{ color: 'white' }} />
						</Avatar>
						<Typography variant="body2">
							Roles: {department.roles.length}
						</Typography>
					</Box>

					{/* Staff Icon */}
					<Box display="flex" alignItems="center">
						<Avatar sx={{ backgroundColor: '#43A047', marginRight: 1 }}>
							<FaUsers style={{ color: 'white' }} />
						</Avatar>
						<Typography variant="body2">
							Staff: {department.staffCount}
						</Typography>
					</Box>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default DepartmentCard;
