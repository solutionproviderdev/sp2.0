import React, { useState } from 'react';
import {
	Box,
	Typography,
	Grid,
	Switch,
	Button,
	Paper,
	FormControlLabel,
	Snackbar,
	Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
	useGetAllDepartmentsQuery,
	useAddRoleToDepartmentMutation,
	useGetAllPermissionsQuery,
} from '../../features/auth/department/departmentAPI';
import CustomTextField from '../../components/UI/inputs/CustomTextField';
import CustomSelect from '../../components/UI/inputs/CustomSelect';

const AddRole: React.FC = () => {
	const navigate = useNavigate(); // For navigating back after success
	const { data: departments, isLoading: isLoadingDepartments } =
		useGetAllDepartmentsQuery();
	const { data: permissionsData, isLoading: isLoadingPermissions } =
		useGetAllPermissionsQuery();
	const [addRoleToDepartment, { isLoading }] = useAddRoleToDepartmentMutation();

	const [roleName, setRoleName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [departmentId, setDepartmentId] = useState<string>('');
	const [permissions, setPermissions] = useState<any>({});
	const [error, setError] = useState<string | null>(null);
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
		'success'
	);

	// Handle permission toggle
	const handlePermissionToggle = (resource: string, action: string) => {
		setPermissions((prevPermissions: any) => ({
			...prevPermissions,
			[resource]: {
				...prevPermissions[resource],
				[action]: !prevPermissions[resource]?.[action],
			},
		}));
	};

	// Handle form submit
	const handleSubmit = async () => {
		if (!roleName || !departmentId) {
			setError('Role Name and Department are required');
			setSnackbarSeverity('error');
			setSnackbarMessage('Please fill in all required fields');
			setSnackbarOpen(true);
			return;
		}

		const payload = {
			departmentId,
			role: {
				roleName,
				description,
				permissions: Object.keys(permissions).map(resource => ({
					resource,
					actions: Object.keys(permissions[resource]).map(action => ({
						name: action,
						allowed: permissions[resource][action],
					})),
				})),
			},
		};

		try {
			await addRoleToDepartment(payload).unwrap();
			setSnackbarSeverity('success');
			setSnackbarMessage('Role created successfully');
			setSnackbarOpen(true);
			navigate('../roles');
		} catch (err) {
			setSnackbarSeverity('error');
			setSnackbarMessage('Error creating role');
			setSnackbarOpen(true);
			setError('Failed to create the role');
		}
	};

	// Close the Snackbar
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	if (isLoadingDepartments || isLoadingPermissions)
		return <Typography>Loading data...</Typography>;

	return (
		<Box>
			{/* Page Header */}
			<Typography variant="h5" gutterBottom>
				Add New Role
			</Typography>

			<Paper elevation={2} sx={{ p: 4 }}>
				<Grid container spacing={2}>
					{/* Role Name */}
					<CustomTextField
						label="Role Name"
						name="roleName"
						value={roleName}
						onChange={e => setRoleName(e.target.value)}
						required
					/>

					{/* Description */}
					<CustomTextField
						label="Description"
						name="description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						multiline
						rows={3}
					/>

					{/* Department Selector */}
					<CustomSelect
						label="Department"
						name="departmentId"
						value={departmentId}
						onChange={e => setDepartmentId(e.target.value as string)}
						options={
							departments
								? departments.map(department => ({
										value: department._id,
										label: department.departmentName,
								  }))
								: []
						}
					/>
				</Grid>

				{/* Error Message */}
				{error && (
					<Typography color="error" sx={{ mt: 2 }}>
						{error}
					</Typography>
				)}

				{/* Permissions Section */}
				<Box mt={4}>
					<Typography variant="h6" gutterBottom>
						Set Permissions
					</Typography>

					{/* Render permissions dynamically */}
					<Grid container spacing={2}>
						{permissionsData?.map(permission => (
							<Grid item xs={12} key={permission.resource}>
								<Paper elevation={1} sx={{ p: 2 }}>
									{/* Resource Header with a Switch */}
									<FormControlLabel
										control={
											<Switch
												checked={!!permissions[permission.resource]}
												onChange={() =>
													handlePermissionToggle(permission.resource, 'all')
												}
											/>
										}
										label={permission.resource}
									/>
									<Grid container spacing={1} sx={{ mt: 2 }}>
										{permission.actions.map(action => (
											<Grid item xs={6} key={action.name}>
												<FormControlLabel
													control={
														<Switch
															checked={
																!!permissions[permission.resource]?.[
																	action.name
																]
															}
															onChange={() =>
																handlePermissionToggle(
																	permission.resource,
																	action.name
																)
															}
														/>
													}
													label={action.name}
												/>
											</Grid>
										))}
									</Grid>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Box>

				{/* Submit Button */}
				<Box mt={4}>
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? 'Creating...' : 'Create Role'}
					</Button>
				</Box>
			</Paper>

			{/* Snackbar for success or error messages */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AddRole;
