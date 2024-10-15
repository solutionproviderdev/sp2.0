import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	TableContainer,
	Switch,
	Avatar,
	Chip,
} from '@mui/material';
import { FaGenderless, FaMale, FaFemale } from 'react-icons/fa';
import { useGetAllUsersQuery } from '../features/auth/authAPI';
import UserFilter from '../components/user/UserFilter';
import { Link } from 'react-router-dom';

interface User {
	_id: string;
	nameAsPerNID: string;
	email: string;
	personalPhone: string;
	gender: string;
	status: string;
	profilePicture: string;
	department: {
		departmentName: string;
		departmentId: string;
	};
	role: {
		roleName: string;
		roleId: string;
	};
	type: string;
}

// User Management Component
const UserManagement: React.FC = () => {
	const { data: users, isLoading } = useGetAllUsersQuery();
	const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState<string>('');
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [genderFilter, setGenderFilter] = useState<string>('all');
	const [departmentFilter, setDepartmentFilter] = useState<string>('all');
	const [roleFilter, setRoleFilter] = useState<string>('all');

	const departments = users
		? [
				...new Map(
					users.map(user => [user.department?.departmentId, user?.department])
				).values(),
		  ]
		: [];

	const roles = users
		? [...new Map(users.map(user => [user?.role?.roleId, user?.role])).values()]
		: [];

	// Filter users based on the filters selected
	useEffect(() => {
		if (!users) return;

		let filtered = users;

		if (nameFilter) {
			filtered = filtered.filter(user =>
				user.nameAsPerNID.toLowerCase().includes(nameFilter.toLowerCase())
			);
		}

		if (statusFilter !== 'all') {
			filtered = filtered.filter(user => user.status === statusFilter);
		}

		if (genderFilter !== 'all') {
			filtered = filtered.filter(user => user.gender === genderFilter);
		}

		if (departmentFilter !== 'all') {
			filtered = filtered.filter(
				user => user.department?.departmentId === departmentFilter
			);
		}

		if (roleFilter !== 'all') {
			filtered = filtered.filter(user => user.role?.roleId === roleFilter);
		}

		setFilteredUsers(filtered);
	}, [
		users,
		nameFilter,
		statusFilter,
		genderFilter,
		departmentFilter,
		roleFilter,
	]);

	// Handle reset filters
	const handleResetFilters = () => {
		setNameFilter('');
		setStatusFilter('all');
		setGenderFilter('all');
		setDepartmentFilter('all');
		setRoleFilter('all');
	};

	const handleStatusToggle = (userId: string, currentStatus: string) => {
		// Logic to handle status change
		console.log(
			`Toggling status for user ID: ${userId}, current status: ${currentStatus}`
		);
	};

	const renderGenderIcon = (gender: string) => {
		switch (gender) {
			case 'Male':
				return <FaMale color="blue" className="text-lg" />;
			case 'Female':
				return <FaFemale color="pink" className="text-lg" />;
			default:
				return <FaGenderless color="gray" />;
		}
	};

	if (isLoading) {
		return <Typography>Loading users...</Typography>;
	}

	return (
		<Box className="overflow-hidden p-2">
			<Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
				All Users
			</Typography>

			<UserFilter
				nameFilter={nameFilter}
				setNameFilter={setNameFilter}
				statusFilter={statusFilter}
				setStatusFilter={setStatusFilter}
				genderFilter={genderFilter}
				setGenderFilter={setGenderFilter}
				departmentFilter={departmentFilter}
				setDepartmentFilter={setDepartmentFilter}
				roleFilter={roleFilter}
				setRoleFilter={setRoleFilter}
				departments={departments}
				roles={roles}
				handleResetFilters={handleResetFilters}
			/>

			<TableContainer
				component={Paper}
				className="w-full max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-none"
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Name
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Email
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Phone
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Gender
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Department
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Role
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Type
							</TableCell>
							<TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>
								Status
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredUsers.map(user => (
							<TableRow key={user._id}>
								<TableCell>
									<Link to={`../${user._id}`} replace={true}>
										<Box
											display="flex"
											alignItems="center"
											gap={2}
											className="cursor-pointer"
										>
											<Avatar
												src={user.profilePicture}
												alt={user.nameAsPerNID}
												sx={{ width: 40, height: 40 }}
											/>
											<Typography variant="body2">
												{user.nameAsPerNID}
											</Typography>
										</Box>
									</Link>
								</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.personalPhone}</TableCell>
								<TableCell>{renderGenderIcon(user.gender)}</TableCell>
								<TableCell>{user.department?.departmentName}</TableCell>
								<TableCell>{user.role?.roleName}</TableCell>
								<TableCell>
									{user.type === 'Admin' && (
										<Chip
											label="Admin"
											color="primary"
											size="small"
											variant="outlined"
										/>
									)}
								</TableCell>
								<TableCell>
									<Switch
										checked={user.status === 'Active'}
										onChange={() => handleStatusToggle(user._id, user.status)}
										color="primary"
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default UserManagement;
