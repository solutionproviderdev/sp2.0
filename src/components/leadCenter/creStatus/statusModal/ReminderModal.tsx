import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface ReminderModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: { reminderDate: string; comment: string }) => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [reminderDate, setReminderDate] = useState<Date | null>(null);
	const [comment, setComment] = useState('');

    console.log(reminderDate)

	const handleSubmit = () => {
		if (reminderDate) {
			onSubmit({ reminderDate: reminderDate.toISOString(), comment });
			setReminderDate(null);
			setComment('');
			onClose();
		}
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
				<Typography variant="h6">Set Reminder</Typography>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateTimePicker
						label="Pick a Date & Time"
						value={reminderDate}
						onChange={newValue => setReminderDate(newValue)}
						renderInput={params => (
							<TextField {...params} fullWidth sx={{ mt: 2 }} />
						)}
					/>
				</LocalizationProvider>
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

export default ReminderModal;
