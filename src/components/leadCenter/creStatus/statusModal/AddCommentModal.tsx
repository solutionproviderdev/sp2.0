import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface AddCommentModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { comment: string }) => void;
	status: string;
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	status,
}) => {
	const [comment, setComment] = useState('');

	const handleSubmit = () => {
		onSubmit({ comment });
		setComment('');
		onClose();
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			className="flex flex-col items-center justify-center"
		>
			<Box
				className="bg-white p-4 rounded-lg shadow-md w-auto max-w-md"
			>
				<Typography variant="h6">Update Status to {status}</Typography>
				<TextField
					label="Comment"
					fullWidth
					multiline
					rows={3}
					value={comment}
					onChange={e => setComment(e.target.value)}
					sx={{ mt: 2 }}
				/>
				<Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
					Submit
				</Button>
			</Box>
		</Modal>
	);
};

export default AddCommentModal;
