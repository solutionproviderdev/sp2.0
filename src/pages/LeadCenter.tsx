import ConversationList from '../components/leadCenter/conversations/ConversationList';
import { Outlet } from 'react-router-dom';

const LeadCenter = () => {
	return (
		<div className="flex h-[92vh] ">
			{/* Fixed width for conversation list */}
			<div className="w-4/12 h-full border-r border-gray-300">
				<ConversationList />
			</div>
			{/* Flexible width for inbox and make it scrollable */}
			<div className="w-8/12 ">
				{/* Inbox component */}
				<Outlet />
				{/* {selectedConversation && <Inbox conversation={selectedConversation} />} */}
			</div>
		</div>
	);
};

export default LeadCenter;
