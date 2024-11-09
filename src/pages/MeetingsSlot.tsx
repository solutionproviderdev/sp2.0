import React, { useState, useMemo } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import DateSelector from '../components/meeting/DateSelector';
import DraggableItem from '../components/meeting/DraggableItem';
import DroppableSlot from '../components/meeting/DroppableSlot';
import { useGetAllActiveTimeSlotsQuery } from '../features/metings/timeSlotAPI';
import { useGetUserByDepartmentAndRoleQuery } from '../features/auth/authAPI';
import {
	useGetMeetingByDateRangeQuery,
	useReassignOrSwapMeetingMutation,
} from '../features/meeting/meetinApi';
import moment from 'moment';

// SalesTeamColumn Component: Displaying the sales team members
const SalesTeamColumn = ({ salespeople }) => (
	<div className="flex flex-col text-center w-[150px] bg-gray-100">
		<div className="font-bold border border-gray-200">Sales Team</div>
		{salespeople.map(({ id, name, profilePicture }) => (
			<div
				key={id}
				className="text-center font-bold h-40 bg-gray-50 border border-gray-200"
			>
				<div className="flex items-center justify-center h-full">
					<img
						src={profilePicture}
						alt={name}
						className="w-10 h-10 rounded-full mr-2"
					/>
					{name}
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
				className="text-center font-bold bg-gray-50 border border-gray-200"
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
	renderSlots,
	onDragStart,
	onDragEnd,
}) => {
	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
		>
			<SortableContext items={visibleMeetings.map(m => m._id.toString())}>
				<div
					className="flex-1 min-w-max grid"
					style={{
						gridTemplateColumns: `repeat(${timeSlots.length}, minmax(150px, 1fr))`,
					}}
				>
					<TimeSlotsHeader timeSlots={timeSlots} />
					{salespeople.map(({ id }) => (
						<React.Fragment key={id}>{renderSlots(id)}</React.Fragment>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
};

// Main MeetingsSlot Component
const MeetingsSlot: React.FC = () => {
	const { data: timeSlotData } = useGetAllActiveTimeSlotsQuery();
	const { data: salesData } = useGetUserByDepartmentAndRoleQuery({
		departmentName: 'Sales',
	});

	const [selectedDate, setSelectedDate] = useState(new Date());

	// format the selected date
	const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

	const { data: meetingData } = useGetMeetingByDateRangeQuery(
		{
			startDate: formattedDate,
			endDate: formattedDate,
		},
		{ skip: !formattedDate }
	);

	// console.log('Meetings', meetingData);

	const [reassignOrSwapMeeting] = useReassignOrSwapMeetingMutation();

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

	// console.log('Visible Meetings:', visibleMeetings);

	// Helper function to check if a meeting can expand to two time slots
	const canExpandToTwoSlots = (memberId: string, time: string) => {
		const timeIndex = timeSlots.indexOf(time);
		if (timeIndex === timeSlots.length - 1) return false;
		const nextSlotTime = timeSlots[timeIndex + 1];
		return !visibleMeetings.some(
			m => m.salesExecutive._id === memberId && m.slot === nextSlotTime
		);
	};

	// Handle updates when a meeting is dragged to a new slot
	const updateMeetingsAfterDrag = (
		draggedMeetingId: string,
		newTeamMemberId: string,
		newTime: string
	) => {
		// Update your meeting via your API if necessary or handle the drag logic here
		try {
			reassignOrSwapMeeting({
				id: draggedMeetingId,
				newSalesExecutiveId: newTeamMemberId,
				newSlot: newTime,
			});
		} catch (error) {
			console.error('Error updating meeting:', error);
		}
	};

	// Event handler for drag start
	const onDragStart = (event: any) => {
		// Handle drag start if needed
		// console.log('Drag started:', event.active.id);
	};

	// Event handler for drag end
	const onDragEnd = ({ active, over }: any) => {
		if (!over) return;
		const draggedMeetingId = active.id;
		const [newTeamMemberId, newTime] = over.id.split('-');
		updateMeetingsAfterDrag(draggedMeetingId, newTeamMemberId, newTime);
	};

	// Rendering the slots for each sales team member
	const renderSlots = (memberId: string) => {
		return timeSlots.map((slot, index) => {
			const meeting = visibleMeetings.find(
				m => m.salesExecutive._id === memberId && m.slot === slot
			);
			const isOccupied = !!meeting;
			const canExpand = meeting && canExpandToTwoSlots(memberId, slot);
			const prevSlotMeeting = visibleMeetings.find(
				m =>
					m.salesExecutive._id === memberId &&
					m.slot === timeSlots[index - 1] &&
					canExpandToTwoSlots(memberId, timeSlots[index - 1])
			);

			return (
				<DroppableSlot
					key={`${memberId}-${slot}`}
					id={`${memberId}-${slot}`}
					isOccupied={isOccupied}
					isSecondSlot={!!prevSlotMeeting}
				>
					{meeting && (
						<DraggableItem
							id={meeting._id}
							meeting={meeting}
							isDragging={false}
							canExpandToTwoSlots={canExpand}
						/>
					)}
				</DroppableSlot>
			);
		});
	};

	return (
		<div className="w-full">
			<DateSelector
				selectedDate={selectedDate}
				onDateChange={setSelectedDate}
			/>
			<div className="overflow-x-auto">
				<div className="min-w-max flex">
					<SalesTeamColumn salespeople={salespeople} />
					<MeetingSlotsGrid
						timeSlots={timeSlots}
						salespeople={salespeople}
						visibleMeetings={visibleMeetings}
						renderSlots={renderSlots}
						onDragStart={onDragStart}
						onDragEnd={onDragEnd}
					/>
				</div>
			</div>
		</div>
	);
};

export default MeetingsSlot;
