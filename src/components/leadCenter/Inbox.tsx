import React from 'react';

import { TextField, IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Chats from './chats';

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

					<select className="border p-2 rounded ">
						<option value="In Progress">unread</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
						<option value="On Hold">active</option>
						<option value="Canceled">Canceled</option>
					</select>
				</div>
			</div>

			{/* hare will be the messages */}

			<div className="flex-1 p-4 overflow-y-auto">
				<Chats messages={dummyMessages} />
			</div>

			{/* hare is the input box */}
			<div className=" border-t mb-14 bg-gray-200">
				<div className="   p-4 bg-white border-t flex items-center">
					<IconButton className="mr-2 text-gray-500">
						<CameraAltIcon className="text-gray-800" />
					</IconButton>

					<IconButton className="mr-2 ">
						<EmojiEmotionsRoundedIcon className="text-orange-400" />
					</IconButton>

					<IconButton className="mr-2 ">
						<AttachFileRoundedIcon className="text-gray-700" />
					</IconButton>

					<TextField label="Outlined" className="w-full rounded" />

					<IconButton className="ml-2">
						<SendRoundedIcon className="text-blue-500" />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Inbox;
