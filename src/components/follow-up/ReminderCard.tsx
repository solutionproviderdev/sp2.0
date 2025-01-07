import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	Box,
	Stack,
	Chip,
	Avatar,
	Divider,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Lead } from '../../features/lead/leadAPI';
import dayjs from 'dayjs';

interface ReminderCardProps {
	reminder: Lead;
}

const getStatusColor = (status: string): string => {
	switch (status) {
		case 'Pending':
			return 'warning';
		case 'Complete':
			return 'success';
		case 'Missed':
			return 'error';
		default:
			return 'default';
	}
};

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder }) => {
	const latestReminder = reminder.reminder[reminder.reminder.length - 1];
	const lastComment =
		reminder.comment?.length > 0
			? reminder.comment[reminder.comment.length - 1]
			: null;

	// Format the time and date
	const formattedDate = dayjs(latestReminder.time).format('MMMM D, YYYY');
	const formattedTime = dayjs(latestReminder.time).format('h:mm A');

	// Format the last comment timestamp
	const commentTimestamp = lastComment
		? dayjs(lastComment.createdAt).format('MMMM D, YYYY h:mm A')
		: null;

	return (
		<Card
			sx={{
				border: '1px solid #E0E0E0',
				borderRadius: '8px',
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
			}}
		>
			<CardContent>
				<Box display="flex" justifyContent="space-between" mb={2}>
					{/* Lead Status on the left */}
					<Chip label={reminder.status} color="primary" variant="outlined" />
					{/* Reminder Status on the right */}
					<Chip
						label={latestReminder.status}
						color={getStatusColor(latestReminder.status)}
						variant="filled"
					/>
				</Box>
				<Box mb={2} className="flex items-center justify-between">
					<Typography variant="h6" fontWeight="bold">
						{reminder.name}
					</Typography>
					<Typography variant="caption" sx={{ color: 'text.secondary' }}>
						{`${formattedDate} • ${formattedTime}`}
					</Typography>
				</Box>
				<Stack direction="row" alignItems="center" mb={2}>
					<PhoneIcon sx={{ color: '#2196F3', mr: 1 }} />
					<Typography variant="body2">{reminder.phone.join(', ')}</Typography>
				</Stack>
				{reminder.address && (
					<Stack direction="row" alignItems="center" mb={2}>
						<HomeIcon sx={{ color: '#757575', mr: 1 }} />
						<Typography variant="body2">
							{`${reminder.address.address}, ${reminder.address.area}, ${reminder.address.district}, ${reminder.address.division}`}
						</Typography>
					</Stack>
				)}
				{lastComment && (
					<Box mb={2}>
						<Stack direction="row" alignItems="center" spacing={1} mb={1}>
							{/* Commenter's Avatar */}
							<Avatar
								src={lastComment.commentBy.profilePicture}
								alt={lastComment.commentBy.nameAsPerNID}
								sx={{ width: 24, height: 24 }}
							/>
							{/* Commenter's Name */}
							<Typography variant="subtitle2" fontWeight="bold">
								{lastComment.commentBy.nameAsPerNID}
							</Typography>
							{/* Comment Timestamp */}
							<Typography variant="caption" color="textSecondary">
								{commentTimestamp}
							</Typography>
						</Stack>
						{/* Comment Text */}
						<Typography variant="body2" sx={{ ml: 4 }}>
							{lastComment.comment}
						</Typography>
					</Box>
				)}
			</CardContent>
		</Card>
	);
};

export default ReminderCard;
