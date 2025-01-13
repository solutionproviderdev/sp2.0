import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Datepicker from 'react-tailwindcss-datepicker';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetDateWiseLeadDataQuery } from '../../features/dashboard/dashboardAPI';
import dayjs from 'dayjs';

const DateWiseLeadDataCard: React.FC = () => {
	const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
	const today = dayjs().format('YYYY-MM-DD');
	const [dateRange, setDateRange] = useState<{
		startDate: string | null;
		endDate: string | null;
	}>({
		// initial data should be this month
		startDate: firstDayOfMonth,
		endDate: today,
	});

	const { startDate, endDate } = dateRange;

	const { data: leadData, isLoading } = useGetDateWiseLeadDataQuery(
		startDate && endDate
			? { startDate, endDate }
			: { startDate: '', endDate: '' },
		{
			skip: !startDate || !endDate, // Skip query if no date range is selected
		}
	);

	const handleDateChange = (value: {
		startDate: string | null;
		endDate: string | null;
	}) => {
		setDateRange(value);
	};

	return (
		<Box className="w-full p-4 border rounded-lg shadow-sm bg-white flex flex-col">
			<div className="flex items-center justify-between">
				<Typography variant="h6" fontWeight="bold" color="textPrimary" mb={2}>
					Leads Each Day
				</Typography>
				<div className="border border-gray-400 rounded-md">
					<Datepicker
						value={dateRange}
						onChange={handleDateChange}
						showShortcuts={true}
						primaryColor="blue"
						placeholder="Select date range"
					/>
				</div>
			</div>
			{isLoading ? (
				<Typography variant="body1" color="textSecondary" mt={4}>
					Loading data...
				</Typography>
			) : (
				leadData && (
					<BarChart
						dataset={leadData.map(data => ({
							date: dayjs(data.date).format('MMMM Do, dddd'),
							leads: data.leads,
							numberCollected: data.numberCollected,
							meetingsFixed: data.meetingsFixed,
							meetingsCompleted: data.meetingsCompleted,
							meetingsSold: data.meetingsSold,
						}))}
						xAxis={[{ scaleType: 'band', dataKey: 'date', label: 'Date' }]}
						series={[
							{
								dataKey: 'leads',
								label: 'Leads',
								color: '#4CAF50',
								stack: 'total', // Stack identifier
							},
							{
								dataKey: 'numberCollected',
								label: 'Numbers Collected',
								color: '#2196F3',
								stack: 'total', // Stack identifier
							},
							{
								dataKey: 'meetingsFixed',
								label: 'Meetings Fixed',
								color: '#FF9800',
								stack: 'total', // Stack identifier
							},
							{
								dataKey: 'meetingsCompleted',
								label: 'Meetings Completed',
								color: '#8BC34A',
								stack: 'total', // Stack identifier
							},
							{
								dataKey: 'meetingsSold',
								label: 'Sold',
								color: '#F44336',
								stack: 'total', // Stack identifier
							},
						]}
						height={300}
						sx={{
							'.MuiChart-bar': { borderRadius: '4px' },
						}}
						slotProps={{
							legend: {
								hidden: true,
							},
						}}
					/>
				)
			)}
		</Box>
	);
};

export default DateWiseLeadDataCard;
