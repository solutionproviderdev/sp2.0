import React, { useState, useRef } from 'react';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import { useUploadImageMutation } from '../../../features/upload/upload';

interface CoverPhotoUploadProps {
	label: string;
	name: string;
	value: string; // URL of the cover photo
	onChange: (name: string, fileUrl: string) => void; // Pass the URL to the parent
}

const CoverPhotoUpload: React.FC<CoverPhotoUploadProps> = ({
	label,
	name,
	value,
	onChange,
}) => {
	const [previewUrl, setPreviewUrl] = useState<string>(value || ''); // Initialize with the URL from props
	const [uploadImage] = useUploadImageMutation(); // RTK mutation for image upload
	const fileInputRef = useRef<HTMLInputElement | null>(null); // To reference the file input element

	// Upload cover photo to the backend when a new file is selected
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

	// Trigger file input when cover photo is clicked
	const handleCoverClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Trigger the file input click
		}
	};

	// Handle removing the cover photo
	const handleRemoveCover = () => {
		setPreviewUrl(''); // Clear the preview
		onChange(name, ''); // Pass an empty string to the parent
	};

	return (
		<Grid item xs={12}>

			<Box
				sx={{
					position: 'relative',
					width: '100%',
					height: 200, // Set the height for the cover photo
					backgroundColor: '#f0f0f0',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer', // Add cursor pointer for click interaction
					mb: 2,
				}}
				onClick={handleCoverClick} // Trigger file input on click
			>
				{previewUrl ? (
					<img
						src={previewUrl}
						alt="Cover Photo"
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
					/>
				) : (
					<PhotoCameraIcon fontSize="large" />
				)}

				{/* Show cross button only if a cover photo is selected */}
				{previewUrl && (
					<IconButton
						size="small"
						sx={{ position: 'absolute', top: 8, right: 8 }}
						onClick={handleRemoveCover}
					>
						<CloseIcon fontSize="small" />
					</IconButton>
				)}
			</Box>

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

export default CoverPhotoUpload;
