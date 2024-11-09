import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TextField, IconButton } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface DateSelectorProps {
	selectedDate: Date;
	onDateChange: (newDate: Date) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
	selectedDate,
	onDateChange,
}) => {
	const handlePrevDate = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() - 1);
		onDateChange(newDate);
	};

	const handleNextDate = () => {
		const newDate = new Date(selectedDate);
		newDate.setDate(newDate.getDate() + 1);
		onDateChange(newDate);
	};

	return (
		<div className="flex items-center justify-between p-4 bg-white border-b">
			<div className="flex items-center gap-4">
				<IconButton onClick={handlePrevDate} className="hover:bg-gray-100">
					<FaChevronLeft className="w-5 h-5" />
				</IconButton>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						value={dayjs(selectedDate)} // Convert Date to dayjs instance
						onChange={newValue => {
							if (newValue) {
								onDateChange(new Date(newValue.toDate())); // Convert back to JavaScript Date
							}
						}}
						renderInput={params => <TextField {...params} fullWidth />}
					/>
				</LocalizationProvider>
				<IconButton onClick={handleNextDate} className="hover:bg-gray-100">
					<FaChevronRight className="w-5 h-5" />
				</IconButton>
			</div>
		</div>
	);
};

export default DateSelector;
