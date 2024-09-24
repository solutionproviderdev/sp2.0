import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Drawer, Typography, Divider } from '@mui/material';
import { useGetSingleLeadQuery } from '../../../features/conversation/conversationApi';
import Requirements from './Requirements';
import Reminders from './Reminders';
import PhoneNumbers from './PhoneNumbers';
import Locations from './Locations';
import CallLogs from './CallLogs';
import Comments from './Comments';
import AddressCard from './Locations';

interface Conversation {
	id: number;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	status?: string;
}

interface SidebarProps {
	conversation: Conversation | null;
	isOpen: boolean;
	onClose: () => void;
}

interface FormValues {
	newNumber: string;
}

const Sidebar: React.FC<SidebarProps> = ({ conversation, isOpen, onClose }) => {
	const { control, reset } = useForm<FormValues>({
		defaultValues: { newNumber: '' },
	});

	const { data } = useGetSingleLeadQuery(conversation?._id ?? '');

	const handleSidebarClick = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			<Box
				sx={{ width: 400, padding: 2 }}
				role="presentation"
				onClick={handleSidebarClick}
			>
				<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
					{data?.name}
				</Typography>

				{/* Phone Numbers Section */}
				<PhoneNumbers leadId={conversation?._id} phoneNumbers={data?.phone} />
				<Divider />

				{/* Location Section */}
				<AddressCard leadId={conversation?._id} address={data?.address} />
				<Divider />

				{/* Requirements Section */}
				<Requirements conversation={conversation?._id} />
				<Divider />

				{/* Reminders Section */}
				<Reminders conversation={conversation?._id} />
				<Divider />

				{/* Call Logs Section */}
				<CallLogs conversation={conversation?._id} />
				<Divider />

				{/* Comments Section */}
				<Comments conversation={conversation?._id} />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
