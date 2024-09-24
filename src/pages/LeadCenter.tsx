import React, { useState } from 'react';
import ConversationList from '../components/leadCenter/conversations/ConversationList';
import Inbox from '../components/leadCenter/Inbox/Inbox';

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
			<div className="w-3/12 h-full border-r border-gray-300">
				<ConversationList onSelectConversation={handleSelectConversation} />
			</div>
			{/* Flexible width for inbox and make it scrollable */}
			<div className="w-9/12  ">
				{/* Inbox component */}
				{selectedConversation && <Inbox conversation={selectedConversation} />}
			</div>
		</div>
	);
};

export default LeadCenter;
