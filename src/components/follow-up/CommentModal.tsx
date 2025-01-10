import React, { useState } from 'react';
import {
	Box,
	Button,
	Modal,
	Typography,
	TextField,
	Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface CommentModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (comment: string, nextReminderTime?: Dayjs | null) => void;
	showNextReminderField: boolean; // Prop to control the visibility of the next reminder field
}

const CommentModal: React.FC<CommentModalProps> = ({
	open,
	onClose,
	onSubmit,
	showNextReminderField,
}) => {
	const [comment, setComment] = useState('');
	const [nextReminderTime, setNextReminderTime] = useState<Dayjs | null>(null);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'error' | 'success';
	} | null>(null);

	const handleSubmit = () => {
		if (!comment.trim()) {
			setAlert({ message: 'Comment cannot be empty', severity: 'error' });
			return;
		}

		// Submit the comment and optionally the next reminder time
		onSubmit(comment, nextReminderTime);
		onClose();

		// clear the comment and next reminder time
		setComment('');
		setNextReminderTime(null);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Modal open={open} onClose={onClose}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
						borderRadius: 3,
						minWidth: 350,
						border: '1px solid #ccc',
						textAlign: 'center',
					}}
				>
					<Typography
						variant="h6"
						sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}
					>
						Add Comment
					</Typography>

					{alert && (
						<Alert
							severity={alert.severity}
							onClose={() => setAlert(null)}
							sx={{ mb: 2 }}
						>
							{alert.message}
						</Alert>
					)}

					<TextField
						label="Comment"
						multiline
						rows={4}
						fullWidth
						value={comment}
						onChange={e => setComment(e.target.value)}
						sx={{ mb: 3 }}
					/>

					{/* Conditionally render the next reminder field */}
					{showNextReminderField && (
						<div className="w-full">
							<DateTimePicker
								label="Schedule Next Follow-Up"
								value={nextReminderTime}
								onChange={newValue => setNextReminderTime(newValue)}
								sx={{ mb: 3 }}
							/>
						</div>
					)}

					<Button
						variant="contained"
						onClick={handleSubmit}
						sx={{
							backgroundColor: 'primary.main',
							'&:hover': { backgroundColor: 'primary.dark' },
						}}
					>
						Submit
					</Button>
				</Box>
			</Modal>
		</LocalizationProvider>
	);
};

export default CommentModal;
