

import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    useDraggable,
    useDroppable
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

const DraggableItem = ({ id, meeting }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id
    });
    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    };
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{
                ...style,
                width: 'full',
                height: 'full',
            }}
            className="bg-blue-300 text-black p-4 border-t-4 border-t-blue-400 rounded shadow-lg"
        >
            <p className='text-sm'>{meeting.title}</p>
            <small>{meeting.duration}</small>
        </div>
    );
};


const DroppableSlot = ({ id, children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id
    });

    return (
        <div
            ref={setNodeRef}
            className="border border-gray-200 h-24 relative"
            style={{ width: '100%' }}
        >
            {/* Background that will go behind the content */}
            <div
                className={`absolute inset-0 transition-colors duration-200 ${isOver ? 'bg-green-100' : ''
                    } z-0`}  // z-0 ensures the background stays behind
            ></div>

            {/* Slot Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

const MeetingsSlot = () => {
    // Time slots for the day
    const timeSlots = [
        '10:00 AM', '11:00 AM',
        '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    // Sales team members
    const allSales = ['Alice', 'Bob', 'rahim', 'Charlie', 'salman', 'najmul'];
    const [salesTeam, setSalesTeam] = useState(allSales);

    // State to manage meetings   meeting asigne by teamMember
    const meet = [
        { id: 1, time: '10:00 AM', teamMember: 'Alice', title: 'Meeting with Client A', duration: '1 hour' },
        { id: 2, time: '10:00 AM', teamMember: 'Bob', title: 'Follow-up with Client B', duration: '30 mins' },
        { id: 3, time: '01:00 PM', teamMember: 'Charlie', title: 'Internal Sales Discussion hare is mine', duration: '1 hour' },
        { id: 4, time: '03:00 PM', teamMember: 'Alice', title: 'salman karam toka', duration: '30 hour' },
        { id: 5, time: '04:00 PM', teamMember: 'Bob', title: 'tharin ninja', duration: '23 hour' },
        { id: 6, time: '06:00 PM', teamMember: 'Alice', title: 'salman karam toka', duration: '30 hour' },
    ]
    const [meetings, setMeetings] = useState(meet);

    // Handle Drag End
    const onDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedMeetingId = parseInt(active.id);
        const draggedMeeting = meetings.find(meeting => meeting.id === draggedMeetingId);
        const [newTeamMember, newTime] = over.id.split('-');

        // Only update if dropped in a different slot
        if (draggedMeeting.teamMember !== newTeamMember || draggedMeeting.time !== newTime) {
            const updatedMeetings = meetings.map((meeting) =>
                meeting.id === draggedMeetingId
                    ? { ...meeting, teamMember: newTeamMember, time: newTime }
                    : meeting
            );
            setMeetings(updatedMeetings);
        }
    };


    return (
        <div className="w-full">
            {/* Header with time slots */}
            <div className="grid grid-cols-[150px_repeat(9,_1fr)] bg-gray-100 p-4">
                <div className="font-bold">Sales Team</div>
                {timeSlots.map((slot, index) => (
                    <div key={index} className="text-center font-bold">{slot}</div>
                ))}
            </div>

            {/* Body with sales team and meetings */}
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <SortableContext items={meetings}>
                    <div className="grid grid-cols-[150px_repeat(9,_1fr)]">
                        {salesTeam.map((member) => (
                            <React.Fragment key={member}>
                                {/* Sales Team Member Column */}
                                <div className="p-8 font-bold bg-gray-50 border border-gray-200">
                                    {member}
                                </div>
                                {/* Time Slots for Each Member */}
                                {timeSlots.map((slot, index) => {
                                    const meeting = meetings.find(
                                        (m) => m.teamMember === member && m.time === slot
                                    );
                                    return (
                                        <DroppableSlot key={slot} id={`${member}-${slot}`}>
                                            {meeting && (
                                                <DraggableItem id={String(meeting.id)} meeting={meeting} />
                                            )}
                                        </DroppableSlot>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default MeetingsSlot;
