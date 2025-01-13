// AllCREPerformanceCard.js
import React from 'react';
import { Typography, Box, Divider, Avatar } from '@mui/material';
import { BarChart, Tooltip } from '@mui/x-charts/BarChart';

const AllCREPerformanceCard = ({ allCREsData }) => {
	// Process data for the chart
	const chartData = allCREsData.map(cre => ({
		id: cre.id,
		name: cre.name,
		...cre.performanceMetrics,
	}));

	console.log(allCREsData[0]);

	return (
		<div className="w-full border rounded-lg p-4 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
			<Typography variant="h6" fontWeight="bold" color="textPrimary" mb={2}>
				All CRE Performance Data
			</Typography>
			<Divider sx={{ my: 2 }} />
			<Box display="flex" justifyContent="space-between" alignItems="start">
				<Box flex={1} mr={4}>
					{allCREsData.map(cre => (
						<Box
							key={cre.id}
							mb={3}
							sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
						>
							{/* Header Section with Avatar and Name */}
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<Avatar
									src={cre.profilePictureUrl}
									alt={cre.name}
									sx={{ width: 48, height: 48 }}
								/>
								<Box>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
										color="primary"
									>
										{cre.name}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{cre.role.roleName} - {cre.role.departmentName}
									</Typography>
								</Box>
							</Box>

							{/* Performance Bar Section */}
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 2,
									mt: 1,
									width: '100%',
								}}
							>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ minWidth: '120px' }}
								>
									Overall Performance
								</Typography>
								<Box
									sx={{
										flex: 1,
										height: '8px',
										bgcolor: 'grey.200',
										borderRadius: '4px',
										overflow: 'hidden',
									}}
								>
									<Box
										sx={{
											width: `${Math.round(
												cre.barChartData[cre.barChartData.length - 1].value
											)}%`,
											height: '100%',
											bgcolor: 'success.main',
											transition: 'all 0.3s ease',
										}}
									/>
								</Box>
								<Typography
									variant="body2"
									fontWeight="bold"
									sx={{ minWidth: '45px' }}
								>
									{Math.round(
										cre.barChartData[cre.barChartData.length - 1].value
									)}
									%
								</Typography>
							</Box>
						</Box>
					))}
				</Box>
				<Box flex={2} height={300}>
					<BarChart
						dataset={chartData}
						xAxis={[{ scaleType: 'band', dataKey: 'name' }]}
						series={[
							{ dataKey: 'assigned', label: 'Assigned' },
							{ dataKey: 'numberCollected', label: 'Number Collected' },
							{ dataKey: 'meetingsSet', label: 'Meetings Set' },
							{ dataKey: 'meetingsCompleted', label: 'Meetings Completed' },
							{ dataKey: 'totalSales', label: 'Total Sales' },
							{ dataKey: 'target', label: 'Target' },
						]}
						sx={{ '.MuiChart-bar': { borderRadius: '4px' } }}
						slotProps={{
							legend: {
								hidden: true,
							},
						}}
						height={300}
					>
						{/* <Tooltip /> */}
					</BarChart>
				</Box>
			</Box>
		</div>
	);
};

export default AllCREPerformanceCard;
