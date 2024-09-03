import React, { useState } from 'react';
import { Button, Box } from '@mui/material';

import Filter from './Filter';

import SearchInput from './SearchBar';
import ActionButtons from './ActionButtons';


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

const conversations: Conversation[] = [
	{
		id: 1,
		profile: 'https://picsum.photos/seed/user1/100',
		name: 'John Doe',
		lastMessage: 'Hey, how are you?',
		lastMessageTime: '5 minutes ago',
	},
	// More conversations...
];

const ConversationList: React.FC<ConversationListProps> = ({
	onSelectConversation,
}) => {
	const conversations = [
		{
			id: 1,
			profile: 'https://picsum.photos/seed/user1/100',
			name: 'John Doe',
			lastMessage: 'Hey, how are you?',
			lastMessageTime: '5 minutes ago',
			status: 'Unread', // Status can be: 'Unread', 'Read', 'Number Collected'
			cre: 'Wony', // CRE name can be: 'Wony', 'Mehu', 'Ritu'
			page: 'SP-1' // Page can be: 'SP-1', 'SP-2', 'SP-3'
		},
		{
			id: 2,
			profile: 'https://picsum.photos/seed/user2/100',
			name: 'Jane Smith',
			lastMessage: 'I will call you later.',
			lastMessageTime: '10 minutes ago',
			status: 'Read',
			cre: 'Mehu',
			page: 'SP-2'
		},
		{
			id: 3,
			profile: 'https://picsum.photos/seed/user3/100',
			name: 'Robert Johnson',
			lastMessage: "Don't forget the meeting tomorrow.",
			lastMessageTime: '15 minutes ago',
			status: 'Number Collected',
			cre: 'Ritu',
			page: 'SP-3'
		},
		{
			id: 4,
			profile: 'https://picsum.photos/seed/user4/100',
			name: 'Emily Davis',
			lastMessage: 'Can you send the documents?',
			lastMessageTime: '20 minutes ago',
			status: 'Unread',
			cre: 'Wony',
			page: 'SP-1'
		},
		{
			id: 5,
			profile: 'https://picsum.photos/seed/user5/100',
			name: 'Michael Brown',
			lastMessage: 'Great job on the project!',
			lastMessageTime: '30 minutes ago',
			status: 'Read',
			cre: 'Mehu',
			page: 'SP-2'
		},
		{
			id: 6,
			profile: 'https://picsum.photos/seed/user6/100',
			name: 'Sarah Wilson',
			lastMessage: "Let's catch up later.",
			lastMessageTime: '45 minutes ago',
			status: 'Number Collected',
			cre: 'Ritu',
			page: 'SP-3'
		},
		{
			id: 7,
			profile: 'https://picsum.photos/seed/user7/100',
			name: 'David Lee',
			lastMessage: "I'll be there in 5 minutes.",
			lastMessageTime: '1 hour ago',
			status: 'Unread',
			cre: 'Wony',
			page: 'SP-1'
		},
		{
			id: 8,
			profile: 'https://picsum.photos/seed/user8/100',
			name: 'Sophia Martinez',
			lastMessage: 'What time is the meeting?',
			lastMessageTime: '1.5 hours ago',
			status: 'Read',
			cre: 'Mehu',
			page: 'SP-2'
		},
		{
			id: 9,
			profile: 'https://picsum.photos/seed/user9/100',
			name: 'James Anderson',
			lastMessage: 'Looking forward to it!',
			lastMessageTime: '2 hours ago',
			status: 'Number Collected',
			cre: 'Ritu',
			page: 'SP-3'
		},
		{
			id: 10,
			profile: 'https://picsum.photos/seed/user10/100',
			name: 'Olivia Garcia',
			lastMessage: 'Can we reschedule?',
			lastMessageTime: '2.5 hours ago',
			status: 'Unread',
			cre: 'Wony',
			page: 'SP-1'
		},
	];
 	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [searchValue, setSearchValue] = useState('');

	const [filteredConversations, setFilteredConversations] = useState(conversations); // Set initial state to all conversations
	const [filter, setFilter] = useState('all'); // Track the current filter status

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (option: string) => {
		console.log(option); // Handle the specific action for each menu item
		handleClose();
	};


	// Function to handle the search value change from SearchInput component
	const handleSearchChange = (value) => {
		setSearchValue(value);
		console.log('Current search value:', value);
	};

	// Function to handle search button click from SearchInput component
	const handleSearchClick = (value) => {
		console.log('Search triggered for:', value);
	};


	// Function to handle "All" button click
	const handleAll = () => {
		setFilteredConversations(conversations); // Set all conversations
		setFilter('all'); // Update filter state to 'all'
	  };
	
	  // Function to handle "Unread" button click
	  const handleUnread = () => {
		const unreadConversations = conversations.filter(
		  (conversation) => conversation.status.toLowerCase() === 'unread'
		);
		setFilteredConversations(unreadConversations); // Set only unread conversations
		setFilter('unread'); // Update filter state to 'unread'
	  };
	
	  

	return (
		<div className="h-full flex flex-col">
			<div className="p-4">

				{/* YouTube-like Search Bar */}
				<SearchInput onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />


				<div className="flex items-center justify-between mt-2">
					<div className="flex gap-2">
						<Button variant="contained" onClick={handleUnread} className='!h-7'>All</Button>
						<Button variant="contained" onClick={handleUnread} className='!h-7'>Unread</Button>
					</div>
					<Filter />
				</div>

			</div>

			{/* Conversation List */}
			<Box
				sx={{
					overflowY: 'auto',
					maxHeight: '500px',
					mb: 8,
					'&::-webkit-scrollbar': { width: '4px' },
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#3b82f6',
						borderRadius: '8px',
					},
					'&::-webkit-scrollbar-track': { backgroundColor: '#e5e7eb' },
				}}
			>
				{filteredConversations.map((conversation) => (
					<div
						key={conversation.id}
						className="p-4 border-b cursor-pointer"
						onClick={() => onSelectConversation(conversation)}
					>
						<div className="flex items-center p-1">
							<img
								src={conversation.profile}
								alt="Profile"
								className="w-10 h-10 rounded-full"
							/>
							<div className="ml-4 flex-1">
								<div className="flex justify-between items-center">
									<div className="font-bold">{conversation.name}</div>
									<div className="flex items-center">
										<Button
											variant="contained"
											color="primary"
											size="small"
											sx={{ padding: '2px 8px', marginRight: '4px' }}
										>
											Wony
										</Button>
										<img
											src={conversation.profile}
											alt="Tiny Profile"
											className="w-6 h-6 rounded-full"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2">
									<div className="text-sm text-gray-600 flex-grow">
										{conversation.lastMessage}
									</div>
									<div className="text-xs text-gray-500 ml-2">
										{conversation.lastMessageTime}
									</div>
								</div>
							</div>
						</div>

						{/* action buttons */}
						<ActionButtons />

					</div>
				))}


			</Box>
		</div>
	);
};

export default ConversationList;
