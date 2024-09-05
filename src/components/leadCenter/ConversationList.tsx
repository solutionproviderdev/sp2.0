// import React, { useState } from 'react';
// import { Button, Box, Typography } from '@mui/material';

// import Filter from './Filter';
// import SearchInput from './SearchBar';
// import ActionButtons from './ActionButtons';

// interface Conversation {
// 	id: number;
// 	profile: string;
// 	name: string;
// 	lastMessage: string;
// 	lastMessageTime: string;
// 	status: string;
// 	cre: string;
// 	page: string;
// }

// interface ConversationListProps {
// 	onSelectConversation: (conversation: Conversation) => void;
// }

// const ConversationList: React.FC<ConversationListProps> = ({ onSelectConversation }) => {
	// const conversations = [
	// 	{
	// 		id: 1,
	// 		profile: 'https://picsum.photos/seed/user1/100',
	// 		name: 'John Doe',
	// 		lastMessage: 'Hey, how are you?',
	// 		lastMessageTime: '5 minutes ago',
	// 		status: 'Unread',
	// 		cre: 'Wony',
	// 		page: 'SP-1'
	// 	},
	// 	{
	// 		id: 2,
	// 		profile: 'https://picsum.photos/seed/user2/100',
	// 		name: 'Jane Smith',
	// 		lastMessage: 'I will call you later.',
	// 		lastMessageTime: '10 minutes ago',
	// 		status: 'Read',
	// 		cre: 'Mehu',
	// 		page: 'SP-2'
	// 	},
	// 	{
	// 		id: 3,
	// 		profile: 'https://picsum.photos/seed/user3/100',
	// 		name: 'Robert Johnson',
	// 		lastMessage: "Don't forget the meeting tomorrow.",
	// 		lastMessageTime: '15 minutes ago',
	// 		status: 'Active',
	// 		cre: 'Ritu',
	// 		page: 'SP-3'
	// 	},
	// 	{
	// 		id: 4,
	// 		profile: 'https://picsum.photos/seed/user4/100',
	// 		name: 'Emily Davis',
	// 		lastMessage: 'Can you send the documents?',
	// 		lastMessageTime: '20 minutes ago',
	// 		status: 'Unread',
	// 		cre: 'Wony',
	// 		page: 'SP-1'
	// 	},
	// 	{
	// 		id: 5,
	// 		profile: 'https://picsum.photos/seed/user5/100',
	// 		name: 'Michael Brown',
	// 		lastMessage: 'Great job on the project!',
	// 		lastMessageTime: '30 minutes ago',
	// 		status: 'Read',
	// 		cre: 'Mehu',
	// 		page: 'SP-2'
	// 	},
	// 	{
	// 		id: 6,
	// 		profile: 'https://picsum.photos/seed/user6/100',
	// 		name: 'Sarah Wilson',
	// 		lastMessage: "Let's catch up later.",
	// 		lastMessageTime: '45 minutes ago',
	// 		status: 'Number Collected',
	// 		cre: 'Ritu',
	// 		page: 'SP-3'
	// 	},
	// 	{
	// 		id: 7,
	// 		profile: 'https://picsum.photos/seed/user7/100',
	// 		name: 'David Lee',
	// 		lastMessage: "I'll be there in 5 minutes.",
	// 		lastMessageTime: '1 hour ago',
	// 		status: 'Unread',
	// 		cre: 'Wony',
	// 		page: 'SP-1'
	// 	},
	// 	{
	// 		id: 8,
	// 		profile: 'https://picsum.photos/seed/user8/100',
	// 		name: 'Sophia Martinez',
	// 		lastMessage: 'What time is the meeting?',
	// 		lastMessageTime: '1.5 hours ago',
	// 		status: 'Read',
	// 		cre: 'Mehu',
	// 		page: 'SP-2'
	// 	},
	// 	{
	// 		id: 9,
	// 		profile: 'https://picsum.photos/seed/user9/100',
	// 		name: 'James Anderson',
	// 		lastMessage: 'Looking forward to it!',
	// 		lastMessageTime: '2 hours ago',
	// 		status: 'Number Collected',
	// 		cre: 'Ritu',
	// 		page: 'SP-3'
	// 	},
	// 	{
	// 		id: 10,
	// 		profile: 'https://picsum.photos/seed/user10/100',
	// 		name: 'Olivia Garcia',
	// 		lastMessage: 'Can we reschedule?',
	// 		lastMessageTime: '2.5 hours ago',
	// 		status: 'Unread',
	// 		cre: 'Wony',
	// 		page: 'SP-1'
	// 	},
	// ];

// 	const [filteredConversations, setFilteredConversations] = useState(conversations); // Holds the filtered conversations
// 	const [appliedFilters, setAppliedFilters] = useState<{ status: string[]; cre: string[]; page: string[] }>({
// 		status: [],
// 		cre: [],
// 		page: [],
// 	}); // Holds the currently applied filters

// 	// Function to handle filters applied from the Filter component
// 	const handleApplyFilters = (filters: { status: string[]; cre: string[]; page: string[] }) => {
// 		setAppliedFilters(filters); // Update the applied filters

// 		// Filter conversations based on the applied filters
// 		const filteredData = conversations.filter((conversation) => {
// 			return (
// 				(filters.status.length === 0 || filters.status.includes(conversation.status)) &&
// 				(filters.cre.length === 0 || filters.cre.includes(conversation.cre)) &&
// 				(filters.page.length === 0 || filters.page.includes(conversation.page))
// 			);
// 		});

// 		setFilteredConversations(filteredData); // Update the filtered conversations
// 	};

// 	// Function to reset filters and show all conversations
// 	const handleAll = () => {
// 		setFilteredConversations(conversations); // Show all conversations
// 		setAppliedFilters({ status: [], cre: [], page: [] }); // Reset filters
// 	};

// 	return (
// 		<div className="h-full flex flex-col">
// 			<div className="p-4">
// 				{/* YouTube-like Search Bar */}
// 				<SearchInput onSearchChange={(value) => console.log('Current search value:', value)} onSearchClick={(value) => console.log('Search triggered for:', value)} />

// 				<div className="flex items-center justify-between mt-2">
// 					<div className="flex gap-2">
// 						<Button variant="contained" onClick={handleAll} className='!h-7'>All</Button>
// 						<Button variant="contained" onClick={() => handleApplyFilters({ status: ['Unread'], cre: [], page: [] })} className='!h-7'>Unread</Button>
// 					</div>
// 					<Filter onApplyFilters={handleApplyFilters} /> {/* Pass handler to Filter component */}
// 				</div>
// 			</div>

// 			{/* Display Applied Filters */}
// 			{Object.values(appliedFilters).flat().length > 0 && (
// 				<Typography variant="body2" className="p-4 !text-green-500">
// 					Filtered by: {Object.entries(appliedFilters).map(([key, values]) => values.map((value) => `${key}-${value}`).join(' ')).filter(Boolean).join(', ')}
// 				</Typography>
// 			)}

// 			{/* Conversation List */}
// 			<Box
// 				sx={{
// 					overflowY: 'auto',
// 					maxHeight: '500px',
// 					mb: 8,
// 					'&::-webkit-scrollbar': { width: '4px' },
// 					'&::-webkit-scrollbar-thumb': {
// 						backgroundColor: '#3b82f6',
// 						borderRadius: '8px',
// 					},
// 					'&::-webkit-scrollbar-track': { backgroundColor: '#e5e7eb' },
// 				}}
// 			>
// 				{filteredConversations.map((conversation) => (
// 					<div
// 						key={conversation.id}
// 						className="p-4 border-b cursor-pointer"
// 						onClick={() => onSelectConversation(conversation)}
// 					>
// 						<div className="flex items-center p-1">
// 							<img src={conversation.profile} alt="Profile" className="w-10 h-10 rounded-full" />
// 							<div className="ml-4 flex-1">
// 								<div className="flex justify-between items-center">
// 									<div className="font-bold">{conversation.name}</div>
// 									<div className="flex items-center">
// 										<Button variant="contained" color="primary" size="small" sx={{ padding: '2px 8px', marginRight: '4px' }}>
// 											Wony
// 										</Button>
// 										<img src={conversation.profile} alt="Tiny Profile" className="w-6 h-6 rounded-full" />
// 									</div>
// 								</div>
// 								<div className="flex justify-between mt-2">
// 									<div className="text-sm text-gray-600 flex-grow">
// 										{conversation.lastMessage}
// 									</div>
// 									<div className="text-xs text-gray-500 ml-2">
// 										{conversation.lastMessageTime}
// 									</div>
// 								</div>
// 							</div>
// 						</div>

// 						{/* action buttons */}
// 						<ActionButtons />
// 					</div>
// 				))}
// 			</Box>
// 		</div>
// 	);
// };

// export default ConversationList;






import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Filter from './Filter';
import SearchInput from './SearchBar';
import ActionButtons from './ActionButtons';

const ConversationList = ({ onSelectConversation }) => {
	const conversations = [
		{
			id: 1,
			profile: 'https://picsum.photos/seed/user1/100',
			name: 'John Doe',
			lastMessage: 'Hey, how are you?',
			lastMessageTime: '5 minutes ago',
			status: 'Unread',
			cre: 'Wony',
			page: 'SP-1'
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
			status: 'Active',
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
			status: 'Number',
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

  const [filteredConversations, setFilteredConversations] = useState(conversations); 

  const applyFilters = (filters) => {
    const filtered = conversations.filter((conversation) => {
      const matchesStatus = filters.status.length === 0 || filters.status.includes(conversation.status);
      const matchesCre = filters.cre.length === 0 || filters.cre.includes(conversation.cre);
      const matchesPage = filters.page.length === 0 || filters.page.includes(conversation.page);
      return matchesStatus && matchesCre && matchesPage;
    });

    setFilteredConversations(filtered);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <SearchInput onSearchChange={(value) => console.log('Current search value:', value)} onSearchClick={(value) => console.log('Search triggered for:', value)} />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <Button variant="contained" onClick={() => setFilteredConversations(conversations)} className='!h-7'>All</Button>
            <Button variant="contained" onClick={() => applyFilters({ status: ['Unread'], cre: [], page: [] })} className='!h-7'>Unread</Button>
          </div>
          <Filter onApplyFilters={applyFilters} />
        </div>
      </div>

      {filteredConversations.length === 0 ? (
        <Typography variant="body2" color="red" className="p-4">
          No data found for selected filters.
        </Typography>
      ) : (
        <Box sx={{ overflowY: 'auto', maxHeight: '500px', mb: 8, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#3b82f6', borderRadius: '8px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#e5e7eb' } }}>
          {filteredConversations.map((conversation) => (
            <div key={conversation.id} className="p-4 border-b cursor-pointer" onClick={() => onSelectConversation(conversation)}>
              <div className="flex items-center p-1">
                <img src={conversation.profile} alt="Profile" className="w-10 h-10 rounded-full" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{conversation.name}</div>
                    <div className="flex items-center">
                      <Button variant="contained" color="primary" size="small" sx={{ padding: '2px 8px', marginRight: '4px' }}>Wony</Button>
                      <img src={conversation.profile} alt="Tiny Profile" className="w-6 h-6 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-600 flex-grow">{conversation.lastMessage}</div>
                    <div className="text-xs text-gray-500 ml-2">{conversation.lastMessageTime}</div>
                  </div>
                </div>
              </div>
              <ActionButtons />
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ConversationList;
