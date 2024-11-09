import React from 'react';
import { Box, Typography } from '@mui/material';

interface Notification {
	label: string;
	count: number;
}

interface NotificationCardProps {
	notifications: Notification[] | undefined;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
	notifications,
}) => {
	return (
		<Box className="w-full h-48 max-w-md p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between">
			<Typography variant="h6" fontWeight="bold" mb={2}>
				Notifications
			</Typography>
			<Box>
				{notifications ? (
					notifications.map((item, index) => (
						<Box
							key={index}
							display="flex"
							justifyContent="space-between"
							className={
								item.label === 'Missed Reminders'
									? 'text-red-600 font-semibold'
									: 'text-gray-600'
							}
						>
							<Typography variant="body2">{item.label}</Typography>
							<Typography variant="body2" fontWeight="bold">
								{item.count}
							</Typography>
						</Box>
					))
				) : (
					<Typography variant="body2" color="textSecondary">
						Loading notifications...
					</Typography>
				)}
			</Box>
		</Box>
	);
};

export default NotificationCard;
