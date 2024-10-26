import React, { useState } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import {
	useGetAllConversationsQuery,
	useMarkAsSeenMutation,
} from '../../../features/conversation/conversationApi';
import SearchInput from './SearchInput';
import ConversationFilter from './ConversationFilter'; // Import the new filter component
import { useNavigate } from 'react-router-dom';
import ConversationItem from './ConversationItem';

const ConversationList = () => {
	// Set the page to 1 and the limit to 500
	const page = 1;
	const limit = 500;
	const { data, error, isLoading } = useGetAllConversationsQuery({
		page,
		limit,
	});

	const navigate = useNavigate();
	const [markAsSeen] = useMarkAsSeenMutation();
	const [filters, setFilters] = useState({
		statuses: [], // Initialize the filter for statuses
		pages: [], // Initialize the filter for pages
		creNames: [], // Initialize the filter for CRE names
		messagesSeen: null, // Initialize the filter for messages seen (read/unread)
		searchText: '', // Search text state
	});

	// Handle selecting a conversation
	const handleSelectConversation = async selectedLeadId => {
		await markAsSeen({ id: selectedLeadId });
		navigate(`/admin/lead-center/${selectedLeadId}`);
	};

	const applyFilters = conversations => {
		if (!conversations) return [];

		let filtered = [...conversations];

		// Apply search filter
		if (filters.searchText) {
			const normalizedSearchText = filters.searchText
				.replace(/\s+/g, '')
				.toLowerCase();
			filtered = filtered.filter(conversation =>
				conversation.name
					?.replace(/\s+/g, '')
					.toLowerCase()
					.includes(normalizedSearchText)
			);
		}

		// Apply filters for statuses
		if (filters.statuses.length > 0) {
			filtered = filtered.filter(conversation =>
				filters.statuses.includes(conversation.status)
			);
		}

		// Apply filters for creNames
		if (filters.creNames.length > 0) {
			filtered = filtered.filter(conversation =>
				filters.creNames.includes(conversation.creName._id)
			);
		}

		// Apply filters for pages (using pageInfo.pageId)
		if (filters.pages.length > 0) {
			filtered = filtered.filter(conversation =>
				filters.pages.includes(conversation.pageInfo?.pageId)
			);
		}

		// Apply messagesSeen filter ONLY if it's true or false (ignore null)
		if (filters.messagesSeen !== null) {
			filtered = filtered.filter(
				conversation => conversation.messagesSeen === filters.messagesSeen
			);
		}

		return filtered;
	};

	if (isLoading && page === 1) {
		return <CircularProgress size={40} />;
	}

	if (error) {
		return (
			<Typography color="red">
				Error fetching conversations: {error.message}
			</Typography>
		);
	}

	// Apply filters and search directly to the data
	const filteredConversations = applyFilters(data?.leads);

	return (
		<div className="h-full flex flex-col">
			<div className="p-2">
				<SearchInput filters={filters} setFilters={setFilters} />
				<ConversationFilter
					filters={filters}
					setFilters={setFilters}
					availableFilters={data?.filters} // Pass the filters here
				/>
			</div>

			{filteredConversations?.length === 0 ? (
				<Typography variant="body2" color="red" className="p-4">
					No data found for selected filters.
				</Typography>
			) : (
				<div className="flex flex-col gap-2 p-2 overflow-y-auto scrollbar-none">
					{filteredConversations?.map(conversation => (
						<ConversationItem
							key={conversation._id}
							conversation={conversation}
							onSelect={handleSelectConversation}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ConversationList;
