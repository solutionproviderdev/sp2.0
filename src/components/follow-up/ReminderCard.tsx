import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Lead } from '../../features/lead/leadAPI';
import dayjs from 'dayjs';

interface ReminderCardProps {
	reminder: Lead;
}

const getStatusColor = (status: string) => {
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

	// Format the time and date
	const formattedDate = dayjs(latestReminder.time).format('MMMM D, YYYY');
	const formattedTime = dayjs(latestReminder.time).format('h:mm A');

	return (
		<Card className="border-2 border-gray-300 rounded-lg shadow-lg w-full p-4">
			<CardContent>
				{/* Top Section: status, lead Status, and project status */}
				<div className="flex justify-between items-center mb-4">
					{/* Lead Status Chip */}
					<Chip
						label={reminder.status}
						color="info"
						className="text-sm font-bold"
						sx={{ backgroundColor: '#e0f7fa', color: '#00796b' }}
					/>

					{/* Project Status Chip */}
					{reminder.projectStatus && (
						<Chip
							label={reminder.projectStatus.status}
							color="primary"
							className="text-sm font-bold"
							sx={{ backgroundColor: '#e3f2fd', color: '#0d47a1' }}
						/>
					)}

					{/* Latest Reminder Status Chip */}
					<Chip
						label={latestReminder.status}
						color={getStatusColor(latestReminder.status)}
						className="text-sm font-bold"
					/>
				</div>

				<div className="flex justify-between items-start mb-4">
					{/* Middle Section: User Info */}
					<div className="">
						<Typography variant="h6" className="font-bold">
							{reminder.name}
						</Typography>

						{/* Displaying one phone number with an icon if there are more */}
						<div className="flex items-center space-x-2 mb-2">
							<PhoneIcon sx={{ color: '#4caf50' }} />
							<Typography variant="body1">{reminder.phone[0]}</Typography>
							{reminder.phone.length > 1 && (
								<MoreHorizIcon sx={{ color: '#757575' }} />
							)}
						</div>

						{/* Displaying address with icon */}
						{reminder.address && (
							<div className="flex items-center space-x-2">
								<HomeIcon sx={{ color: '#1976d2' }} />
								<Typography variant="body1">
									{`${reminder.address.address}, ${reminder.address.area}, ${reminder.address.district}, ${reminder.address.division}`}
								</Typography>
							</div>
						)}
					</div>

					{/* Latest Reminder Time and Date with Icons */}
					<div className="flex flex-col items-end space-x-4">
						{/* Date Icon and Text */}
						<div className="flex items-center space-x-1">
							<CalendarTodayIcon sx={{ color: '#ff9800' }} />
							<Typography variant="body2" className="text-gray-600 whitespace-nowrap">
								{formattedDate}
							</Typography>
						</div>
						{/* Time Icon and Text */}
						<div className="flex items-center space-x-1">
							<AccessTimeIcon sx={{ color: '#00bcd4' }} />
							<Typography variant="body2" className="text-gray-600">
								{formattedTime}
							</Typography>
						</div>
					</div>
				</div>

				{/* Room Options (Requirements) */}
				<div className="flex space-x-2 mb-4">
					{reminder.requirements.length > 0 ? (
						reminder.requirements.map((room, index) => (
							<Chip
								key={index}
								label={room}
								color="secondary"
								className="text-sm font-bold"
								sx={{ backgroundColor: '#fce4ec', color: '#d81b60' }}
							/>
						))
					) : (
						<Typography variant="body2" color="textSecondary">
							No specific requirements
						</Typography>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ReminderCard;
