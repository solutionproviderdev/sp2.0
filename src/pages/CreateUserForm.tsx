import React, { useState } from 'react';
import {
	Box,
	TextField,
	Button,
	MenuItem,
	Typography,
	FormControl,
	InputLabel,
	Select,
	Grid,
} from '@mui/material';
import { useCreateUserMutation } from '../features/auth/authAPI';
import { useGetAllDepartmentsQuery } from '../features/auth/department/departmentAPI';

const CreateUserForm: React.FC = () => {
	const [formData, setFormData] = useState({
		nameAsPerNID: '',
		nickname: '',
		email: '',
		personalPhone: '',
		officePhone: '',
		gender: '',
		address: '',
		password: '',
		currentSalary: '',
		workingProcedure: '',
		documents: {
			resume: '',
			nidCopy: '',
			academicDocument: '',
		},
		socialLinks: {
			facebook: '',
			instagram: '',
			whatsapp: '',
		},
		guardian: {
			name: '',
			phone: '',
			relation: '',
		},
		type: '',
		department: '', // Selected department
		role: '', // Selected role from department
	});

	const [availableRoles, setAvailableRoles] = useState([]); // To store roles based on department selection

	// Fetch all departments and their roles
	const { data: departments, isLoading: isDepartmentsLoading } =
		useGetAllDepartmentsQuery();
	const [createUser, { isLoading, isSuccess, isError }] =
		useCreateUserMutation();

	// Handle department change and populate available roles
	const handleDepartmentChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		const selectedDepartmentId = event.target.value as string;
		const selectedDepartment = departments?.find(
			dept => dept._id === selectedDepartmentId
		);
		if (selectedDepartment) {
			setFormData({
				...formData,
				department: selectedDepartmentId,
				role: '', // Reset role when department changes
			});
			setAvailableRoles(selectedDepartment.roles || []); // Update available roles based on department
		}
	};

	const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setFormData({
			...formData,
			role: event.target.value as string,
		});
	};

	// Handle input change
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await createUser(formData).unwrap();
		} catch (error) {
			console.error('Failed to create user:', error);
		}
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
            autoComplete='off'
			p={3}
			sx={{ fontSize: '0.875rem' }} // Small font size
			className="max-h-[calc(100vh-64px)] overflow-y-scroll scrollbar-none"
		>
			<Typography variant="h6" gutterBottom sx={{ fontSize: '1rem' }}>
				Create New User
			</Typography>

			{/* Contact Section */}
			<Typography variant="body1" gutterBottom sx={{ fontSize: '0.9rem' }}>
				Contact Information
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						label="Name (As per NID)"
						name="nameAsPerNID"
						value={formData.nameAsPerNID}
						onChange={handleChange}
						fullWidth
						required
						size="small" // Smaller size
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Nickname"
						name="nickname"
						value={formData.nickname}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Personal Phone"
						name="personalPhone"
						value={formData.personalPhone}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Office Phone"
						name="officePhone"
						value={formData.officePhone}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Address"
						name="address"
						value={formData.address}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>

				{/* Gender */}
				<Grid item xs={12} md={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Gender</InputLabel>
						<Select
							label="Gender"
							name="gender"
							value={formData.gender}
							onChange={handleChange}
							required
						>
							<MenuItem value="Male">Male</MenuItem>
							<MenuItem value="Female">Female</MenuItem>
							<MenuItem value="Other">Other</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			{/* Employment Details Section */}
			<Typography
				variant="body1"
				gutterBottom
				mt={4}
				sx={{ fontSize: '0.9rem' }}
			>
				Employment Details
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Department</InputLabel>
						<Select
							label="Department"
							name="department"
							value={formData.department}
							onChange={handleDepartmentChange}
							required
						>
							{departments?.map(dept => (
								<MenuItem key={dept._id} value={dept._id}>
									{dept.departmentName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Role</InputLabel>
						<Select
							label="Role"
							name="role"
							value={formData.role}
							onChange={handleRoleChange}
							required
							disabled={!availableRoles.length}
						>
							{availableRoles.map(role => (
								<MenuItem key={role._id} value={role._id}>
									{role.roleName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={6}>
					<TextField
						label="Current Salary"
						name="currentSalary"
						value={formData.currentSalary}
						onChange={handleChange}
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Working Procedure"
						name="workingProcedure"
						value={formData.workingProcedure}
						onChange={handleChange}
						fullWidth
						multiline
						size="small"
					/>
				</Grid>
			</Grid>

			{/* Guardian Information Section */}
			<Typography
				variant="body1"
				gutterBottom
				mt={4}
				sx={{ fontSize: '0.9rem' }}
			>
				Guardian Information
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						label="Guardian Name"
						name="guardian.name"
						value={formData.guardian.name}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Guardian Phone"
						name="guardian.phone"
						value={formData.guardian.phone}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Guardian Relation"
						name="guardian.relation"
						value={formData.guardian.relation}
						onChange={handleChange}
						fullWidth
						required
						size="small"
					/>
				</Grid>
			</Grid>

			{/* Access Level Section */}
			<Typography
				variant="body1"
				gutterBottom
				mt={4}
				sx={{ fontSize: '0.9rem' }}
			>
				Access Level
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth size="small">
						<InputLabel>User Type</InputLabel>
						<Select
							label="User Type"
							name="type"
							value={formData.type}
							onChange={handleChange}
							required
						>
							<MenuItem value="Admin">Admin</MenuItem>
							<MenuItem value="Operator">Operator</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			{/* Documents Section */}
			<Typography
				variant="body1"
				gutterBottom
				mt={4}
				sx={{ fontSize: '0.9rem' }}
			>
				Documents
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<TextField
						label="Resume"
						name="documents.resume"
						value={formData.documents.resume}
						onChange={handleChange}
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="NID Copy"
						name="documents.nidCopy"
						value={formData.documents.nidCopy}
						onChange={handleChange}
						fullWidth
						size="small"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Academic Document"
						name="documents.academicDocument"
						value={formData.documents.academicDocument}
						onChange={handleChange}
						fullWidth
						size="small"
					/>
				</Grid>
			</Grid>

			{/* Password */}
			<TextField
				label="Password"
				name="password"
				type="password"
				value={formData.password}
				onChange={handleChange}
				fullWidth
				margin="normal"
				required
				size="small"
			/>

			{/* Submit Button */}
			<Button
				type="submit"
				variant="contained"
				color="primary"
				disabled={isLoading}
				fullWidth
				sx={{ mt: 2 }}
			>
				{isLoading ? 'Creating User...' : 'Create User'}
			</Button>

			{/* Success/Error Messages */}
			{isSuccess && (
				<Typography color="success.main" align="center" sx={{ mt: 2 }}>
					User created successfully!
				</Typography>
			)}
			{isError && (
				<Typography color="error.main" align="center" sx={{ mt: 2 }}>
					Error creating user. Please try again.
				</Typography>
			)}
		</Box>
	);
};

export default CreateUserForm;
