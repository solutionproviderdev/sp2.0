// import React from 'react';
// import { TextField, IconButton, Box } from '@mui/material';
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
// import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import Chats from './chats';
// import conversationMessages from '../../assets/message.json'; 
// import Sidebar from './sidebar';
 

// interface Conversation {
// 	id: number;
// 	name: string;
// 	lastMessage: string;
// 	lastMessageTime: string;
// 	status?: string;
// }

// interface InboxProps {
// 	conversation: Conversation | null;
// }

// const Inbox: React.FC<InboxProps> = ({ conversation }) => {
// 	// Filter messages by the selected conversation ID
// 	const filteredMessages = conversation
// 		? conversationMessages.find((msg) => msg.conversationId === conversation.id)?.messages || []
// 		: [];

// 	return (
// 		<div className="flex flex-col h-full ">
// 			{/* Header */}
// 			<div className="p-4 py-6 border-b flex justify-between">
// 				<div className="font-bold">{conversation?.name}</div>

// 				<div className="text-sm text-gray-600">
// 					<select className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
// 						<option value="unread">Unread</option>
// 						<option value="In Progress">In Progress</option>
// 						<option value="Completed">Completed</option>
// 						<option value="active">Active</option>
// 						<option value="Canceled">Canceled</option>
// 					</select>
// 					<div> 
// 						{/* <Sidebar />  */}
// 					</div>
// 				</div>
// 			</div>

// 			{/* Messages */}
// 			<Box
// 				sx={{
// 					flex:'1',
// 					overflowY: 'auto',
// 					maxHeight: '700px',
// 					mb: 0,
// 					'&::-webkit-scrollbar': {
// 						width: '4px',
// 					},
// 					'&::-webkit-scrollbar-thumb': {
// 						backgroundColor: '#3b82f6',
// 						borderRadius: '8px',
// 					},
// 					'&::-webkit-scrollbar-track': {
// 						backgroundColor: '#e5e7eb',
// 					},
// 				}}
// 			>
// 				<Chats messages={filteredMessages} />
// 			</Box>

// 			{/* Input Box */}
// 			<div className="border-t mb-14 bg-gray-200">
// 				<div className="p-2 pb-4 bg-white border-t flex items-center">
// 					<IconButton className="text-gray-500">
// 						<CameraAltIcon className="text-gray-800" />
// 					</IconButton>

// 					<IconButton>
// 						<EmojiEmotionsRoundedIcon className="text-orange-400" />
// 					</IconButton>

// 					<IconButton>
// 						<AttachFileRoundedIcon className="text-gray-700" />
// 					</IconButton>

// 					<TextField label="Outlined" className="w-full rounded" />

// 					<IconButton>
// 						<SendRoundedIcon className="text-blue-500" />
// 					</IconButton>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Inbox;







import React, { useState } from 'react';
import { TextField, IconButton, Box, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Chats from './chats';
import conversationMessages from '../../assets/message.json'; // Import messages from JSON file

interface Conversation {
	id: number;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	status?: string;
}

interface InboxProps {
	conversation: Conversation | null;
}

const Inbox: React.FC<InboxProps> = ({ conversation }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar visibility

	// Filter messages by the selected conversation ID
	const filteredMessages = conversation
		? conversationMessages.find((msg) => msg.conversationId === conversation.id)?.messages || []
		: [];

	// Function to toggle sidebar visibility
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col h-full ">
			{/* Header */}
			<div className="p-4 py-6 border-b flex justify-between">
				<div className="font-bold">{conversation?.name}</div>

				<div className="text-sm text-gray-600 flex items-center">
					<select className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
						<option value="unread">Unread</option>
						<option value="In Progress">In Progress</option>
						<option value="Completed">Completed</option>
						<option value="active">Active</option>
						<option value="Canceled">Canceled</option>
					</select>

					{/* Button to toggle sidebar */}
					<Button variant="outlined" onClick={toggleSidebar} sx={{ marginLeft: 1 }}>
						Open Sidebar
					</Button>
				</div>
			</div>

			{/* Messages */}
			<Box
				sx={{
					flex: '1',
					overflowY: 'auto',
					maxHeight: '700px',
					mb: 0,
					'&::-webkit-scrollbar': {
						width: '4px',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#3b82f6',
						borderRadius: '8px',
					},
					'&::-webkit-scrollbar-track': {
						backgroundColor: '#e5e7eb',
					},
				}}
			>
				<Chats messages={filteredMessages} />
			</Box>

			{/* Input Box */}
			<div className="border-t mb-14 bg-gray-200">
				<div className="p-2 pb-4 bg-white border-t flex items-center">
					<IconButton className="text-gray-500">
						<CameraAltIcon className="text-gray-800" />
					</IconButton>

					<IconButton>
						<EmojiEmotionsRoundedIcon className="text-orange-400" />
					</IconButton>

					<IconButton>
						<AttachFileRoundedIcon className="text-gray-700" />
					</IconButton>

					<TextField label="Outlined" className="w-full rounded" />

					<IconButton>
						<SendRoundedIcon className="text-blue-500" />
					</IconButton>
				</div>
			</div>

			{/* Sidebar Drawer */}
			<Drawer
				anchor="right"
				open={isSidebarOpen}
				onClose={toggleSidebar}
				sx={{ width: 250 }}
			>
				<Box
					sx={{
						width: 250,
						padding: 2,
					}}
					role="presentation"
				>
					<List>
						<ListItem button>
							<ListItemText primary="Profile" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Settings" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Help" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Logout" />
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</div>
	);
};

export default Inbox;
