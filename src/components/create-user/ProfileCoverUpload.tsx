import React from 'react';
import { Box } from '@mui/material';
import CoverPhotoUpload from '../UI/inputs/CoverPhotoUpload';
import ProfilePictureUpload from '../UI/inputs/ProfilePictureUpload';

interface ProfileCoverUploadProps {
	formData: {
		profilePicture: string;
		coverPhoto: string;
	};
	handleProfilePictureChange: (name: string, url: string) => void;
	handleCoverPhotoChange: (name: string, url: string) => void;
}

const ProfileCoverUpload: React.FC<ProfileCoverUploadProps> = ({
	formData,
	handleProfilePictureChange,
	handleCoverPhotoChange,
}) => {
	return (
		<Box sx={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
			{/* Cover Photo Section */}
			<Box
				sx={{
					position: 'relative',
					height: '200px',
					backgroundImage: `url(${formData.coverPhoto})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					borderRadius: '8px',
				}}
			>
				<CoverPhotoUpload
					label="Cover Photo"
					name="coverPhoto"
					value={formData.coverPhoto}
					onChange={handleCoverPhotoChange}
				/>
			</Box>

			{/* Profile Picture Upload */}
			<Box
				sx={{
					width: 100,
					height: 100,
					mt: '-70px',
                    mb: '26px',
                    ml: '14px',
				}}
			>
				<ProfilePictureUpload
					label="Profile Picture"
					name="profilePicture"
					value={formData.profilePicture}
					onChange={handleProfilePictureChange}
				/>
			</Box>
		</Box>
	);
};

export default ProfileCoverUpload;
