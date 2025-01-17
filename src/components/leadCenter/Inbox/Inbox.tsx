import React, { useState, useEffect } from 'react';
import {
	TextField,
	IconButton,
	Box,
	Button,
	Typography,
	InputAdornment,
} from '@mui/material';
import {
	AttachFileRounded as AttachFileIcon,
	EmojiEmotionsRounded as EmojiIcon,
	CameraAlt as CameraIcon,
	Send as SendIcon,
} from '@mui/icons-material';
import { FaCircleInfo } from 'react-icons/fa6';
import Sidebar from '../Sidebar/Sidebar';
import NoMessagesImage from '../../../assets/nomessageimg.jpg';
import {
	useGetConversationMessagesQuery,
	useGetSingleLeadQuery,
	useSentMessageMutation,
} from '../../../features/conversation/conversationApi';
import { useParams } from 'react-router-dom';
import Chats from './chats';
import CreStatus from '../creStatus/CreStatus';

interface InboxProps {
	conversation?: {
		name: string;
	};
}

const Inbox: React.FC<InboxProps> = ({ conversation }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');

	const { leadId } = useParams(); // Use leadId from params
	const { data: lead } = useGetSingleLeadQuery(leadId ?? '');
	const { data } = useGetConversationMessagesQuery(leadId ?? '');
	const [sendMessage, { isLoading }] = useSentMessageMutation();

	useEffect(() => {
		if (data && data.messages) {
			setMessages(data.messages);
		}
	}, [data]);

	const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

	const handleSendMessage = async () => {
		if (newMessage.trim() && leadId) {
			// Use leadId here
			try {
				await sendMessage({
					id: leadId, // Replace conversation._id with leadId
					message: {
						messageType: 'text',
						content: { text: newMessage },
					},
				}).unwrap();
				setNewMessage(''); // Clear input field
			} catch (err) {
				console.error('Failed to send message:', err);
			}
		}
	};

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<Box className="p-4 border-b flex justify-between">
				<Typography variant="h6">{lead?.name}</Typography>

				<Box className="flex items-center gap-1">
					{lead?.status && <CreStatus currentStatus={lead?.status} />}

					<Button onClick={toggleSidebar} sx={{ ml: 1 }}>
						<FaCircleInfo className="h-6 w-6" />
					</Button>
				</Box>

				<Sidebar
					leadId={leadId}
					lead={lead}
					isOpen={isSidebarOpen}
					onClose={toggleSidebar}
				/>
			</Box>

			{/* Messages Section */}
			<Box className="flex-1 overflow-y-auto scrollbar-none">
				{messages.length > 0 ? (
					<Chats messages={messages} />
				) : (
					<Box className="flex justify-center items-center h-full">
						<img
							src={NoMessagesImage}
							alt="No messages here"
							className="max-w-full max-h-full object-contain"
						/>
					</Box>
				)}
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
					onKeyDown={e => {
						if (e.key === 'Enter') {
							handleSendMessage();
						}
					}}
					disabled={isLoading}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									color="primary"
									aria-label="send message"
									onClick={handleSendMessage}
									disabled={isLoading}
								>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Box>
		</div>
	);
};

export default Inbox;
