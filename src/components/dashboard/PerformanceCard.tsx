import React from 'react';
import { Typography, Avatar, Box, Divider } from '@mui/material';
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
		};
		barChartData: { label: string; value: number }[];
	};
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ userData }) => {
	const { name, role, profilePictureUrl, performanceMetrics, barChartData } =
		userData;
	const {
		assigned,
		numberCollected,
		meetingsSet,
		meetingsCompleted,
		totalSales,
		target,
	} = performanceMetrics;

	// Get overall performance percentage from barChartData and round it up
	const overallPerformancePercentage = Math.round(
		barChartData.find(item => item.label === 'Complete Performance')?.value || 0
	);

	return (
		<div className="w-full border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
			{/* Header Section */}
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
							style={{ width: `${overallPerformancePercentage}%` }}
							className="h-full bg-green-500 transition-all duration-300"
						/>
					</Box>
					<Typography variant="body2" fontWeight="bold" color="textPrimary">
						{overallPerformancePercentage}%
					</Typography>
				</Box>
			</Box>

			{/* Divider */}
			<Divider sx={{ my: 2 }} />

			{/* Performance Details */}
			<Box display="flex" justifyContent="space-between" alignItems="start">
				{/* Metrics Summary */}
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
						{[
							{ label: 'Assigned', value: assigned },
							{ label: 'Collected Numbers', value: numberCollected },
							{ label: 'Meetings Set', value: meetingsSet },
							{ label: 'Meetings Completed', value: meetingsCompleted },
							{ label: 'Total Sales', value: totalSales },
							{ label: 'Target', value: target },
						].map(metric => (
							<Typography
								key={metric.label}
								variant="body2"
								color="textSecondary"
							>
								{metric.label}: <strong>{metric.value}</strong>
							</Typography>
						))}
					</Box>
				</Box>

				{/* Bar Chart */}
				<Box flex={1} height={200}>
					<BarChart
						dataset={barChartData}
						xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
						series={[
							{ dataKey: 'value', label: '%', color: '#4CAF50' },
						]}
						// height={200}
						sx={{ '.MuiChart-bar': { borderRadius: '4px' } }}
					/>
				</Box>
			</Box>
		</div>
	);
};

export default PerformanceCard;
