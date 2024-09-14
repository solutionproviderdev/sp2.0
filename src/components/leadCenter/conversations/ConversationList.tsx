



// import React, { useState } from 'react';
// import { Button, Box, Typography } from '@mui/material';
// import Filter from './Filter';
// import SearchInput from './SearchBar';
// import ActionButtons from './ActionButtons';
// import conversations from '../../assets/conversation.json';

// const ConversationList = ({ onSelectConversation }) => {
//   const [filteredConversations, setFilteredConversations] = useState(conversations);
//   const [showAll, setShowAll] = useState(false);

//   // Apply filters based on the selected criteria
//   const applyFilters = (filters) => {
//     const filtered = conversations.filter((conversation) => {
//       const matchesStatus = filters.status.length === 0 || filters.status.includes(conversation.status);
//       const matchesCre = filters.cre.length === 0 || filters.cre.includes(conversation.cre);
//       const matchesPage = filters.page.length === 0 || filters.page.includes(conversation.page);
//       return matchesStatus && matchesCre && matchesPage;
//     });
//     setFilteredConversations(filtered);
//   };

//   // Handle search input changes
//   const handleSearchChange = (searchText) => {
//     const normalizedSearchText = searchText.trim().toLowerCase(); // Normalize the input for consistent search

//     if (normalizedSearchText === '') {
//       setFilteredConversations(conversations);
//       setShowAll(false);
//     } else {
//       const filtered = conversations.filter((conversation) =>
//         conversation.name.toLowerCase().includes(normalizedSearchText) ||
//         conversation.cre.toLowerCase().includes(normalizedSearchText) ||
//         conversation.page.toLowerCase().includes(normalizedSearchText)
//       );
//       setFilteredConversations(filtered); // Show all matching results
//       setShowAll(false);
//     }
//   };

//   // Handle showing all conversations
//   const handleShowAll = () => {
//     setFilteredConversations(conversations);
//     setShowAll(true);
//   };

//   return (
//     <div className="h-full flex flex-col">
//       <div className="p-4">
//         {/* Pass the handleSearchChange function directly to the onSearchChange prop */}
//         <SearchInput onSearchChange={handleSearchChange} />

//         <div className="flex items-center justify-between mt-2">
//           <div className="flex gap-2">
//             {/* Button to show all conversations */}
//             <Button variant="contained" onClick={handleShowAll} className='!h-7'>All</Button>
//             {/* Button to apply a specific filter */}
//             <Button variant="contained" onClick={() => applyFilters({ status: ['Unread'], cre: [], page: [] })} className='!h-7'>Unread</Button>
//           </div>
//           {/* Filter component to apply different filters */}
//           <Filter onApplyFilters={applyFilters} />
//         </div>
//       </div>

//       {filteredConversations.length === 0 ? (
//         <Typography variant="body2" color="red" className="p-4">
//           No data found for selected filters.
//         </Typography>
//       ) : (
//         <Box sx={{ overflowY: 'auto', maxHeight: '500px', mb: 8, '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { backgroundColor: '#3b82f6', borderRadius: '8px' }, '&::-webkit-scrollbar-track': { backgroundColor: '#e5e7eb' } }}>
//           {filteredConversations.map((conversation) => (
//             <div key={conversation.id} className="p-4 border-b cursor-pointer" onClick={() => onSelectConversation(conversation)}>
//               <div className="flex items-center p-1">
//                 <img src={conversation.profile} alt="Profile" className="w-10 h-10 rounded-full" />
//                 <div className="ml-4 flex-1">
//                   <div className="flex justify-between items-center">
//                     <div className="font-bold">{conversation.name}</div>
//                     <div className="flex items-center">
//                       <Button variant="contained" color="primary" size="small" sx={{ padding: '2px 8px', marginRight: '4px' }}>Wony</Button>
//                       <img src={conversation.profile} alt="Tiny Profile" className="w-6 h-6 rounded-full" />
//                     </div>
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <div className="text-sm text-gray-600 flex-grow">{conversation.lastMessage}</div>
//                     <div className="text-xs text-gray-500 ml-2">{conversation.lastMessageTime}</div>
//                   </div>
//                 </div>
//               </div>
//               <ActionButtons />
//             </div>
//           ))}
//         </Box>
//       )}

//       {!showAll && filteredConversations.length > 0 && filteredConversations.length < conversations.length && (
//         <Button variant="contained" onClick={handleShowAll} className='!h-7 mt-2'>
//           Show All
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ConversationList;




import React, { useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Filter from './Filter';
import SearchInput from './SearchBar';
import ActionButtons from './ActionButtons';
import conversations from '../../../assets/conversation.json';

const ConversationList = ({ onSelectConversation }) => {
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const [showAll, setShowAll] = useState(false);

  const applyFilters = (filters) => {
    const filtered = conversations.filter((conversation) => {
      const matchesStatus = filters.status.length === 0 || filters.status.includes(conversation.status);
      const matchesCre = filters.cre.length === 0 || filters.cre.includes(conversation.cre);
      const matchesPage = filters.page.length === 0 || filters.page.includes(conversation.page);
      return matchesStatus && matchesCre && matchesPage;
    });
    setFilteredConversations(filtered);
  };

  const handleSearchChange = (searchText) => {
    const normalizedSearchText = searchText.trim().toLowerCase();

    if (normalizedSearchText === '') {
      setFilteredConversations(conversations);
      setShowAll(false);
    } else {
      const startWithMatches = conversations.filter((conversation) =>
        conversation.name.toLowerCase().startsWith(normalizedSearchText) 
        // conversation.cre.toLowerCase().startsWith(normalizedSearchText) ||
        // conversation.page.toLowerCase().startsWith(normalizedSearchText)
      );

      const includeMatches = conversations.filter((conversation) =>
        !startWithMatches.includes(conversation) && (
          conversation.name.toLowerCase().includes(normalizedSearchText) 
        //   conversation.cre.toLowerCase().includes(normalizedSearchText) ||
        //   conversation.page.toLowerCase().includes(normalizedSearchText)
        )
      );

      const filtered = [...startWithMatches, ...includeMatches];

      setFilteredConversations(filtered);
      setShowAll(false);
    }
  };

  const handleShowAll = () => {
    setFilteredConversations(conversations);
    setShowAll(true);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <SearchInput onSearchChange={handleSearchChange} />

        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2">
            <Button variant="contained" onClick={handleShowAll} className='!h-7'>All</Button>
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

      {/* {!showAll && filteredConversations.length > 0 && filteredConversations.length < conversations.length && (
        <Button variant="contained" onClick={handleShowAll} className='!h-7 mt-2'>
          Show All
        </Button>
      )} */}
    </div>
  );
};

export default ConversationList;
