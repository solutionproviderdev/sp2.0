
import React, { useState } from 'react';
import { Box, Button, Modal, IconButton, Typography, Card, CardContent, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useUpdateReminderMutation } from '../../../features/conversation/conversationApi';

interface RemindersProps {
	leadId: string;
	leadReminders: { time: string; status: string; _id: string }[]; // Adjusting leadReminders type
}

const Reminders: React.FC<RemindersProps> = ({ leadId, leadReminders,refetch }) => {
	const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);
	const [open, setOpen] = useState(false);

	// RTK mutation hook for updating reminders
	const [updateReminder] = useUpdateReminderMutation();

	const handleDateTimeChange = (newValue: Dayjs | null) => {
		setSelectedDateTime(newValue);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = async () => {
		if (selectedDateTime) {
			const formattedReminder = {
				time: selectedDateTime.toISOString(), // Correct ISO format for REST API
			};

			// Call the mutation with the leadId and formatted reminder
			try {
				const response = await updateReminder({
					id: leadId,
					reminders: formattedReminder,
				});
				console.log('Reminder component response', response);
			} catch (error) {
				console.error('Error updating reminder:', error);
			}
		}
		refetch()
		handleClose();
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box sx={{ my: 1 }}>
				<Box sx={{ textAlign: 'center' }}>
					{leadReminders.map((reminder) => {
						const reminderTime = dayjs(reminder.time); // Convert time to Dayjs object

						return (
							<div key={reminder._id} className='font-bold flex justify-between mb-2 p-2 px-4 rounded bg-orange-200 hover:bg-orange-300' >
								<div>⏰</div>
								<div>
									{reminderTime.format('YYYY-MM-DD hh:mm A')}
								</div>
								<div className='text-blue-600'>
									{reminder.status}
								</div>
							</div>
						);
					})}
				</Box>
				<Button
					variant="contained"
					onClick={handleOpen}
					sx={{
						mt: 1,
						width: "100%",
						backgroundColor: 'primary.main',
						'&:hover': { backgroundColor: 'primary.dark' },
					}}
				>
					Add New Reminder
				</Button>

				<Modal open={open} onClose={handleClose}>
					<Box
						sx={{
							position: 'absolute',
							top: '10%',
							left: '50%',
							transform: 'translate(-50%, 0)',
							bgcolor: 'background.paper',
							boxShadow: 24,
							p: 4,
							borderRadius: 3,
							minWidth: 350,
							border: '1px solid #ccc',
							textAlign: 'center',
						}}
					>
						<Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
							Select Date & Time
						</Typography>
						<DateTimePicker
							ampm={true}
							label="Pick a Date & Time"
							value={selectedDateTime}
							onChange={handleDateTimeChange}
							renderInput={(params) => <input {...params.inputProps} />}
						/>
						<Box sx={{ mt: 3, textAlign: 'center' }}>
							<Button
								variant="contained"
								onClick={handleSave}
								sx={{
									backgroundColor: 'primary.main',
									'&:hover': { backgroundColor: 'primary.dark' },
								}}
							>
								Save
							</Button>
						</Box>
					</Box>
				</Modal>
			</Box>
		</LocalizationProvider >
	);
};

export default Reminders;
