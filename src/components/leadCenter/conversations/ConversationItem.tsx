import { Tooltip, Typography } from '@mui/material';
import moment from 'moment';

const ConversationItem = ({ conversation, onSelect }) => {
	const isMessageSeen = conversation.messagesSeen;

	return (
		<div
			className="p-2 border-b cursor-pointer"
			onClick={() => onSelect(conversation._id)}
		>
			<div className="flex items-center p-1">
				{/* Page Profile Picture */}
				<div
					style={{
						border: isMessageSeen ? 'none' : '2px solid #046288',
						borderRadius: '50%',
						overflow: 'hidden',
					}}
				>
					<img
						src={conversation.pageInfo?.pageProfilePicture}
						alt="Profile"
						className="w-12 h-12 rounded-full"
					/>
				</div>

				{/* Main Info */}
				<div className="ml-4 flex-1">
					{/* Name and Status */}
					<div className="flex items-center justify-between">
						<div>
							{isMessageSeen ? (
								<Typography variant="subtitle1">{conversation.name}</Typography>
							) : (
								<div className="flex items-center">
									<div
										style={{
											width: '6px',
											height: '6px',
											backgroundColor: '#046288', // Changed from #1976d2
											borderRadius: '50%',
											marginRight: '4px',
										}}
									/>
									<Typography variant="subtitle1" fontWeight="bold">
										{conversation.name}
									</Typography>
								</div>
							)}
						</div>
						<div className="flex space-x-1">
							<div
								className="capitalize text-xs text-white"
								style={{
									backgroundColor: '#046288', // Changed from bg-blue-600
									padding: '2px 6px',
									borderRadius: '4px',
									fontSize: '0.75rem',
								}}
							>
								{conversation.status}
							</div>
							{conversation.creName && (
								<Tooltip title={conversation.creName?.name}>
									<img
										src={conversation.creName?.profilePicture}
										alt={conversation.creName?.name}
										className="w-5 h-5 rounded-full"
										style={{ border: '2px solid #046288' }} // Changed from #1976d2
									/>
								</Tooltip>
							)}
						</div>
					</div>

					{/* Last Message and Time */}
					<div className="flex items-center justify-between">
						<Typography
							variant="body2"
							className="line-clamp-1"
							style={{
								color: isMessageSeen ? 'gray' : '#046288', // Changed to primary color
								fontWeight: isMessageSeen ? 'normal' : 'bold',
								maxWidth: '200px',
							}}
						>
							{conversation.lastMessage}
						</Typography>
						<Typography
							variant="caption"
							style={{
								color: isMessageSeen ? 'gray' : '#046288', // Changed to primary color
								fontSize: '0.75rem',
							}}
						>
							{moment(conversation.lastMessageTime).fromNow()}
						</Typography>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConversationItem;
