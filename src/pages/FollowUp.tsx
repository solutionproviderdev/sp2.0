import {
	Grid,
	Typography,
	Box,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import CongratulationsModal from '../components/follow-up/CongratulationsModal';
import {
	useGetConversationMessagesQuery,
	useGetSingleLeadQuery,
	useSentMessageMutation,
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

interface FollowUpProps {
	leadIdList?: string[];
}

export default function FollowUp({ leadIdList }: FollowUpProps) {
	const { leadId: currentLeadId } = useParams();
	const navigate = useNavigate();
	const [showCongratsModal, setShowCongratsModal] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const { data: lead } = useGetSingleLeadQuery(currentLeadId ?? '');
	const { data } = useGetConversationMessagesQuery(currentLeadId ?? '', {
		skip: !currentLeadId,
	});
	const [sendMessage] = useSentMessageMutation();

	const messages = data?.messages || [];

	console.log(lead?.comment);

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

	// function to stop and move to the followup page
	const handleStop = () => {
		navigate('/admin/lead-followUp');
	};

	return (
		<Grid container spacing={2} sx={{ height: '100%' }}>
			{/* Right Section (Inbox) */}
			<Grid item xs={6} sx={{ borderRight: '1px solid #ddd', padding: 2 }}>
				{/* Header */}
				<div className="flex flex-col h-full">
					<Box className="p-4 border-b flex justify-between">
						<Typography variant="h6">{lead?.name ?? 'No Name'}</Typography>

						<Box className="flex items-center gap-1">Status</Box>
					</Box>

					{/* Messages Section */}
					<Box className="flex-1 h-full overflow-y-auto max-h-[78vh] scrollbar-none">
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

			{/* middle Section for lead Details */}
			<Grid item xs={3} sx={{ borderRight: '1px solid #ddd', padding: 2 }}>
				<LeadDetails leadId={currentLeadId} lead={lead} />
			</Grid>

			{/* last section for comments and done and stop buttons */}
			<Grid item xs={3}>
				{/* Stop and done buttons */}
				<FollowUpButtons onStop={handleStop} onDone={handleNextLead} />
				{/* Comments Section */}
				{lead?.comment && (
					<AllComments leadId={currentLeadId} comments={lead?.comment} />
				)}
			</Grid>

			{/* Congratulations Modal */}
			<CongratulationsModal open={showCongratsModal} />
		</Grid>
	);
}
