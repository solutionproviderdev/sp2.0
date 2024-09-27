import React from 'react';
import { Box, Drawer, Typography, Divider } from '@mui/material';
import { useGetSingleLeadQuery } from '../../../features/conversation/conversationApi';
import Requirements from './Requirements';
import Reminders from './Reminders';
import PhoneNumbers from './PhoneNumbers';
import Locations from './Locations';
import CallLogs from './CallLogs';
import Comments from './Comments';
import AddressCard from './Locations';

interface SidebarProps {
	leadId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

interface FormValues {
	newNumber: string;
}

const Sidebar: React.FC<SidebarProps> = ({ leadId, isOpen, onClose }) => {
	const { data } = useGetSingleLeadQuery(leadId ?? '');

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
				<PhoneNumbers leadId={leadId} phoneNumbers={data?.phone} />
				<Divider />

				{/* Location Section */}
				<AddressCard leadId={leadId} address={data?.address} />
				<Divider />

				{/* Requirements Section */}
				<Requirements leadId={leadId} />
				<Divider />

				{/* Reminders Section */}
				<Reminders leadId={leadId} />
				<Divider />

				{/* Call Logs Section */}
				<CallLogs leadId={leadId} />
				<Divider />

				{/* Comments Section */}
				<Comments leadId={leadId} />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
