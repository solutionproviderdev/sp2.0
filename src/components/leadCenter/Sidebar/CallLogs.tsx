import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	Button,
	Modal,
	TextField,
	MenuItem,
	IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useAddCallLogsMutation } from '../../../features/conversation/conversationApi';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import moment from 'moment';

interface CallLog {
	recipientNumber: string;
	callDuration: number | string; // Allow string format as "MM:SS"
	timestamp: string;
	callType: string;
	status: string;
}

interface CallLogsProps {
	leadId: string | undefined;
	leadCallLogs: CallLog[];
}

const CallLogs: React.FC<CallLogsProps> = ({ leadId, leadCallLogs }) => {
	const [addCallLogs, { isLoading }] = useAddCallLogsMutation();
	const [callLogs, setCallLogs] = useState<CallLog[]>(leadCallLogs);
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const [phoneError, setPhoneError] = useState<boolean>(false);
	const [durationError, setDurationError] = useState<boolean>(false); // To track invalid duration input
	const [newCallLog, setNewCallLog] = useState<CallLog>({
		recipientNumber: '',
		callDuration: '0:00', // Default duration in MM:SS format
		timestamp: dayjs().toISOString(),
		callType: 'Outgoing',
		status: 'Received',
	});
	const [durationInput, setDurationInput] = useState<string>(''); // For MM:SS input

	useEffect(() => {
		setCallLogs(leadCallLogs);
	}, [leadCallLogs]);

	// Simple phone validation (accepts + followed by 10-14 digits)
	const validatePhoneNumber = () => {
		const phoneNumberRegex = /^\+?[0-9]{10,14}$/;
		return phoneNumberRegex.test(newCallLog.recipientNumber);
	};

	// Validate the duration input in MM:SS format
	const validateDuration = (duration: string) => {
		const durationRegex = /^([0-5]?[0-9]):([0-5][0-9])$/; // MM:SS format (0-59 for minutes and seconds)
		return durationRegex.test(duration);
	};

	// Updated handleSaveCallLog function
	const handleSaveCallLog = async () => {
		// Validate phone number and duration input
		if (!validatePhoneNumber()) {
			setPhoneError(true);
			return;
		}
		if (!validateDuration(durationInput)) {
			setDurationError(true);
			return;
		}

		// Clear error states if validations pass
		setPhoneError(false);
		setDurationError(false);

		// Set call duration as a string in MM:SS format and define other properties correctly
		const updatedCallLog: CallLog = {
			...newCallLog,
			callDuration: durationInput,
			timestamp: dayjs(newCallLog.timestamp).toISOString(), // Ensure timestamp is correctly formatted
			callType: newCallLog.callType as 'Incoming' | 'Outgoing',
			status: newCallLog.status as 'Missed' | 'Received',
		};

		console.log(updatedCallLog);

		try {
			// Add call log using mutation
			await addCallLogs({
				id: leadId,
				newCallLog: {
					...updatedCallLog,
					callType: updatedCallLog.callType as 'Incoming' | 'Outgoing',
					status: updatedCallLog.status as 'Missed' | 'Received',
				},
			}).unwrap();

			// Update local state with new call log
			setCallLogs(prevLogs => [...prevLogs, updatedCallLog]);

			// Close modal
			setModalOpen(false);

			// Reset the input fields
			setNewCallLog({
				recipientNumber: '',
				callDuration: '0:00',
				timestamp: dayjs().toISOString(),
				callType: 'Outgoing',
				status: 'Missed',
			});
		} catch (error) {
			console.error('Error adding call log:', error);
		}
	};
	const getCallIcon = (callType: string, status: string) => {
		if (status === 'Missed') {
			return callType === 'Outgoing' ? (
				<CallMissedOutgoingIcon sx={{ color: 'red' }} />
			) : (
				<CallMissedIcon sx={{ color: 'red' }} />
			);
		} else if (status === 'Received') {
			return callType === 'Outgoing' ? (
				<CallMadeIcon sx={{ color: 'green' }} />
			) : (
				<CallReceivedIcon sx={{ color: 'green' }} />
			);
		}
		return null; // In case no valid status is provided
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box className="flex flex-col my-2 space-y-2 p-2">
				<div className="flex items-center justify-between">
					<Typography variant="body1">☎️ Call Logs</Typography>
					<IconButton onClick={() => setModalOpen(true)}>
						<AddIcon />
					</IconButton>
				</div>

				<Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, gap: 2 }}>
					{callLogs?.map((log, index) => {
						const timeStamp = moment(log.timestamp);

						// Parse callDuration in MM:SS format
						const [minutes, seconds] = log.callDuration.split(':').map(Number);
						const duration = moment.duration({ minutes, seconds });

						// Create a readable format (e.g. "1 min 30 sec" or "2 min")
						const durationFormatted =
							duration.minutes() > 0
								? `${duration.minutes()} min ${
										duration.seconds() > 0 ? `${duration.seconds()} sec` : ''
								  }`
								: `${duration.seconds()} sec`;

						return (
							<Box
								key={index}
								sx={{
									gap: 2,
									p: 1,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography variant="body1">
									{getCallIcon(log.callType, log.status)}
								</Typography>

								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										width: '100%',
									}}
								>
									<div className="">
										<Typography
											variant="body2"
											sx={{ fontWeight: 'bold', color: '#0288d1' }}
										>
											{log.recipientNumber}
										</Typography>
										<Typography variant="body2">{durationFormatted}</Typography>
									</div>
									<Box sx={{ textAlign: 'right' }}>
										<Typography variant="body2">
											{timeStamp.format('DD-MMM, YYYY')}
										</Typography>
										<Typography variant="body2">
											{timeStamp.format('hh:mm A')}
										</Typography>
									</Box>
								</Box>
							</Box>
						);
					})}
				</Box>

				<Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							bgcolor: 'background.paper',
							boxShadow: 24,
							p: 4,
							borderRadius: 2,
							minWidth: 350,
							textAlign: 'center',
							border: '1px solid #ccc',
						}}
					>
						<Typography
							variant="h6"
							mb={2}
							sx={{ color: 'primary.main', fontWeight: 'bold' }}
						>
							Add Call Log
						</Typography>

						{/* Recipient Number Input with validation */}
						<TextField
							label="Recipient Number"
							value={newCallLog.recipientNumber}
							onChange={e => {
								setNewCallLog({
									...newCallLog,
									recipientNumber: e.target.value,
								});
								setPhoneError(false);
							}}
							fullWidth
							margin="normal"
							error={phoneError}
							helperText={
								phoneError
									? 'Please enter a valid phone number (e.g. +8801234567890)'
									: ''
							}
						/>

						{/* Call Type Input */}
						<TextField
							select
							label="Call Type"
							value={newCallLog.callType}
							onChange={e =>
								setNewCallLog({ ...newCallLog, callType: e.target.value })
							}
							fullWidth
							margin="normal"
						>
							<MenuItem value="Outgoing">Outgoing</MenuItem>
							<MenuItem value="Incoming">Incoming</MenuItem>
						</TextField>

						{/* Status Input */}
						<TextField
							select
							label="Status"
							value={newCallLog.status}
							onChange={e =>
								setNewCallLog({ ...newCallLog, status: e.target.value })
							}
							fullWidth
							margin="normal"
						>
							<MenuItem value="Received">Received</MenuItem>
							<MenuItem value="Missed">Missed</MenuItem>
						</TextField>

						{/* Call Duration Input (MM:SS) */}
						<TextField
							label="Call Duration (MM:SS)"
							value={durationInput}
							onChange={e => setDurationInput(e.target.value)}
							fullWidth
							margin="normal"
							error={durationError} // Show red border when input is invalid
							helperText={
								durationError
									? 'Please enter a valid duration in MM:SS format'
									: ''
							}
							placeholder="e.g. 2:30"
						/>

						{/* Timestamp Input */}
						<DateTimePicker
							label="Timestamp"
							value={dayjs(newCallLog.timestamp)}
							onChange={newValue =>
								setNewCallLog({
									...newCallLog,
									timestamp: newValue?.toISOString() || '',
								})
							}
							renderInput={params => (
								<TextField {...params} fullWidth margin="normal" />
							)}
						/>

						<Box mt={2} display="flex" justifyContent="space-between">
							<Button
								variant="contained"
								onClick={handleSaveCallLog}
								disabled={isLoading}
								sx={{
									backgroundColor: 'primary.main',
									'&:hover': { backgroundColor: 'primary.dark' },
								}}
							>
								{isLoading ? 'Saving...' : 'Save'}
							</Button>
							<Button variant="outlined" onClick={() => setModalOpen(false)}>
								Cancel
							</Button>
						</Box>
					</Box>
				</Modal>
			</Box>
		</LocalizationProvider>
	);
};
export default CallLogs;
