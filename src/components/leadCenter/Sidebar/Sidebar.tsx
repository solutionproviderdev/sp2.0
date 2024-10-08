import React from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import Requirements from './Requirements';
import Reminders from './Reminders';
import PhoneNumbers from './PhoneNumbers';
import CallLogs from './CallLogs';
import Comments from './Comments';
import AddressCard from './Locations';
import ProjectStatus from './ProjectStatus';

interface SidebarProps {
	leadId: string | undefined;
	isOpen: boolean;
	lead: any;
	onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ leadId, lead, isOpen, onClose }) => {
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

				{lead?.phone && (
					<PhoneNumbers leadId={leadId} phoneNumbers={lead.phone} />
				)}
				<AddressCard leadId={leadId} address={lead.address} />
				{lead?.requirements && (
					<Requirements leadId={leadId} requirements={lead.requirements} />
				)}
				{lead?.projectStatus && (
					<ProjectStatus leadId={leadId} projectStatus={lead.projectStatus} />
				)}
				{lead?.reminder && (
					<Reminders leadId={leadId} leadReminders={lead.reminder} />
				)}
				{lead?.callLogs && (
					<CallLogs leadId={leadId} leadCallLogs={lead.callLogs} />
				)}
				<Comments leadId={leadId} />
			</Box>
		</Drawer>
	);
};

export default Sidebar;
