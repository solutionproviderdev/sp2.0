import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	Modal,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface Conversation {
	id: string;
}

interface RemindersProps {
	conversation: Conversation | null;
}

const Reminders: React.FC<RemindersProps> = ({ conversation }) => {
	const style = {
		borderRadius: '10px',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
	};

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box sx={{ marginTop: 1 }}>
			<div>
				<div className="flex justify-center">
					<Button onClick={handleOpen} className="w-full">
						Open modal
					</Button>
				</div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Choose Date & Time for Reminder
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DateTimePicker']}>
									<DateTimePicker label="Basic date time picker" />
								</DemoContainer>
							</LocalizationProvider>
						</Typography>
					</Box>
				</Modal>
			</div>
		</Box>
	);
};

export default Reminders;
