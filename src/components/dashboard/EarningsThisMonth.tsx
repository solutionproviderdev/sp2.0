import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const EarningsThisMonth: React.FC = () => {
	const earningsData = [
		{ label: '0-1', value: 700 },
		{ label: '1+', value: 1600 },
	];
	const totalEarnings = earningsData.reduce((acc, item) => acc + item.value, 0);

	return (
		<Box className="w-full h-48 flex-1 p-4 border rounded-lg shadow-sm bg-white flex items-start justify-between">
			{/* Left Side: Title and Total Earnings */}
			<Box className="flex flex-col justify-between mr-4">
				<Typography variant="h6" fontWeight="bold">
					Earnings This Month
				</Typography>
				<Typography variant="h4" fontWeight="bold" color="primary">
					${totalEarnings}
				</Typography>
			</Box>

			{/* Right Side: Bar Chart */}
			<Box className="flex-1 h-full">
				<BarChart
					slotProps={{ legend: { hidden: true } }}
					dataset={earningsData}
					xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
					series={[{ dataKey: 'value', label: 'Earnings', color: '#4CAF50' }]}
					height={150}
				/>
			</Box>
		</Box>
	);
};

export default EarningsThisMonth;
