import React, { useState } from 'react';
import {
	Box,
	Modal,
	TextField,
	Button,
	Typography,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CommentModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
	open,
	onClose,
	onSubmit,
}) => {
	const [comment, setComment] = useState('');

	const handleSubmit = () => {
		onSubmit(comment);
		setComment('');
		onClose();
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: 2,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 2,
					}}
				>
					<Typography variant="h6">Add a Comment</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<TextField
					fullWidth
					multiline
					rows={4}
					placeholder="Enter your comment..."
					value={comment}
					onChange={e => setComment(e.target.value)}
					sx={{ mb: 2 }}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleSubmit}
				>
					Submit
				</Button>
			</Box>
		</Modal>
	);
};

export default CommentModal;
