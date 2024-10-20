import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface NumberModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { phoneNumber: string; comment: string }) => void;
}

const NumberModal: React.FC<NumberModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [comment, setComment] = useState('');

	const handleSubmit = () => {
		onSubmit({ phoneNumber, comment });
		setPhoneNumber('');
		setComment('');
		onClose();
	};

	return (
		<Modal
			open={isOpen}
			className="flex flex-col items-center justify-center"
			onClose={onClose}
		>
			<Box
				sx={{
					padding: 4,
					backgroundColor: 'white',
					margin: 'auto',
				}}
			>
				<Typography variant="h6">Collect Phone Number</Typography>
				<TextField
					label="Phone Number"
					fullWidth
					value={phoneNumber}
					onChange={e => setPhoneNumber(e.target.value)}
					sx={{ mt: 2 }}
				/>
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

export default NumberModal;
