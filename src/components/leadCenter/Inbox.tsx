import React from 'react';

import { TextField, IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Chats from './chats';
import { Box } from '@mui/material';


interface Conversation {
	id: number;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	status?: string;
}

interface InboxProps {
	conversation: Conversation | null;
}

const Inbox: React.FC<InboxProps> = ({ conversation }) => {
	// if (!conversation) {
	// 	return <div className="p-4">Select a conversation</div>;
	// }

	// Dummy data to simulate fetched messages
	const dummyMessages = [
		{
			id: 1,
			sender: 'John Doe',
			text: 'Hey, how are you?',
			time: '5 minutes ago',
			sentByUser: false,
		},
		{
			id: 2,
			sender: 'You',
			text: 'I am good, thanks! How about you?',
			time: '4 minutes ago',
			sentByUser: true,
		},
		{
			id: 3,
			sender: 'John Doe',
			text: 'Doing well, just getting some work done.',
			time: '3 minutes ago',
			sentByUser: false,
		},
		{
			id: 4,
			sender: 'You',
			text: 'That’s great to hear!',
			time: '2 minutes ago',
			sentByUser: true,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
		{
			id: 5,
			sender: 'John Doe',
			text: 'That’s great to sdfsdf dfsdf sdhear!',
			time: '2 minutes ago',
			sentByUser: false,
		},
	];

	return (
		<div className="flex flex-col h-full">
			<div className="p-4 py-6 border-b  flex justify-between">
				<div className="font-bold">{conversation?.name}</div>

				<div className="text-sm text-gray-600">
					{/* Status: {conversation?.status} */}

					<select className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
						<option value="unread">Unread</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
						<option value="active">Active</option>
						<option value="Canceled">Canceled</option>
					</select>
				</div>

			</div>



			{/* hare will be the messages */}
			<Box
				sx={{
					overflowY: 'auto',
					maxHeight: '500px', // Set max height as needed
					mb: 0,
					'&::-webkit-scrollbar': {
						width: '4px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#3b82f6', // Blue color for the scrollbar thumb
						borderRadius: '8px',
					},
					'&::-webkit-scrollbar-track': {
						backgroundColor: '#e5e7eb', // Light gray for the scrollbar track
					},
				}}
			>

				<Chats messages={dummyMessages} />
			</Box>

			{/* hare is the input box */}
			<div className=" border-t mb-14 bg-gray-200">
				<div className="p-2 pb-4 bg-white border-t flex items-center">
					<IconButton className=" text-gray-500">
						<CameraAltIcon className="text-gray-800" />
					</IconButton>

					<IconButton  >
						<EmojiEmotionsRoundedIcon className="text-orange-400" />
					</IconButton>

					<IconButton  >
						<AttachFileRoundedIcon className="text-gray-700" />
					</IconButton>

					<TextField label="Outlined" className="w-full rounded" />

					<IconButton>
						<SendRoundedIcon className="text-blue-500" />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Inbox;
