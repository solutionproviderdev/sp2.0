import { useEffect, useState } from 'react';
import {
	Grid,
	Typography,
	Box,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CongratulationsModal from '../components/follow-up/CongratulationsModal';
import {
	useAddCommentMutation,
	useGetConversationMessagesQuery,
	useGetSingleLeadQuery,
	useSentMessageMutation,
	useUpdateReminderMutation,
	useUpdateReminderStatusMutation,
} from '../features/conversation/conversationApi';
import Chats from '../components/leadCenter/Inbox/chats';
import {
	AttachFileRounded as AttachFileIcon,
	EmojiEmotionsRounded as EmojiIcon,
	CameraAlt as CameraIcon,
	Send as SendIcon,
} from '@mui/icons-material';
import LeadDetails from '../components/leadCenter/LeadDetails';
import FollowUpButtons from '../components/follow-up/FollowUpButtons';
import AllComments from '../components/leadCenter/Sidebar/AllComments';
import CreStatus from '../components/leadCenter/creStatus/CreStatus';
import CommentModal from '../components/follow-up/CommentModal'; // Import the new modal
import { FaPhone } from 'react-icons/fa';
import { Dayjs } from 'dayjs';

interface FollowUpProps {
	leadIdList?: string[];
}

export default function FollowUp({ leadIdList }: FollowUpProps) {
	const { leadId: currentLeadId } = useParams();
	const navigate = useNavigate();
	const [showCongratsModal, setShowCongratsModal] = useState(false);
	const [showCommentModal, setShowCommentModal] = useState(false); // State for comment modal
	const [newMessage, setNewMessage] = useState('');
	const { data: lead } = useGetSingleLeadQuery(currentLeadId ?? '');
	const { data } = useGetConversationMessagesQuery(currentLeadId ?? '', {
		skip: !currentLeadId,
	});
	const [sendMessage] = useSentMessageMutation();
	const [addComment] = useAddCommentMutation();
	const [updateReminder] = useUpdateReminderMutation();
	const [updateReminderStatus] = useUpdateReminderStatusMutation();
	const [newReminderAdded, setNewReminderAdded] = useState(false);

	const [initialReminderCount, setInitialReminderCount] = useState<
		number | null
	>(null);

	// Set the initial reminder count after the lead data is fetched
	useEffect(() => {
		if (lead?.reminder && initialReminderCount === null) {
			setInitialReminderCount(lead.reminder.length);
		}
	}, [lead?.reminder, initialReminderCount]);

	// Track if a new reminder has been added
	useEffect(() => {
		if (lead?.reminder && initialReminderCount !== null) {
			const currentReminderCount = lead.reminder.length;

			// If the reminder count has increased, a new reminder has been added
			if (currentReminderCount > initialReminderCount) {
				setNewReminderAdded(true);
			}
		}
	}, [lead?.reminder, initialReminderCount]);

	console.log(newReminderAdded);

	const messages = data?.messages || [];

	// Function to handle sending a message
	const handleSendMessage = async () => {
		if (newMessage.trim() && currentLeadId) {
			try {
				await sendMessage({
					id: currentLeadId,
					message: {
						messageType: 'text',
						content: { text: newMessage },
					},
				}).unwrap();
				setNewMessage('');
			} catch (err) {
				console.error('Failed to send message:', err);
			}
		}
	};

	// Function to handle adding a comment and updating the reminder status
	const handleCommentSubmit = async (
		comment: string,
		nextReminderTime?: Dayjs | null
	) => {
		if (!currentLeadId || !lead?.reminder || lead.reminder.length === 0) return;

		try {
			// Add the comment
			await addComment({
				id: currentLeadId,
				comment: { comment, images: [] },
			}).unwrap();

			// Update the last reminder status to "Complete" if new reminder is not added
			if (!newReminderAdded) {
				const lastReminder = lead.reminder[lead.reminder.length - 1];
				await updateReminderStatus({
					leadId: currentLeadId,
					reminderId: lastReminder._id,
					status: 'Complete',
				}).unwrap();
			}

			// If a next reminder time is provided, create a new reminder
			if (nextReminderTime) {
				await updateReminder({
					id: currentLeadId,
					time: nextReminderTime.toISOString(),
				}).unwrap();
			}

			// Move to the next lead
			handleNextLead();
		} catch (err) {
			console.error('Failed to add comment or update reminder status:', err);
		}
	};

	// Function to navigate to the next lead
	const handleNextLead = () => {
		if (!leadIdList || !currentLeadId) {
			return;
		}

		const currentLeadIndex = leadIdList.findIndex(id => id === currentLeadId);

		// If the current lead is the last one, show the congratulations modal
		if (currentLeadIndex === leadIdList.length - 1) {
			setShowCongratsModal(true);

			// Automatically close modal and navigate back after 2 seconds
			setTimeout(() => {
				setShowCongratsModal(false);
				navigate('/admin/lead-followUp');
			}, 2000);

			return;
		}

		// Navigate to the next lead
		const nextLeadId = leadIdList[currentLeadIndex + 1];
		navigate(`/admin/lead-followUp/${nextLeadId}`);
	};

	// Function to stop and move to the followup page
	const handleStop = () => {
		navigate('/admin/lead-followUp');
	};

	console.log(lead?.phone);

	return (
		<Grid container spacing={2} sx={{ height: '100%' }}>
			{/* Right Section (Inbox) */}
			<Grid item xs={6} sx={{ borderRight: '1px solid #ddd', padding: 2 }}>
				{/* Header */}
				<div className="flex flex-col h-full">
					<Box className="p-4 border-b flex justify-between">
						<Typography variant="h6">{lead?.name ?? 'No Name'}</Typography>

						<div className="flex gap-2">
							{/* Call Button if phone number is present? */}
							{lead?.phone && lead.phone.length > 0 && (
								<button
									className=" text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 border border-gray-400"
									onClick={() => {
										window.open(`tel:${lead?.phone}`, '_blank');
									}}
								>
									<FaPhone />
								</button>
							)}

							{lead?.status && <CreStatus currentStatus={lead?.status} />}
						</div>
					</Box>

					{/* Messages Section */}
					<Box className="flex-1 h-full overflow-y-auto min-h-[77vh] max-h-[77vh] scrollbar-none">
						{messages && messages.length > 0 && <Chats messages={messages} />}
					</Box>

					{/* Input Box */}
					<Box className="mb-2 pt-2 bg-white border-t flex items-center">
						<IconButton>
							<CameraIcon className="text-gray-800" />
						</IconButton>

						<IconButton>
							<EmojiIcon className="text-orange-400" />
						</IconButton>

						<IconButton>
							<AttachFileIcon className="text-gray-700" />
						</IconButton>

						<TextField
							label="Send message"
							size="small"
							fullWidth
							className="!mr-4"
							value={newMessage}
							onChange={e => setNewMessage(e.target.value)}
							sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											color="primary"
											aria-label="send message"
											onClick={handleSendMessage}
										>
											<SendIcon />
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Box>
				</div>
			</Grid>

			{/* Middle Section for Lead Details */}
			<Grid item xs={3} sx={{ borderRight: '1px solid #ddd', padding: 2 }}>
				<LeadDetails leadId={currentLeadId} lead={lead} />
			</Grid>

			{/* Last Section for Comments and Done/Stop Buttons */}
			<Grid item xs={3}>
				{/* Stop and Done Buttons */}
				<FollowUpButtons
					onStop={handleStop}
					onDone={() => setShowCommentModal(true)} // Show comment modal on "Done" click
				/>
				{/* Comments Section */}
				{lead?.comment && (
					<AllComments leadId={currentLeadId} comments={lead?.comment} />
				)}
			</Grid>

			{/* Congratulations Modal */}
			<CongratulationsModal open={showCongratsModal} />

			{/* Comment Modal */}
			<CommentModal
				open={showCommentModal}
				onClose={() => setShowCommentModal(false)}
				onSubmit={handleCommentSubmit}
				showNextReminderField={!newReminderAdded} // Pass whether to show the next reminder field
			/>
		</Grid>
	);
}
