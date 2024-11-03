import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';

const ConversationItem = ({ conversation, onSelect }) => {
	// console.log(conversation);

	// Check if the message is seen or not
	const isMessageSeen = conversation.messagesSeen;
	console.log('conversation',conversation)

	return (
		<div
			className="p-2 border-b cursor-pointer"
			onClick={() => onSelect(conversation?._id)}
		>
			<div className="flex items-center p-1">
				{/* Page Profile Picture */}
				<img
					src={conversation.pageInfo?.pageProfilePicture}
					alt="Profile"
					className="w-12 h-12 rounded-full"
				/>

				{/* Main Info */}
				<div className="ml-4 flex-1">
					{/* Name and Status */}
					<div className="flex items-center justify-between">
						{/* Conditionally render bold text for unseen messages */}
						<Typography
							variant="subtitle1"
							fontWeight={isMessageSeen ? 'normal' : 'bold'}
							className="whitespace-nowrap"
						>
							{conversation?.name}
						</Typography>
						<div className="flex space-x-1">
							<div className="capitalize text-xs text-white bg-blue-600 px-1.5 py-0.5 rounded-sm">
								{conversation?.status}
							</div>
							<Tooltip title={conversation?.creName?.name}>
								<img
									src={conversation?.creName?.profilePicture}
									alt={conversation?.creName?.name}
									className="w-5 h-5 rounded-full border-2 border-blue-400"
								/>
							</Tooltip>
						</div>
					</div>

					{/* Last Message and Time */}
					<div className="flex items-center justify-between">
						<Typography
							variant="body2"
							className={`line-clamp-1 ${
								isMessageSeen ? 'text-gray-600' : 'font-bold'
							}`}
						>
							{conversation?.lastMessage}
						</Typography>
						<Typography
							variant="caption"
							color={isMessageSeen ? 'textSecondary' : 'initial'}
							className={`text-xs whitespace-nowrap ${
								isMessageSeen ? '' : 'font-bold'
							}`}
						>
							{moment(conversation?.lastMessageTime).fromNow()}
						</Typography>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationItem;
