import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface WeeklyMeetingCardProps {
	filter: {
		timeLength: string;
		mode: string;
	};
	setFilter: React.Dispatch<
		React.SetStateAction<{
			timeLength: string;
			mode: string;
		}>
	>;
	meetingsData: { day: string; value: number }[] | undefined;
}

const WeeklyMeetingCard: React.FC<WeeklyMeetingCardProps> = ({
	filter,
	setFilter,
	meetingsData,
}) => {
	const handleTimeLengthChange = (timeLength: string) => {
		setFilter(prevFilter => ({ ...prevFilter, timeLength }));
	};

	const handleModeChange = (mode: string) => {
		setFilter(prevFilter => ({ ...prevFilter, mode }));
	};

	return (
		<Box className="w-full flex-1 h-48 p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={2}
			>
				<Typography variant="h6" fontWeight="bold">
					{filter.timeLength === 'week'
						? 'Weekly Meetings'
						: 'Monthly Meetings'}
				</Typography>
				<Box display="flex" gap={1}>
					{['team', 'own'].map(mode => (
						<button
							key={mode}
							onClick={() => handleModeChange(mode)}
							className={`px-2 py-1 text-xs font-medium rounded ${
								filter.mode === mode
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}`}
						>
							{mode.charAt(0).toUpperCase() + mode.slice(1)}
						</button>
					))}
					{['month', 'week'].map(length => (
						<button
							key={length}
							onClick={() => handleTimeLengthChange(length)}
							className={`px-2 py-1 text-xs font-medium rounded ${
								filter.timeLength === length
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 text-gray-700'
							}`}
						>
							{length.charAt(0).toUpperCase() + length.slice(1)}
						</button>
					))}
				</Box>
			</Box>

			<BarChart
				slotProps={{ legend: { hidden: true } }}
				dataset={meetingsData || []}
				xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
				series={[
					{ dataKey: 'value', label: 'Meetings Count', color: '#4CAF50' },
				]}
				// height={200}
			/>
		</Box>
	);
};

export default WeeklyMeetingCard;
