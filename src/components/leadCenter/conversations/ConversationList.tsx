
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import Filter from './Filter';
import SearchInput from './SearchBar';
import ActionButtons from './ActionButtons';
import { useGetAllConversationsQuery } from '../../../features/conversation/conversationApi';
import moment from 'moment';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Icon for invisible state

const ConversationList = ({ onSelectConversation }) => {
  const [page, setPage] = useState(1); // Initialize page state
  const limit = 10; // Number of items per page
  const { data, error, isLoading, isFetching, refetch } = useGetAllConversationsQuery({ page, limit });

  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ status: [], cre: [], page: [] });
  const observer = useRef(null);

  useEffect(() => {
    if (data && data.leads) {
      // Update conversations state with data from backend
      setConversations((prev) => (page === 1 ? data.leads : [...prev, ...data.leads]));
    }
  }, [data]);

  useEffect(() => {
    // Apply search and filter logic whenever data, searchText, or filters change
    applyAllFilters(conversations);
  }, [conversations, filters, searchText]);

  const applyAllFilters = (conversations) => {
    let updatedConversations = conversations;

    // Apply search filter ignoring whitespace
    if (searchText) {
      const normalizedSearchText = searchText.replace(/\s+/g, '').toLowerCase(); // Remove whitespace and convert to lowercase
      updatedConversations = updatedConversations.filter((conversation) =>
        conversation.name.replace(/\s+/g, '').toLowerCase().includes(normalizedSearchText) // Compare without whitespace
      );
    }

    // Apply custom filters
    updatedConversations = updatedConversations.filter((conversation) => {
      const matchesStatus = filters.status.length === 0 || filters.status.includes(conversation.status);
      const matchesCre = filters.cre.length === 0 || filters.cre.includes(conversation.creName);
      const matchesPage = filters.page.length === 0 || filters.page.includes(conversation.sourcePageName); // Assuming 'page' filter uses 'sourcePageName'
      return matchesStatus && matchesCre && matchesPage;
    });

    setFilteredConversations(updatedConversations); // Update the filtered conversations
  };

  const handleSearchChange = (searchText) => {
    setSearchText(searchText);
    setPage(1); // Reset to first page when search text changes
  };

  const handleShowAll = () => {
    setFilters({ status: [], cre: [], page: [] });
    setSearchText('');
    setPage(1); // Reset to first page when resetting filters
  };

  const handleFilterUnread = () => {
    setFilters({ status: ['unread'], cre: [], page: [] });
    setPage(1); // Reset to first page when applying filters
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when new filters are applied
  };

  const lastConversationRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.totalPages > page) {
          setPage((prevPage) => prevPage + 1); // Increment page number to fetch more data
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, data]
  );

  if (isLoading && page === 1) {
    return <CircularProgress size={40} />;
  }

  if (error) {
    return <Typography color="red">Error fetching conversations: {error.message}</Typography>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2">
        <SearchInput onSearchChange={handleSearchChange} />
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <Button variant="contained" onClick={handleShowAll} className='!h-7'>All</Button>
            <Button variant="contained" onClick={handleFilterUnread} className='!h-7'>Unread</Button>
          </div>
          <Filter onApplyFilters={handleApplyFilters} />
        </div>
      </div>

      {filteredConversations.length === 0 ? (
        <Typography variant="body2" color="red" className="p-4">
          No data found for selected filters.
        </Typography>
      ) : (
        <Box sx={{ overflowY: 'auto', maxHeight: 'full', mb: 8, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#3b82f6', borderRadius: '8px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#e5e7eb' } }}>
          {filteredConversations.map((conversation, index) => (
            <div
              key={conversation._id}
              className="p-2 border-b cursor-pointer"
              onClick={() => onSelectConversation(conversation)}
              ref={index === filteredConversations.length - 1 ? lastConversationRef : null} // Attach observer to the last conversation
            >
              <div className="flex items-center p-1">
                <img src={conversation.profile} alt="Profile" className="w-10 h-10 rounded-full" />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{conversation.name}</div>
                    <div className="flex items-center">
                      <Button className='!text-xs' variant="contained" color="primary" size="small" sx={{ padding: '2px 2px', marginRight: '4px' }}>
                        {conversation.status}
                      </Button>
                      <img src={conversation.profile} alt="Tiny Profile" className="w-6 h-6 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="text-sm text-gray-600 flex-grow">
                      {conversation.lastMessage.length > 50 ? `${conversation.lastMessage.slice(0, 25)}...` : conversation.lastMessage}
                    </div>
                    <div className="text-xs text-gray-500 ml-2">{moment(conversation.lastMessageTime).format('MMM D, YYYY h:mm A')}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Box>
      )}
    </div>
  );
};

export default ConversationList;
