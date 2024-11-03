import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Modal,
	Typography,
} from '@mui/material';
import AddCommentModal from './statusModal/AddCommentModal';
import NumberModal from './statusModal/NumberModal';
import ReminderModal from './statusModal/ReminderModal';
import ProjectStatusModal from './statusModal/ProjectStatusModal';
import { useParams } from 'react-router-dom';
import {
	useAddCommentMutation,
	useAddPhoneMutation,
	useUpdateLeadsMutation,
	useUpdateReminderMutation,
} from '../../../features/conversation/conversationApi';

interface CreStatusProps {
	currentStatus: string;
}

const CreStatus: React.FC<CreStatusProps> = ({ currentStatus }) => {
	const [status, setStatus] = useState(currentStatus);
	const [isModalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState<string | null>(null);
	const { leadId } = useParams(); // Assuming leadId is coming from URL params

	// RTK hooks for mutations
	const [updateLeads] = useUpdateLeadsMutation();
	const [addPhone] = useAddPhoneMutation();
	const [addComment] = useAddCommentMutation();
	const [updateReminder] = useUpdateReminderMutation();

	useEffect(() => {
		setStatus(currentStatus);
	}, [currentStatus]);

	// Handle status change
	const handleStatusChange = event => {
		const newStatus = event.target.value;
		setStatus(newStatus);

		// Open corresponding modal based on status
		switch (newStatus) {
			case 'Number Collected':
				setModalType('number');
				break;
			case 'Message Rescheduled':
			case 'Call Rescheduled':
				setModalType('reminder');
				break;
			case 'Ongoing':
				setModalType('projectStatus');
				break;
			default:
				setModalType('comment');
				break;
		}

		setModalOpen(true);
	};

	// Handle submit for all modals
	const handleSubmit = async (data: any) => {
		try {
			if (leadId && status) {
				switch (modalType) {
					case 'comment':
						await addComment({
							id: leadId,
							comment: { comment: data.comment, images: [] }, // Assuming no images for now
						});
						break;
					case 'number':
						await addPhone({
							id: leadId,
							phoneNumber: data.phoneNumber,
						});
						break;
					case 'reminder':
						await updateReminder({
							id: leadId,
							time: data.reminderDate,
							commentId: undefined, // Add comment ID if needed
						});
						break;
					case 'projectStatus':
						await updateLeads({
							id: leadId,
							data: {
								status: 'Ongoing' as const,
								projectStatus: {
									status: data.projectStatus,
									subStatus: data.projectSubStatus,
								},
							},
						});
						break;
					default:
						break;
				}

				// After successful submission, update the lead's status
				await updateLeads({
					id: leadId,
					data: {
						status: status as
							| 'Number Collected'
							| 'Call Rescheduled'
							| 'Ongoing'
							| 'New'
							| 'No Response'
							| 'Message Rescheduled'
							| 'Need Support'
							| 'Follow Up'
							| 'Meeting Fixed'
							| 'Meeting Reschedule'
							| 'Cancel Meeting'
							| undefined,
					},
				});
			}

			setModalOpen(false);
			setModalType(null);
		} catch (error) {
			console.error('Error updating lead:', error);
		}
	};
	return (
		<Box>
			<FormControl>
				<InputLabel id="status-select-label">Status</InputLabel>
				<Select
					className="w-44 h-10"
					labelId="status-select-label"
					id="status-select"
					value={status}
					label="Status"
					onChange={handleStatusChange}
				>
					{[
						'New',
						'No Response',
						'Message Rescheduled',
						'Number Collected',
						'Call Rescheduled',
						'Ongoing',
						'Close',
						'Meeting Fixed',
						'Need Support',
					].map(statusOption => (
						<MenuItem key={statusOption} value={statusOption}>
							{statusOption}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{/* Modal for comments, phone number, reminder, and project status */}
			{modalType === 'comment' && (
				<AddCommentModal
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
					onSubmit={handleSubmit}
					status={status}
				/>
			)}

			{modalType === 'number' && (
				<NumberModal
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
					onSubmit={handleSubmit}
				/>
			)}

			{modalType === 'reminder' && (
				<ReminderModal
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
					onSubmit={handleSubmit}
				/>
			)}

			{modalType === 'projectStatus' && (
				<ProjectStatusModal
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
					onSubmit={handleSubmit}
				/>
			)}
		</Box>
	);
};

export default CreStatus;
