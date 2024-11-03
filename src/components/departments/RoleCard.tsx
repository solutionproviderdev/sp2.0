import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Box,
	Avatar,
	Stack,
	Chip,
	Button,
} from '@mui/material';
import { FaUsers, FaPen, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Role } from '../../features/auth/department/departmentAPI';

interface RoleCardProps {
	role: Role;
}

const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				borderRadius: '12px',
				boxShadow: 3,
				height: '250px', // Set a fixed height for all cards
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
				{/* Role Name and Edit Button */}
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={1}
				>
					<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
						{role.roleName}
					</Typography>
					<Button
						variant="outlined"
						startIcon={<FaPen />}
						onClick={() => navigate(`/edit-role/${role._id}`)}
					>
						Edit
					</Button>
				</Box>

				{/* Description */}
				<Typography
					variant="body2"
					color="textSecondary"
					gutterBottom
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 2, // Limit description to 2 lines
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{role.description || 'No description available'}
				</Typography>

				{/* Permissions */}
				<Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
					{role.permissions.map(permission => (
						<Chip
							key={`${permission.resource}-${permission.action}`}
							label={`${permission.resource} (${permission.action})`}
							// icon={<FaShieldAlt />}
							size="small" // Smaller chips
							variant="outlined"
							color="primary"
							sx={{ mb: 1 }}
						/>
					))}
				</Stack>

				{/* Staff Count */}
				<Box display="flex" alignItems="center" mt={2}>
					<Avatar sx={{ backgroundColor: '#43A047', marginRight: 1 }}>
						<FaUsers style={{ color: 'white' }} />
					</Avatar>
					<Typography variant="body2">Staff: {role.staffCount}</Typography>
				</Box>

				{/* Department Name */}
				<Typography variant="body2" color="textSecondary" mt={1}>
					Department: {role.departmentName}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default RoleCard;
