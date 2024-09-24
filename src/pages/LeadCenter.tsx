import React, { useState } from 'react';
import ConversationList from '../components/leadCenter/conversations/ConversationList';
import Inbox from '../components/leadCenter/Inbox/Inbox';
import { Outlet, useNavigate } from 'react-router-dom';

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
	return (
		<div className="flex h-screen ">
			{/* Fixed width for conversation list */}
			<div className="w-3/12 h-full border-r border-gray-300">
				<ConversationList />
			</div>
			{/* Flexible width for inbox and make it scrollable */}
			<div className="w-9/12  ">
				{/* Inbox component */}
				<Outlet />
				{/* {selectedConversation && <Inbox conversation={selectedConversation} />} */}
			</div>
		</div>
	);
};

export default LeadCenter;
