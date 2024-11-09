import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useCancelMeetingMutation } from '../../../features/meeting/meetinApi';

interface CancelModalProps {
	isOpen: boolean;
	onClose: () => void;
	meetingId: string;
}

const CancelModal: React.FC<CancelModalProps> = ({
	isOpen,
	onClose,
	meetingId,
}) => {
	const [commentText, setCommentText] = useState('');
	const [reminderTime, setReminderTime] = useState<Date | null>(null);
	const [cancelMeeting, { isLoading }] = useCancelMeetingMutation();

	const handleSubmit = async () => {
		if (reminderTime) {
			try {
				await cancelMeeting({
					id: meetingId,
					comment: {
						commentText,
						images: [], // You can add image upload handling if needed
					},
					reminderTime: reminderTime.toISOString(),
				}).unwrap();
				setCommentText('');
				setReminderTime(null);
				onClose();
			} catch (error) {
				console.error('Error canceling the meeting:', error);
			}
		}
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			className="flex items-center justify-center"
		>
			<Box
				sx={{
					padding: 4,
					backgroundColor: 'white',
					borderRadius: 2,
					boxShadow: 24,
					maxWidth: 600,
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					gap: 3,
				}}
			>
				<Typography variant="h6">Cancel Meeting</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label="Reminder"
						value={reminderTime}
						onChange={newValue => setReminderTime(newValue)}
						renderInput={params => <TextField {...params} fullWidth />}
					/>
				</LocalizationProvider>
				<TextField
					label="Comment"
					value={commentText}
					onChange={e => setCommentText(e.target.value)}
					fullWidth
					multiline
					rows={3}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button variant="outlined" onClick={onClose} disabled={isLoading}>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						disabled={isLoading || !reminderTime}
					>
						Submit
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default CancelModal;
