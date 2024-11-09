import React, { useState } from 'react';
import { Typography, Avatar, Button, Box, Card, Divider } from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BarChart } from '@mui/x-charts/BarChart';

interface PerformanceCardProps {
	userData: {
		name: string;
		role: { roleName: string; departmentName: string };
		profilePictureUrl?: string;
		performanceMetrics: {
			assigned: number;
			numberCollected: number;
			meetingsSet: number;
			meetingsCompleted: number;
			totalSales: number;
			target: number;
			performancePercentage: number;
		};
	};
}

const getPercentage = (value: number, total: number) => {
	const percentage = (value / total) * 100;
	return percentage.toFixed(2);
};

const PerformanceCard: React.FC<PerformanceCardProps> = ({ userData }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const { name, role, profilePictureUrl, performanceMetrics } = userData;
	const {
		assigned,
		numberCollected,
		meetingsSet,
		meetingsCompleted,
		totalSales,
		target,
		performancePercentage,
	} = performanceMetrics;

	// Toggle expanded view
	const toggleExpand = () => setIsExpanded(!isExpanded);

	// Data for the bar chart
	const barChartData = [
		{
			label: 'Collected Numbers',
			value: getPercentage(numberCollected, assigned),
		},
		{ label: 'Meetings Set', value: getPercentage(meetingsSet, assigned) },
		{
			label: 'Meetings Completed',
			value: getPercentage(meetingsCompleted, meetingsSet),
		},
		{ label: 'Sales', value: getPercentage(totalSales, meetingsCompleted) },
	];

	return (
		<div className="w-full border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
			<Box display="flex" alignItems="center" mb={2}>
				<Avatar
					src={profilePictureUrl}
					alt={name}
					sx={{ width: 64, height: 64, mr: 2 }}
				/>
				<Box>
					<Typography variant="h6" fontWeight="bold" color="textPrimary">
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary">
						{role.roleName} - {role.departmentName}
					</Typography>
				</Box>
				<Box flex={1} display="flex" alignItems="center" ml={4}>
					<Typography variant="body2" color="textSecondary">
						Overall Performance
					</Typography>
					<Box className="w-full h-3 bg-gray-200 rounded-full mx-2 overflow-hidden">
						<Box
							style={{ width: `${performancePercentage}%` }}
							className="h-full bg-green-500 transition-all duration-300"
						/>
					</Box>
					<Typography variant="body2" fontWeight="bold" color="textPrimary">
						{performancePercentage}%
					</Typography>
				</Box>
			</Box>

			<Button
				onClick={toggleExpand}
				startIcon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
				variant="contained"
				size="small"
				sx={{
					mt: 2,
					bgcolor: 'primary.main',
					color: 'white',
					textTransform: 'none',
					fontWeight: 'medium',
					borderRadius: '8px',
				}}
			>
				{isExpanded ? 'Show Less' : 'Show More'}
			</Button>

			{isExpanded && (
				<Box mt={4}>
					{/* Divider between sections */}
					<Divider sx={{ my: 2 }} />
					<Box display="flex" justifyContent="space-between" alignItems="start">
						{/* Left Section: Metrics Summary */}
						<Box flex={1} mr={4}>
							<Typography
								variant="body1"
								fontWeight="medium"
								color="textPrimary"
								mb={1}
							>
								Performance Summary
							</Typography>
							<Box display="flex" flexDirection="column" gap={1}>
								<Typography variant="body2" color="textSecondary">
									Assigned: <strong>{assigned}</strong>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									Collected Numbers: <strong>{numberCollected}</strong>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									Meetings Set: <strong>{meetingsSet}</strong>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									Meetings Completed: <strong>{meetingsCompleted}</strong>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									Total Sales: <strong>{totalSales}</strong>
								</Typography>
								<Typography variant="body2" color="textSecondary">
									Target: <strong>{target}</strong>
								</Typography>
							</Box>
						</Box>

						{/* Right Section: BarChart */}
						<Box flex={1} height={200}>
							<BarChart
								dataset={barChartData}
								xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
								series={[
									{
										dataKey: 'value',
										label: 'Performance %',
										color: '#4CAF50',
									},
								]}
								height={200}
								sx={{
									'.MuiChart-bar': { borderRadius: '4px' },
								}}
							/>
						</Box>
					</Box>
				</Box>
			)}
		</div>
	);
};

export default PerformanceCard;
