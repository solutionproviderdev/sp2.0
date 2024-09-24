import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import {
	useGetAllConversationsQuery,
	useMarkAsSeenMutation,
} from '../../../features/conversation/conversationApi';
import SearchInput from './SearchBar';
import Filter from './Filter';
import ConversationItem from './ConversationItem'; // Importing the new component
import { useNavigate } from 'react-router-dom';

const ConversationList = () => {
	const [page, setPage] = useState(1);
	const limit = 10;
	const { data, error, isLoading, isFetching } = useGetAllConversationsQuery({
		page,
		limit,
	});
	const navigate = useNavigate();
	const [conversations, setConversations] = useState([]);
	const [filteredConversations, setFilteredConversations] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [filters, setFilters] = useState({ status: [], cre: [], page: [] });
	const observer = useRef(null);
	const [markAsSeen] = useMarkAsSeenMutation();

	useEffect(() => {
		if (data && data.leads) {
			setConversations(prev =>
				page === 1 ? data.leads : [...prev, ...data.leads]
			);
		}
	}, [data, page]);

	const handleSelectConversation = async selectedLeadId => {
		await markAsSeen({ id: selectedLeadId });
		navigate(`/admin/lead-center/${selectedLeadId}`);
	};

	useEffect(() => {
		applyFilters(conversations);
	}, [conversations, filters, searchText]);

	const applyFilters = conversations => {
		let updatedConversations = conversations;

		if (searchText) {
			const normalizedSearchText = searchText.replace(/\s+/g, '').toLowerCase();
			updatedConversations = updatedConversations.filter(conversation =>
				conversation.name
					.replace(/\s+/g, '')
					.toLowerCase()
					.includes(normalizedSearchText)
			);
		}

		updatedConversations = updatedConversations.filter(conversation => {
			const matchesStatus =
				!filters.status.length || filters.status.includes(conversation.status);
			const matchesCre =
				!filters.cre.length || filters.cre.includes(conversation.creName);
			const matchesPage =
				!filters.page.length ||
				filters.page.includes(conversation.sourcePageName);
			return matchesStatus && matchesCre && matchesPage;
		});

		setFilteredConversations(updatedConversations);
	};

	const handleSearchChange = text => {
		setSearchText(text);
		setPage(1);
	};

	const handleShowAll = () => {
		setFilters({ status: [], cre: [], page: [] });
		setSearchText('');
		setPage(1);
	};

	const handleFilterUnread = () => {
		setFilters({ status: ['unread'], cre: [], page: [] });
		setPage(1);
	};

	const handleApplyFilters = newFilters => {
		setFilters(newFilters);
		setPage(1);
	};

	const lastConversationRef = useCallback(
		node => {
			if (isFetching) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && data?.totalPages > page) {
					setPage(prevPage => prevPage + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[isFetching, data, page]
	);

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

	return (
		<div className="h-full flex flex-col">
			<div className="p-2">
				<SearchInput onSearchChange={handleSearchChange} />
				<div className="flex items-center justify-between mt-2">
					<div className="flex gap-2">
						<Button
							variant="contained"
							onClick={handleShowAll}
							className="!h-7"
						>
							All
						</Button>
						<Button
							variant="contained"
							onClick={handleFilterUnread}
							className="!h-7"
						>
							Unread
						</Button>
					</div>
					<Filter onApplyFilters={handleApplyFilters} />
				</div>
			</div>

			{filteredConversations.length === 0 ? (
				<Typography variant="body2" color="red" className="p-4">
					No data found for selected filters.
				</Typography>
			) : (
				<div className="flex flex-col gap-2 p-2 overflow-y-auto scrollbar-none">
					{filteredConversations.map((conversation, index) => (
						<ConversationItem
							key={conversation._id}
							conversation={conversation}
							onSelect={handleSelectConversation}
							refCallback={
								index === filteredConversations.length - 1
									? lastConversationRef
									: null
							}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ConversationList;
