import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';

interface Conversation {
	id: number;
	profile: string;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
}

interface ConversationListProps {
	onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
	onSelectConversation,
}) => {
	const [filter, setFilter] = useState('all');

	const conversations: Conversation[] = [
		{
			id: 1,
			profile: 'https://picsum.photos/seed/user1/100',
			name: 'John Doe',
			lastMessage: 'Hey, how are you?',
			lastMessageTime: '5 minutes ago',
		},
		{
			id: 1,
			profile: 'https://picsum.photos/seed/user1/100',
			name: 'John Doe',
			lastMessage: 'Hey, how are you?',
			lastMessageTime: '5 minutes ago',
		},
		{
			id: 1,
			profile: 'https://picsum.photos/seed/user1/100',
			name: 'John Doe',
			lastMessage: 'Hey, how are you?',
			lastMessageTime: '5 minutes ago',
		},
		{
			id: 2,
			profile: 'https://picsum.photos/seed/user2/100',
			name: 'Jane Smith',
			lastMessage: 'I will call you later.',
			lastMessageTime: '10 minutes ago',
		},
		{
			id: 3,
			profile: 'https://picsum.photos/seed/user3/100',
			name: 'Robert Johnson',
			lastMessage: "Don't forget the meeting tomorrow.",
			lastMessageTime: '15 minutes ago',
		},
		{
			id: 4,
			profile: 'https://picsum.photos/seed/user4/100',
			name: 'Emily Davis',
			lastMessage: 'Can you send the documents?',
			lastMessageTime: '20 minutes ago',
		},
		{
			id: 5,
			profile: 'https://picsum.photos/seed/user5/100',
			name: 'Michael Brown',
			lastMessage: 'Great job on the project!',
			lastMessageTime: '30 minutes ago',
		},
		{
			id: 6,
			profile: 'https://picsum.photos/seed/user6/100',
			name: 'Sarah Wilson',
			lastMessage: "Let's catch up later.",
			lastMessageTime: '45 minutes ago',
		},
		{
			id: 7,
			profile: 'https://picsum.photos/seed/user7/100',
			name: 'David Lee',
			lastMessage: "I'll be there in 5 minutes.",
			lastMessageTime: '1 hour ago',
		},
		{
			id: 8,
			profile: 'https://picsum.photos/seed/user8/100',
			name: 'Sophia Martinez',
			lastMessage: 'What time is the meeting?',
			lastMessageTime: '1.5 hours ago',
		},
		{
			id: 9,
			profile: 'https://picsum.photos/seed/user9/100',
			name: 'James Anderson',
			lastMessage: 'Looking forward to it!',
			lastMessageTime: '2 hours ago',
		},
		{
			id: 10,
			profile: 'https://picsum.photos/seed/user10/100',
			name: 'Olivia Garcia',
			lastMessage: 'Can we reschedule?',
			lastMessageTime: '2.5 hours ago',
		},
	];

	return (
		<div className="h-full flex flex-col">
			<div className="p-4">
				<div>
					<TextField label="Outlined" className="w-full rounded" />
				</div>

				<div className="flex items-center justify-between">
					<div className="flex gap-2 mt-2">
						<Button variant="contained">All</Button>
						<Button variant="contained">Unread</Button>
					</div>

					<Button>
						<FilterListRoundedIcon />
					</Button>
				</div>
			</div>

			{/* Make the conversation list scrollable */}
			<div className="overflow-y-auto flex-1 mb-16">
				{conversations.map(conversation => (
					<div key={conversation.id}>
						<div
							className="p-4 flex items-center border-b cursor-pointer"
							onClick={() => onSelectConversation(conversation)}
						>
							<img
								src={conversation.profile}
								alt="Profile"
								className="w-10 h-10 rounded-full"
							/>
							<div className="ml-4">
								<div className="font-bold">{conversation.name}</div>
								<div className="text-sm text-gray-600">
									{conversation.lastMessage}
								</div>
							</div>
							<div className="ml-auto text-sm text-gray-600">
								{conversation.lastMessageTime}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ConversationList;
