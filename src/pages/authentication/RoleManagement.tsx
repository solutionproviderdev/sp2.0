import React from 'react';
import {
	Box,
	Typography,
	Grid,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	CircularProgress,
	Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetAllDepartmentsQuery } from '../../features/auth/department/departmentAPI';
import RoleCard from '../../components/departments/RoleCard';

const RoleManagement: React.FC = () => {
	const navigate = useNavigate();
	const [filteredDepartment, setFilteredDepartment] =
		React.useState<string>('');

	// Fetch all departments and their roles
	const { data: departments, isLoading: isLoadingDepartments } =
		useGetAllDepartmentsQuery();

	// Handle department filter change
	const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setFilteredDepartment(event.target.value as string);
	};

	// Extract all roles from departments
	const allRoles =
		departments?.flatMap(department =>
			department.roles.map(role => ({
				...role,
				departmentId: department._id, // Add department ID info to each role
				departmentName: department.departmentName, // Add department name info to each role
				staffCount: department.staffCount || 0, // Use staffCount from department
			}))
		) || [];

	// Filter roles based on the selected department
	const filteredRoles = filteredDepartment
		? allRoles.filter(role => role.departmentId === filteredDepartment)
		: allRoles;

	if (isLoadingDepartments) {
		return <CircularProgress />;
	}

	return (
		<Box className="p-2">
			{/* Page Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h5" fontWeight="bold">
					Roles
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate('../create-role')}
				>
					+ Create
				</Button>
			</Box>

			{/* Department Filter */}
			<FormControl fullWidth sx={{ mb: 3 }}>
				<InputLabel id="department-filter-label">Department</InputLabel>
				<Select
					labelId="department-filter-label"
					value={filteredDepartment}
					onChange={handleFilterChange}
					label="Department"
				>
					<MenuItem value="">
						<em>All Departments</em>
					</MenuItem>
					{departments?.map(department => (
						<MenuItem key={department._id} value={department._id}>
							{department.departmentName}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Roles Grid */}
			<Grid container spacing={3}>
				{filteredRoles?.map(role => (
					<Grid item xs={12} sm={6} md={4} key={role._id}>
						<RoleCard role={role} /> {/* Use the RoleCard component */}
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default RoleManagement;
