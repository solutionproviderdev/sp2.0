// import React, { useState } from "react";
// import ConversationList from "../components/leadCenter/ConversationList";
// import Inbox from "../components/leadCenter/Inbox";
// import Button from '@mui/material/Button';

// interface Conversation {
//   id: number;
//   name: string;
//   lastMessage: string;
//   lastMessageTime: string;
//   status?: string;
//   phone?: string;
//   address?: string;
// }

// const LeadCenter = () => {
//   const [selectedConversation, setSelectedConversation] =
//     useState<Conversation | null>(null);

//   const handleSelectConversation = (conversation: Conversation) => {
//     setSelectedConversation(conversation);
//   };

//   return (
// 		<div className="flex h-screen">
// 			<div className="w-3/12 border-r border-gray-300">
// 				<ConversationList onSelectConversation={handleSelectConversation} />
// 			</div>
// 			<div className="w-9/12 bg-red-400 border-r border-gray-300">
				 
// 				<Inbox conversation={selectedConversation} />
// 			</div>
// 		</div>
// 	);
// };

// export default LeadCenter;





import React, { useState } from 'react';
import ConversationList from '../components/leadCenter/ConversationList';
import Inbox from '../components/leadCenter/Inbox';

interface Conversation {
	id: number;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	status?: string;
	phone?: string;
	address?: string;
}

const LeadCenter = () => {
	const [selectedConversation, setSelectedConversation] =
		useState<Conversation | null>(null);

	const handleSelectConversation = (conversation: Conversation) => {
		setSelectedConversation(conversation);
	};

	return (
		<div className="flex h-screen ">
			{/* Fixed width for conversation list */}
			<div className="w-3/12 border-r border-gray-300">
				<ConversationList onSelectConversation={handleSelectConversation} />
			</div>
			{/* Flexible width for inbox and make it scrollable */}
			<div className="w-9/12  ">
				<Inbox conversation={selectedConversation} />
				
			</div>
		</div>
	);
};

export default LeadCenter;
