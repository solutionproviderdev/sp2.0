import React from 'react';
import {
	Box,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
} from '@mui/material';

interface UserFilterProps {
	nameFilter: string;
	setNameFilter: (value: string) => void;
	statusFilter: string;
	setStatusFilter: (value: string) => void;
	genderFilter: string;
	setGenderFilter: (value: string) => void;
	departmentFilter: string;
	setDepartmentFilter: (value: string) => void;
	roleFilter: string;
	setRoleFilter: (value: string) => void;
	departments: { departmentId: string; departmentName: string }[];
	roles: { roleId: string; roleName: string }[];
	handleResetFilters: () => void;
}

const UserFilter: React.FC<UserFilterProps> = ({
	nameFilter,
	setNameFilter,
	statusFilter,
	setStatusFilter,
	genderFilter,
	setGenderFilter,
	departmentFilter,
	setDepartmentFilter,
	roleFilter,
	setRoleFilter,
	departments,
	roles,
	handleResetFilters,
}) => {
	// Define the common width for dropdowns
	const dropdownWidth = { minWidth: 200 };

	return (
		<Box display="flex" mb={3} gap={2} alignItems="center" flexWrap="wrap">
			<TextField
				label="Filter by Name"
				value={nameFilter}
				onChange={e => setNameFilter(e.target.value)}
				variant="outlined"
				size="small"
				sx={dropdownWidth}
			/>
			<FormControl variant="outlined" size="small" sx={dropdownWidth}>
				<InputLabel>Status</InputLabel>
				<Select
					value={statusFilter}
					onChange={e => setStatusFilter(e.target.value)}
					label="Status"
				>
					<MenuItem value="all">All</MenuItem>
					<MenuItem value="Active">Active</MenuItem>
					<MenuItem value="Inactive">Inactive</MenuItem>
				</Select>
			</FormControl>
			<FormControl variant="outlined" size="small" sx={dropdownWidth}>
				<InputLabel>Gender</InputLabel>
				<Select
					value={genderFilter}
					onChange={e => setGenderFilter(e.target.value)}
					label="Gender"
				>
					<MenuItem value="all">All</MenuItem>
					<MenuItem value="Male">Male</MenuItem>
					<MenuItem value="Female">Female</MenuItem>
					<MenuItem value="Other">Other</MenuItem>
				</Select>
			</FormControl>

			{/* New Department Filter */}
			<FormControl variant="outlined" size="small" sx={dropdownWidth}>
				<InputLabel>Department</InputLabel>
				<Select
					value={departmentFilter}
					onChange={e => setDepartmentFilter(e.target.value)}
					label="Department"
				>
					<MenuItem value="all">All</MenuItem>
					{departments.map(department => (
						<MenuItem
							key={department?.departmentId}
							value={department?.departmentId}
						>
							{department?.departmentName}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* New Role Filter */}
			<FormControl variant="outlined" size="small" sx={dropdownWidth}>
				<InputLabel>Role</InputLabel>
				<Select
					value={roleFilter}
					onChange={e => setRoleFilter(e.target.value)}
					label="Role"
				>
					<MenuItem value="all">All</MenuItem>
					{roles.map(role => (
						<MenuItem key={role?.roleId} value={role?.roleId}>
							{role?.roleName}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Button variant="contained" onClick={handleResetFilters}>
				Reset Filters
			</Button>
		</Box>
	);
};

export default UserFilter;
