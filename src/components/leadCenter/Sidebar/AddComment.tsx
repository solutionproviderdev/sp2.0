import React, { useState } from 'react';
import {
	Box,
	TextField,
	IconButton,
	InputAdornment,
	Alert,
	Collapse,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/system';
import { useAddCommentMutation } from '../../../features/conversation/conversationApi';

interface AddCommentProps {
	leadId: string | undefined;
}

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const AddComment: React.FC<AddCommentProps> = ({ leadId }) => {
	const [addComment] = useAddCommentMutation();
	const [newComment, setNewComment] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [showFileIndicator, setShowFileIndicator] = useState(false);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'success' | 'error';
	} | null>(null);

	// Add new comment
	const commentHandler = async () => {
		if (newComment.trim() !== '' && leadId) {
			const newCommentObj = {
				comment: newComment,
				images: selectedFile ? [selectedFile.name] : [],
			};

			try {
				await addComment({ id: leadId, comment: newCommentObj }).unwrap();
				setNewComment(''); // Clear the input field
				setSelectedFile(null);
				setShowFileIndicator(false); // Hide file indicator after adding
				setAlert({
					message: 'Comment added successfully!',
					severity: 'success',
				});
			} catch (error) {
				console.error('Error adding comment:', error);
				setAlert({
					message: 'Failed to add comment. Please try again.',
					severity: 'error',
				});
			}
		}
	};

	// Handle file selection and deselection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(e.target.files ? e.target.files[0] : null);
		setShowFileIndicator(true);
	};

	const handleFileDeselect = () => {
		setSelectedFile(null);
		setShowFileIndicator(false);
	};

	return (
		<Box>
			<Collapse in={!!alert}>
				{alert && (
					<Alert
						severity={alert.severity}
						onClose={() => setAlert(null)}
						sx={{ mb: 1 }}
					>
						{alert.message}
					</Alert>
				)}
			</Collapse>
			<TextField
				label="Add a comment"
				size="small"
				fullWidth
				value={newComment}
				onChange={e => setNewComment(e.target.value)}
				sx={{ marginTop: 1, backgroundColor: '#fff', borderRadius: '5px' }}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								onClick={commentHandler}
								color="primary"
								aria-label="send comment"
							>
								<SendIcon />
							</IconButton>
						</InputAdornment>
					),
					startAdornment: (
						<InputAdornment position="start">
							<IconButton component="label">
								<VisuallyHiddenInput
									type="file"
									onChange={handleFileChange}
									multiple
								/>
								<AttachFileIcon
									className={
										selectedFile === null ? 'text-gray-500' : 'text-red-600'
									}
								/>
								{showFileIndicator && (
									<ClearIcon
										className="text-gray-800 ml-2"
										onClick={handleFileDeselect}
									/>
								)}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</Box>
	);
};

export default AddComment;
