import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Box,
	Typography,
	Avatar,
	Chip,
	Switch,
	IconButton,
	Button,
	Tabs,
	Tab,
} from '@mui/material';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa'; // Icons for social media
import { useGetUserByIdQuery } from '../../features/auth/authAPI'; // Import your query hook
import DocumentsTab from '../../components/user/DocumentsTab';
import AccessRoleTab from '../../components/user/AccessRoleTab';
import EmploymentDetailsTab from '../../components/user/EmploymentDetailsTabEmploymentDetailsTab';
import ContactTab from '../../components/user/ContactTab';

const UserProfile: React.FC = () => {
	const { userId } = useParams<{ userId: string }>(); // Get the user ID from URL
	const { data: user, isLoading, error } = useGetUserByIdQuery(userId); // Fetch user by ID

	const [activeTab, setActiveTab] = useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	if (error || !user) {
		return <Typography>Error loading user data.</Typography>;
	}

	return (
		<Box p={3}>
			{/* Cover Photo */}
			<Box
				sx={{
					position: 'relative',
					height: '200px',
					backgroundImage: `url(${user.coverPhoto})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderRadius: '8px',
				}}
			>
				{/* Social Media Icons */}
				<Box sx={{ position: 'absolute', right: 16, top: 16 }}>
					<IconButton>
						<FaFacebook color="white" />
					</IconButton>
					<IconButton>
						<FaInstagram color="white" />
					</IconButton>
					<IconButton>
						<FaWhatsapp color="white" />
					</IconButton>
				</Box>

				{/* User Avatar */}
				<Avatar
					src={user.profilePicture}
					alt={user.nameAsPerNID}
					sx={{
						width: 100,
						height: 100,
						position: 'absolute',
						bottom: '-50px',
						left: '16px',
						border: '4px solid white',
					}}
				/>
			</Box>

			{/* User Information Section */}
			<Box mt={6} className="flex justify-between items-start">
				<Box>
					<Typography variant="h5" fontWeight="bold">
						{user.nameAsPerNID} ({user.nickname})
					</Typography>
					<Typography variant="body1" color="textSecondary">
						{`${user.role?.roleName} - ${user.department?.departmentName}`}
					</Typography>

					{/* Contact Info */}
					<Typography variant="body2" mt={1}>
						📞 {user.personalPhone}
					</Typography>
					<Typography variant="body2">
						📅 Joined on {new Date(user.joiningDate).toLocaleDateString()}
					</Typography>
					<Typography variant="body2">📍 {user.address}</Typography>
					<Typography variant="body2">✉️ {user.email}</Typography>
				</Box>

				{/* Status and Edit Section */}
				<Box className="flex flex-col items-end">
					<div className="flex items-center justify-between">
						<Switch checked={user.status === 'Active'} />
						<Button variant="outlined" sx={{ ml: 2 }}>
							Edit
						</Button>
					</div>
					{/* User Role Chip */}
					<Box mt={2} className="ml-auto">
						<Chip
							label={user.type === 'Admin' ? 'Admin' : 'Operator'}
							color={user.type === 'Admin' ? 'primary' : 'default'}
							variant="outlined"
						/>
					</Box>
				</Box>
			</Box>

			{/* Tab Section */}
			<Box mt={4}>
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					<Tab label="Contact" />
					<Tab label="Employee Details" />
					<Tab label="Access Role" />
					<Tab label="Documents" />
				</Tabs>

				{/* Tab Content */}
				{activeTab === 0 && <ContactTab user={user} />}
				{activeTab === 1 && <EmploymentDetailsTab user={user} />}
				{activeTab === 2 && <AccessRoleTab user={user} />}
				{activeTab === 3 && <DocumentsTab user={user} />}
			</Box>
		</Box>
	);
};

export default UserProfile;
