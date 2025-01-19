import { Typography } from '@mui/material';
import PhoneNumbers from './Sidebar/PhoneNumbers';
import AddressCard from './Sidebar/Locations';
import Requirements from './Sidebar/Requirements';
import ProjectStatus from './Sidebar/ProjectStatus';
import Reminders from './Sidebar/Reminders';
import CallLogs from './Sidebar/CallLogs';

export default function LeadDetails({ lead, leadId }) {
	return (
		<div className="max-h-[91vh] overflow-y-scroll scrollbar-none ">
			<Typography variant="h6" className="text-center">
				Lead Details
			</Typography>

			{/* Phone Numbers */}
			{lead?.phone && (
				<PhoneNumbers leadId={leadId} phoneNumbers={lead?.phone} />
			)}

			{/* Address */}
			<AddressCard leadId={leadId} address={lead?.address} />

			{/* Requirements */}
			{lead?.requirements && (
				<Requirements leadId={leadId} requirements={lead?.requirements} />
			)}

			{/* Project Status */}
			{lead?.projectStatus && (
				<ProjectStatus leadId={leadId} projectStatus={lead?.projectStatus} />
			)}

			{/* Reminders */}
			{lead?.reminder && (
				<Reminders leadId={leadId} leadReminders={lead?.reminder} />
			)}

			{/* Call Logs */}
			{lead?.callLogs && (
				<CallLogs leadId={leadId} leadCallLogs={lead?.callLogs} />
			)}
		</div>
	);
}
