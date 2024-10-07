import React, { useState } from 'react';
import {
	Box,
	Button,
	Modal,
	IconButton,
	Typography,
	Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import { useUpdateReminderMutation } from '../../../features/conversation/conversationApi';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorIcon from '@mui/icons-material/Error';
import { Dayjs } from 'dayjs';

interface RemindersProps {
	leadId: string | undefined;
	leadReminders: { time: string; status: string; _id: string }[];
}

interface ReminderResponse {
	status: 'success' | 'error';
	reminders: { time: string; status: string; _id: string }[];
}

interface ErrorResponse {
	status: number;
	data: {
		msg: string;
	};
}

const Reminders: React.FC<RemindersProps> = ({ leadId, leadReminders }) => {
	const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);
	const [open, setOpen] = useState(false);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'error' | 'success';
	} | null>(null);

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
		setAlert(null); // Clear the alert when closing the modal
	};

	const handleSave = async () => {
		if (selectedDateTime) {
			// Check if leadId and selectedDateTime are defined
			if (!leadId || !selectedDateTime) {
				return;
			}

			try {
				const response: ReminderResponse = await updateReminder({
					id: leadId,
					time: selectedDateTime.toISOString(),
				}).unwrap();

				if (response.status === 'success') {
					setAlert({
						message: 'Reminder added successfully',
						severity: 'success',
					});
					handleClose();
				}
			} catch (error) {
				const err = error as ErrorResponse;

				setAlert({
					message: err.data.msg,
					severity: 'error',
				});
			}
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Complete':
				return <CheckCircleIcon sx={{ color: 'green' }} />;
			case 'Pending':
				return <PendingActionsIcon sx={{ color: 'orange' }} />;
			case 'Missed':
				return <CancelIcon sx={{ color: 'red' }} />;
			case 'Late Complete':
				return <ErrorIcon sx={{ color: 'blue' }} />;
			default:
				return null;
		}
	};

	const getColor = (status: string) => {
		switch (status) {
			case 'Complete':
				return 'green';
			case 'Pending':
				return 'orange';
			case 'Missed':
				return 'red';
			case 'Late Complete':
				return 'blue';
			default:
				return 'black';
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box className="flex flex-col my-2 p-2">
				<div className="flex items-center justify-between">
					<Typography variant="body1">⏰ Reminders</Typography>
					<IconButton onClick={handleOpen}>
						<AddIcon />
					</IconButton>
				</div>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{leadReminders?.map(reminder => {
						const reminderTime = moment(reminder.time);
						return (
							<Box
								key={reminder._id}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									{getStatusIcon(reminder.status)}
									<Typography
										variant="body2"
										sx={{
											fontWeight: 'bold',
											color: getColor(reminder.status),
										}}
									>
										{reminder.status}
									</Typography>
								</Box>
								<Box sx={{ textAlign: 'right' }}>
									<Typography variant="body2">
										{reminderTime.format('DD-MMM, YYYY')}
									</Typography>
									<Typography variant="body2">
										{reminderTime.format('hh:mm A')}
									</Typography>
								</Box>
							</Box>
						);
					})}
				</Box>

				<Modal open={open} onClose={handleClose}>
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
							Select Date & Time
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

						<DateTimePicker
							label="Pick a Date & Time"
							value={selectedDateTime}
							onChange={handleDateTimeChange}
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
		</LocalizationProvider>
	);
};
export default Reminders;
