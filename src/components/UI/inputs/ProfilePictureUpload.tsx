import React, { useState, useEffect, useRef } from 'react';
import { Grid, Avatar, Typography, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { useUploadImageMutation } from '../../../features/upload/upload';

interface ProfilePictureUploadProps {
	label: string;
	name: string;
	value: string; // Now this will be a URL string, not a File
	onChange: (name: string, fileUrl: string) => void; // Pass the URL to the parent
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
	label,
	name,
	value,
	onChange,
}) => {
	const [previewUrl, setPreviewUrl] = useState<string>(value || ''); // Initialize with the URL from props
	const [uploadImage] = useUploadImageMutation(); // RTK mutation for image upload
	const fileInputRef = useRef<HTMLInputElement | null>(null); // To reference the file input element

	// Upload image to the backend when a new file is selected
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0] || null;
		if (file) {
			const formData = new FormData();
			formData.append('image', file);

			try {
				const response = await uploadImage(formData).unwrap();
				const fileUrl = response.fileUrl;
				setPreviewUrl(fileUrl); // Set the preview with the uploaded URL
				onChange(name, fileUrl); // Pass the uploaded URL to the parent component
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};

	// Trigger file input when avatar is clicked
	const handleAvatarClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Trigger the file input click
		}
	};

	// Handle removing the profile picture
	const handleRemovePicture = () => {
		setPreviewUrl(''); // Clear the preview
		onChange(name, ''); // Pass an empty string to the parent
	};

	return (
		<Grid item xs={12} md={6}>
			<div style={{ position: 'relative', display: 'inline-block' }}>
				<Avatar
					src={previewUrl || ''} // If previewUrl is empty, display nothing
					alt="Profile Picture"
					sx={{
						width: 120,
						height: 120,
						cursor: 'pointer',
						border: '4px solid white',
					}} // Add cursor pointer
					onClick={handleAvatarClick} // Trigger file input on click
				/>
				{/* Show cross button only if an image is selected */}
				{previewUrl && (
					<IconButton
						size="small"
						sx={{ position: 'absolute', top: -10, right: -10 }}
						onClick={handleRemovePicture}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				)}
			</div>

			{/* Hidden file input */}
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef} // Reference the file input element
				style={{ display: 'none' }} // Hide the file input
				onChange={handleFileChange} // Handle the file change here
			/>
		</Grid>
	);
};

export default ProfilePictureUpload;
