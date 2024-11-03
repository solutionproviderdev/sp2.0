// import React, { useState } from 'react';
// import { Typography, CircularProgress } from '@mui/material';
// import {
// 	useGetAllConversationsQuery,
// 	useMarkAsSeenMutation,
// } from '../../../features/conversation/conversationApi';
// import SearchInput from './SearchInput';
// import ConversationFilter from './ConversationFilter'; // Import the new filter component
// import { useNavigate } from 'react-router-dom';
// import ConversationItem from './ConversationItem';

// const ConversationList = () => {
// 	// Set the page to 1 and the limit to 500
// 	const page = 1;
// 	const limit =20;
// 	const { data, error, isLoading } = useGetAllConversationsQuery({
// 		page,
// 		limit,
// 	});

// 	const navigate = useNavigate();
// 	const [markAsSeen] = useMarkAsSeenMutation();
// 	const [filters, setFilters] = useState({
// 		statuses: [], // Initialize the filter for statuses
// 		pages: [], // Initialize the filter for pages
// 		creNames: [], // Initialize the filter for CRE names
// 		messagesSeen: null, // Initialize the filter for messages seen (read/unread)
// 		searchText: '', // Search text state
// 	});

// 	// Handle selecting a conversation
// 	const handleSelectConversation = async selectedLeadId => {
// 		await markAsSeen({ id: selectedLeadId });
// 		navigate(`/admin/lead-center/${selectedLeadId}`);
// 	};

// 	const applyFilters = conversations => {
// 		if (!conversations) return [];

// 		let filtered = [...conversations];

// 		// Apply search filter
// 		if (filters.searchText) {
// 			const normalizedSearchText = filters.searchText
// 				.replace(/\s+/g, '')
// 				.toLowerCase();
// 			filtered = filtered.filter(conversation =>
// 				conversation.name
// 					?.replace(/\s+/g, '')
// 					.toLowerCase()
// 					.includes(normalizedSearchText)
// 			);
// 		}

// 		// Apply filters for statuses
// 		if (filters.statuses.length > 0) {
// 			filtered = filtered.filter(conversation =>
// 				filters.statuses.includes(conversation.status)
// 			);
// 		}

// 		// Apply filters for creNames
// 		if (filters.creNames.length > 0) {
// 			filtered = filtered.filter(conversation =>
// 				filters.creNames.includes(conversation.creName._id)
// 			);
// 		}

// 		// Apply filters for pages (using pageInfo.pageId)
// 		if (filters.pages.length > 0) {
// 			filtered = filtered.filter(conversation =>
// 				filters.pages.includes(conversation.pageInfo?.pageId)
// 			);
// 		}

// 		// Apply messagesSeen filter ONLY if it's true or false (ignore null)
// 		if (filters.messagesSeen !== null) {
// 			filtered = filtered.filter(
// 				conversation => conversation.messagesSeen === filters.messagesSeen
// 			);
// 		}

// 		return filtered;
// 	};

// 	if (isLoading && page === 1) {
// 		return <CircularProgress size={40} />;
// 	}

// 	if (error) {
// 		return (
// 			<Typography color="red">
// 				Error fetching conversations: {error.message}
// 			</Typography>
// 		);
// 	}

// 	// Apply filters and search directly to the data
// 	const filteredConversations = applyFilters(data?.leads);

// 	return (
// 		<div className="h-full flex flex-col">
// 			<div className="p-2">
// 				<SearchInput filters={filters} setFilters={setFilters} />
// 				<ConversationFilter
// 					filters={filters}
// 					setFilters={setFilters}
// 					availableFilters={data?.filters} // Pass the filters here
// 				/>
// 			</div>

// 			{filteredConversations?.length === 0 ? (
// 				<Typography variant="body2" color="red" className="p-4">
// 					No data found for selected filters.
// 				</Typography>
// 			) : (
// 				<div className="flex flex-col gap-2 p-2 overflow-y-auto scrollbar-none">
// 					{filteredConversations?.map(conversation => (
// 						<ConversationItem
// 							key={conversation._id}
// 							conversation={conversation}
// 							onSelect={handleSelectConversation}
// 						/>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ConversationList;



















import React, { useCallback, useRef } from 'react';
import { Typography, CircularProgress } from '@mui/material';
import {
  useGetAllConversationsQuery,
  useMarkAsSeenMutation
} from '../../../features/conversation/conversationApi';
import SearchInput from './SearchInput';
import ConversationFilter from './ConversationFilter';
import { useNavigate } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import { useState } from 'react';

const ConversationList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    statuses: [],
    pages: [],
    creNames: [],
    messagesSeen: null,
    searchText: '',
  });
  
  const limit = 20;
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  const {
    data: currentData,
    error,
    isLoading,
    isFetching,
    refetch
  } = useGetAllConversationsQuery({
    page: currentPage,
    limit,
  });

  const navigate = useNavigate();
  const [markAsSeen] = useMarkAsSeenMutation();

  // Intersection Observer callback
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            currentData &&
            currentPage < currentData.totalPages
          ) {
            setCurrentPage((prev) => prev + 1);
          }
        },
        { rootMargin: '200px' }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isFetching, currentData?.totalPages, currentPage]
  );

  // Reset pagination when filters change
  const handleFiltersChange = useCallback((newFilters) => {
    setCurrentPage(1);
    setFilters(newFilters);
    refetch();
  }, [refetch]);

  const handleSelectConversation = async (selectedLeadId) => {
    await markAsSeen({ id: selectedLeadId });
    navigate(`/admin/lead-center/${selectedLeadId}`);
  };

  const applyFilters = useCallback((conversations) => {
    if (!conversations) return [];

    return conversations.filter(conversation => {
      const matchesSearch = !filters.searchText || 
        conversation.name?.toLowerCase().includes(filters.searchText.toLowerCase());
      
      const matchesStatus = filters.statuses.length === 0 || 
        filters.statuses.includes(conversation.status);
      
      const matchesCreName = filters.creNames.length === 0 || 
        filters.creNames.includes(conversation.creName._id);
      
      const matchesPage = filters.pages.length === 0 || 
        filters.pages.includes(conversation.pageInfo?.pageId);
      
      const matchesMessagesSeen = filters.messagesSeen === null || 
        conversation.messagesSeen === filters.messagesSeen;

      return matchesSearch && matchesStatus && matchesCreName && 
             matchesPage && matchesMessagesSeen;
    });
  }, [filters]);

  const filteredConversations = currentData?.leads ? applyFilters(currentData.leads) : [];

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 sticky top-0 bg-white z-10">
        <SearchInput filters={filters} setFilters={handleFiltersChange} />
        <ConversationFilter
          filters={filters}
          setFilters={handleFiltersChange}
          availableFilters={currentData?.filters}
        />
      </div>

      {isLoading && currentPage === 1 ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgress size={40} />
        </div>
      ) : error ? (
        <Typography color="error" className="p-4">
          {error.message || 'Error fetching conversations'}
        </Typography>
      ) : filteredConversations.length === 0 ? (
        <Typography variant="body2" color="textSecondary" className="p-4 text-center">
          No conversations found
        </Typography>
      ) : (
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400"
        >
          <div className="flex flex-col gap-2 p-2">
            {filteredConversations.map((conversation, index) => (
              <div
                key={conversation._id}
                ref={index === filteredConversations.length - 5 ? lastElementRef : null}
              >
                <ConversationItem
                  conversation={conversation}
                  onSelect={handleSelectConversation}
                />
              </div>
            ))}
          </div>

          {(isFetching || isLoading) && currentPage < (currentData?.totalPages || 1) && (
            <div className="flex justify-center p-4">
              <CircularProgress size={30} />
            </div>
          )}

          {currentPage >= (currentData?.totalPages || 1) && filteredConversations.length > 0 && (
            <Typography className="text-center p-4 text-gray-500">
              No more conversations to load
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversationList;