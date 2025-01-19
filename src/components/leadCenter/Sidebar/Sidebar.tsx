import React from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import Requirements from './Requirements';
import Reminders from './Reminders';
import PhoneNumbers from './PhoneNumbers';
import CallLogs from './CallLogs';
import Comments from './Comments';
import AddressCard from './Locations';
import ProjectStatus from './ProjectStatus';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import AssignLead from './AssignLead';
import { Lead } from '../../../features/lead/leadAPI';

interface SidebarProps {
	leadId: string;
	isOpen: boolean;
	lead: Lead;
	onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ leadId, lead, isOpen, onClose }) => {
	const { user } = useSelector((state: RootState) => state.auth);
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

				{user?.type === 'Admin' && lead?.creName && (
					<AssignLead leadID={leadId} currentCREId={lead.creName} />
				)}

				{lead?.phone && (
					<PhoneNumbers leadId={leadId} phoneNumbers={lead.phone} />
				)}
				<AddressCard leadId={leadId} address={lead?.address} />
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
				{leadId && <Comments leadId={leadId} />}
			</Box>
		</Drawer>
	);
};

export default Sidebar;
