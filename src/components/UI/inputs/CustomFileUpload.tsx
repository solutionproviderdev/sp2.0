import React, { useState, useRef } from 'react';
import { Button, Grid, Typography, IconButton, Box } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import { useUploadFileMutation } from '../../../features/upload/upload'; // Assuming you have a useUploadFileMutation for handling file uploads

interface CustomFileUploadProps {
	label: string;
	name: string;
	value: string; // URL of the uploaded file
	onChange: (name: string, fileUrl: string) => void; // Pass the file URL to the parent
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
	label,
	name,
	value,
	onChange,
}) => {
	const [previewUrl, setPreviewUrl] = useState<string>(value || ''); // Preview for uploaded file URL
	const [uploadFile] = useUploadFileMutation(); // RTK mutation for file upload
	const fileInputRef = useRef<HTMLInputElement | null>(null); // To reference the file input element

	// Upload file to the backend when a new file is selected
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0] || null;
		if (file) {
			const formData = new FormData();
			formData.append('file', file); // 'file' corresponds to the field name used in the backend

			try {
				const response = await uploadFile(formData).unwrap();
				const fileUrl = response.fileUrl; // Assuming the backend responds with the file URL
				setPreviewUrl(fileUrl); // Set preview URL for the uploaded file
				onChange(name, fileUrl); // Pass the URL to the parent component
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	// Trigger file input when the button is clicked
	const handleFileClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click(); // Trigger file input click
		}
	};

	// Handle removing the file
	const handleRemoveFile = () => {
		setPreviewUrl(''); // Clear the preview
		onChange(name, ''); // Pass an empty string to the parent to clear the value
	};

	return (
		<Grid item xs={12} md={6}>
			<Typography variant="body2" gutterBottom>
				{label}
			</Typography>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					mb: 2,
					cursor: 'pointer', // Indicate clickable area
				}}
				onClick={handleFileClick} // Trigger file input on click
			>
				<Button
					variant="outlined"
					component="span"
					startIcon={<UploadFileIcon />}
					fullWidth
				>
					{previewUrl ? 'File Uploaded' : 'Choose File'}
				</Button>

				{/* Show file name if uploaded */}
				{previewUrl && (
					<Typography
						variant="body2"
						sx={{ ml: 2, wordWrap: 'break-word', maxWidth: '60%' }}
					>
						{previewUrl.split('/').pop()}
					</Typography>
				)}

				{/* Remove button */}
				{previewUrl && (
					<IconButton onClick={handleRemoveFile} size="small" color="error">
						<CloseIcon />
					</IconButton>
				)}
			</Box>

			{/* Hidden file input */}
			<input
				type="file"
				accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" // You can customize the file types accepted
				ref={fileInputRef} // Reference to the hidden file input
				style={{ display: 'none' }} // Hide the file input
				onChange={handleFileChange} // Handle the file change
			/>
		</Grid>
	);
};

export default CustomFileUpload;
