import React, { useState, useMemo } from 'react';
import moment from 'moment';
import { FaCheckCircle } from 'react-icons/fa'; // Import an icon for highlighting selected slot
import { useGetAllActiveTimeSlotsQuery } from '../../../../../features/metings/timeSlotAPI';
import { useGetUserByDepartmentAndRoleQuery } from '../../../../../features/auth/authAPI';
import { useGetMeetingByDateRangeQuery } from '../../../../../features/meeting/meetinApi';
import DateSelector from '../../../../meeting/DateSelector';

// SalesTeamColumn Component: Displaying the sales team members
const SalesTeamColumn = ({ salespeople }) => (
	<div className="flex flex-col text-center w-[100px] bg-gray-100">
		<div className="font-bold border border-gray-200 text-xs p-1">
			Sales Team
		</div>
		{salespeople.map(({ id, name, profilePicture }) => (
			<div
				key={id}
				className="text-center font-bold h-28 bg-gray-50 border border-gray-200"
			>
				<div className="flex items-center justify-center h-full">
					<img
						src={profilePicture}
						alt={name}
						className="w-8 h-8 rounded-full mr-1"
					/>
					<span className="text-xs">{name}</span>
				</div>
			</div>
		))}
	</div>
);

// TimeSlotsHeader Component: Displaying the available time slots
const TimeSlotsHeader = ({ timeSlots }) => (
	<>
		{timeSlots.map((slot, index) => (
			<div
				key={index}
				className="text-center font-bold bg-gray-50 border border-gray-200 text-xs p-1"
			>
				{slot}
			</div>
		))}
	</>
);

// MeetingSlotsGrid Component: Creating the grid for time slots and sales team members
const MeetingSlotsGrid = ({
	timeSlots,
	salespeople,
	visibleMeetings,
	selectedSlot,
	onSelectEmptySlot,
}) => {
	const isStartOfMeeting = (salesExecutiveId, currentSlot) => {
		return visibleMeetings.some(
			m => m.salesExecutive._id === salesExecutiveId && m.slot === currentSlot
		);
	};

	return (
		<div
			className="flex-1 min-w-max grid"
			style={{
				gridTemplateColumns: `repeat(${timeSlots.length}, minmax(80px, 1fr))`,
			}}
		>
			<TimeSlotsHeader timeSlots={timeSlots} />
			{salespeople
				.filter(salesperson => salesperson && salesperson.id)
				.map(({ id }) => {
					let skipNext = false; // Flag to skip the next slot if it's part of a two-slot meeting
					return (
						<React.Fragment key={id}>
							{timeSlots.map((slot, index) => {
								// Check if we need to skip this slot
								if (skipNext) {
									skipNext = false; // Reset the flag
									return null; // Skip rendering this slot
								}

								const meeting = visibleMeetings.find(
									m => m.salesExecutive._id === id && m.slot === slot
								);
								const isOccupied = !!meeting;
								const isSelected =
									selectedSlot &&
									selectedSlot.salesExecutiveId === id &&
									selectedSlot.slot === slot;
								const isSelectable =
									!isOccupied && !isStartOfMeeting(id, timeSlots[index + 1]);

								// If the current slot is part of a two-slot meeting, set flag to skip the next slot
								if (isOccupied && index < timeSlots.length - 1) {
									skipNext = true;
									return (
										<div
											key={`${id}-${slot}`}
											className={`border border-gray-200 h-28 relative text-xs ${
												isOccupied
													? 'bg-gray-50'
													: isSelected
													? 'bg-blue-200'
													: isSelectable
													? 'bg-blue-100'
													: 'bg-white'
											}`}
											onClick={() =>
												isSelectable && onSelectEmptySlot(id, slot)
											}
											style={{
												gridColumn: `span 2`, // Occupy two slots
												cursor: isSelectable ? 'pointer' : 'default',
											}}
										>
											{isOccupied && (
												<div className="absolute inset-0 p-1 bg-blue-200 text-xs">
													<div className="flex flex-col h-full justify-between">
														<div>
															<div className="text-[10px] mt-1 font-semibold">
																{meeting.lead.name}
															</div>
															{meeting.lead?.phone && (
																<div className="text-[10px] mt-1">
																	{meeting.lead.phone.join(', ')}
																</div>
															)}
															{meeting.lead?.address && (
																<div className="text-[10px] mt-1">
																	{meeting.lead.address.area}
																</div>
															)}
														</div>
													</div>
												</div>
											)}
											{/* Display an icon if the slot is selected */}
											{isSelected && (
												<div className="absolute top-1 right-1">
													<FaCheckCircle className="text-green-500 w-4 h-4" />
												</div>
											)}
										</div>
									);
								}

								return (
									<div
										key={`${id}-${slot}`}
										className={`border border-gray-200 h-28 relative text-xs ${
											isOccupied
												? 'bg-gray-50'
												: isSelected
												? 'bg-blue-200'
												: isSelectable
												? 'bg-blue-100'
												: 'bg-white'
										}`}
										onClick={() => isSelectable && onSelectEmptySlot(id, slot)}
										style={{
											cursor: isSelectable ? 'pointer' : 'default',
										}}
									>
										{/* Display an icon if the slot is selected */}
										{isSelected && (
											<div className="absolute top-1 right-1">
												<FaCheckCircle className="text-green-500 w-4 h-4" />
											</div>
										)}
									</div>
								);
							})}
						</React.Fragment>
					);
				})}
		</div>
	);
};

// Main SimplifiedMeetingsSlot Component
const SimplifiedMeetingsSlot: React.FC<{
	onSlotSelect: (selectedSlot: {
		slot: string;
		salesExecutiveId: string;
		date: string;
	}) => void;
}> = ({ onSlotSelect }) => {
	const { data: timeSlotData } = useGetAllActiveTimeSlotsQuery();
	const { data: salesData } = useGetUserByDepartmentAndRoleQuery({
		departmentName: 'Sales',
	});

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedSlot, setSelectedSlot] = useState<{
		slot: string;
		salesExecutiveId: string;
	} | null>(null);

	// format the selected date
	const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

	const { data: meetingData } = useGetMeetingByDateRangeQuery(
		{
			startDate: formattedDate,
			endDate: formattedDate,
		},
		{ skip: !formattedDate }
	);

	// Extracting time slots and salespeople data
	const timeSlots = timeSlotData?.map(t => t.slot) || [];
	const salespeople =
		salesData?.map(s => ({
			id: s._id,
			name: s.nickname,
			profilePicture: s.profilePicture,
		})) || [];

	// Filter meetings based on the selected date
	const visibleMeetings = useMemo(
		() =>
			(meetingData || []).filter(meeting =>
				moment(meeting.date).isSame(selectedDate, 'day')
			),
		[selectedDate, meetingData]
	);

	// Handle empty slot selection
	const onSelectEmptySlot = (salesExecutiveId: string, slot: string) => {
		console.log(salesExecutiveId, slot, formattedDate);
		setSelectedSlot({ slot, salesExecutiveId });
		onSlotSelect({ slot, salesExecutiveId, date: formattedDate });
	};

	return (
		<div className="w-full">
			<DateSelector
				selectedDate={selectedDate}
				onDateChange={setSelectedDate}
			/>
			<div className="overflow-x-auto scrollbar-thin">
				<div className="min-w-max flex">
					<SalesTeamColumn salespeople={salespeople} />
					<MeetingSlotsGrid
						timeSlots={timeSlots}
						salespeople={salespeople}
						visibleMeetings={visibleMeetings}
						selectedSlot={selectedSlot}
						onSelectEmptySlot={onSelectEmptySlot}
					/>
				</div>
			</div>
		</div>
	);
};

export default SimplifiedMeetingsSlot;
