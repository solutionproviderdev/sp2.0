import React, { useEffect, useState } from 'react';
import { Box, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import AddCommentModal from './statusModal/AddCommentModal';
import NumberModal from './statusModal/NumberModal';
import ReminderModal from './statusModal/ReminderModal';
import ProjectStatusModal from './statusModal/ProjectStatusModal';
import FixMeetingModal from './statusModal/MeetingFix';
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

const statusToModalType = {
	'Number Collected': 'number',
	'Message Rescheduled': 'reminder',
	'Call Reschedule': 'reminder',
	Ongoing: 'projectStatus',
	'Meeting Fixed': 'fixMeeting', // Added mapping for Meeting Fixed
};

const CreStatus: React.FC<CreStatusProps> = ({ currentStatus }) => {
	const [status, setStatus] = useState(currentStatus);
	const [isModalOpen, setModalOpen] = useState(false);
	const [modalType, setModalType] = useState<string | null>(null);
	const { leadId } = useParams<{ leadId: string }>(); // Assuming leadId is coming from URL params

	// RTK hooks for mutations
	const [updateLeads] = useUpdateLeadsMutation();
	const [addPhone] = useAddPhoneMutation();
	const [addComment] = useAddCommentMutation();
	const [updateReminder] = useUpdateReminderMutation();

	useEffect(() => {
		setStatus(currentStatus);
	}, [currentStatus]);

	// Handle status change
	const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const newStatus = event.target.value as keyof typeof statusToModalType;
		setStatus(newStatus);
		const mappedModalType = statusToModalType[newStatus] || 'comment';
		setModalType(mappedModalType);
		setModalOpen(true);
	};

	// Handle submit for all modals
	const handleSubmit = async (data: any) => {
		try {
			if (!leadId) return;

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
					await addComment({
						id: leadId,
						comment: { comment: data.comment, images: [] }, // Assuming no images for now
					});
					break;
				case 'reminder':
					await updateReminder({
						id: leadId,
						time: data.reminderDate,
						completeLastReminder: true,
					});

					await addComment({
						id: leadId,
						comment: { comment: data.comment, images: [] }, // Assuming no images for now
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
					await addComment({
						id: leadId,
						comment: { comment: data.comment, images: [] }, // Assuming no images for now
					});
					break;
				case 'fixMeeting': // Handle fixing a meeting
					// Call the fixMeeting mutation with the meeting data
					// Example: You can use a mutation here with fixMeeting hook
					break;
				default:
					break;
			}

			// Update the lead's general status after successful submission
			await updateLeads({
				id: leadId,
				data: {
					status: status as
						| 'Number Collected'
						| 'Call Reschedule'
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
					value={currentStatus}
					label="Status"
					onChange={handleStatusChange}
				>
					{[
						'New',
						'No Response',
						'Message Rescheduled',
						'Number Collected',
						'Call Reschedule',
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

			{/* Render the appropriate modal based on modal type */}
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

			{modalType === 'fixMeeting' && (
				<FixMeetingModal
					isOpen={isModalOpen}
					onClose={() => setModalOpen(false)}
					leadId={leadId}
				/>
			)}
		</Box>
	);
};

export default CreStatus;
