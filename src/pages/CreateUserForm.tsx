import React, { useState } from 'react';
import { Box, Button, Typography, Grid, Divider } from '@mui/material';
import PersonalInformation from '../components/create-user/PersonalInformation';
import EmergencyContactInfo from '../components/create-user/EmergencyContactInfo';
import DocumentsSection from '../components/create-user/DocumentsSection';
import SocialLinks from '../components/create-user/SocialLinks';
import EmploymentDetails from '../components/create-user/EmploymentDetails';
import LoginCredentials from '../components/create-user/LoginCredentials';
import ProfileCoverUpload from '../components/create-user/ProfileCoverUpload';
import { useCreateUserMutation } from '../features/auth/authAPI';

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
		profilePicture: '',
		coverPhoto: '',
		documents: {
			resume: '',
			nidCopy: '',
			academicDocument: '',
			bankAccountNumber: '',
			agreement: '',
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
		departmentId: '',
		roleId: '',
	});

	// RTK mutation
	const [createUser, { isLoading, isSuccess, isError }] =
		useCreateUserMutation();

	// Handlers
	const handleChange = e => {
		const { name, value } = e.target;
		if (name.includes('guardian')) {
			const [, guardianProperty] = name.split('.');
			setFormData({
				...formData,
				guardian: {
					...formData.guardian,
					[guardianProperty]: value,
				},
			});
			return;
		}

		if (name.includes('socialLinks')) {
			const [, socialLinksProperty] = name.split('.');
			setFormData({
				...formData,
				socialLinks: {
					...formData.socialLinks,
					[socialLinksProperty]: value,
				},
			});
			return;
		}

		if (name.includes('documents')) {
			const [, documentsProperty] = name.split('.');
			setFormData({
				...formData,
				documents: {
					...formData.documents,
					[documentsProperty]: value,
				},
			});
			return;
		}

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleFileChange = (name, fileUrl) => {
		if (name.includes('documents')) {
			const [, documentsProperty] = name.split('.');
			setFormData({
				...formData,
				documents: {
					...formData.documents,
					[documentsProperty]: fileUrl,
				},
			});
		}
	};

	const handleProfilePictureChange = (name, url) => {
		setFormData({
			...formData,
			profilePicture: url,
		});
	};

	const handleCoverPhotoChange = (name, url) => {
		setFormData({
			...formData,
			coverPhoto: url,
		});
	};

	// Submit Handler
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await createUser(formData).unwrap();
		} catch (error) {
			console.error('Failed to create user:', error);
		}
	};

	// Styling
	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			autoComplete="off"
			sx={{
				backgroundColor: '#f9f9f9',
				padding: 3,
				borderRadius: 2,
				boxShadow: 3,
			}}
		>
			<Typography
				variant="h5"
				sx={{ fontWeight: 'bold', mb: 3 }}
				align="center"
			>
				Create New User
			</Typography>

			{/* Profile and Cover Photo Upload */}
			<ProfileCoverUpload
				formData={formData}
				handleProfilePictureChange={handleProfilePictureChange}
				handleCoverPhotoChange={handleCoverPhotoChange}
			/>

			{/* Personal Information Section */}
			<Box sx={{ my: 4 }}>
				<PersonalInformation formData={formData} handleChange={handleChange} />
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Employment Details */}
			<Box sx={{ my: 4 }}>
				<EmploymentDetails
					formData={formData}
					handleChange={handleChange}
					handleDepartmentChange={e =>
						setFormData({ ...formData, departmentId: e.target.value as string })
					}
					handleRoleChange={e =>
						setFormData({ ...formData, roleId: e.target.value as string })
					}
				/>
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Login Credentials */}
			<Box sx={{ my: 4 }}>
				<LoginCredentials formData={formData} handleChange={handleChange} />
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Emergency Contact Information */}
			<Box sx={{ my: 4 }}>
				<EmergencyContactInfo formData={formData} handleChange={handleChange} />
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Documents Section */}
			<Box sx={{ my: 4 }}>
				<DocumentsSection
					formData={formData}
					handleFileChange={handleFileChange}
				/>
			</Box>

			<Divider sx={{ my: 2 }} />

			{/* Social Links */}
			<Box sx={{ my: 4 }}>
				<SocialLinks formData={formData} handleChange={handleChange} />
			</Box>

			{/* Submit Button */}
			<Button
				type="submit"
				variant="contained"
				color="primary"
				fullWidth
				disabled={isLoading}
				sx={{ mt: 3, py: 1.5 }}
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
