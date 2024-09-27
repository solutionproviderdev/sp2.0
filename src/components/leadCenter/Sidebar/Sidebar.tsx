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
	lead: any;
	onClose: () => void;
}

interface FormValues {
	newNumber: string;
}

const Sidebar: React.FC<SidebarProps> = ({ leadId, lead, isOpen, onClose }) => {
	// const { lead } = useGetSingleLeadQuery(leadId ?? '');

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
					{lead?.name}
				</Typography>

				{/* Phone Numbers Section */}
				<PhoneNumbers leadId={leadId} phoneNumbers={lead?.phone} />
				<Divider />

				{/* Location Section */}
				<AddressCard leadId={leadId} address={lead?.address} />
				<Divider />

				{/* Requirements Section */}
				<Requirements leadId={leadId} />
				<Divider />

				{/* Reminders Section */}
				<Reminders leadId={leadId} leadReminders={lead?.reminder} />
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
