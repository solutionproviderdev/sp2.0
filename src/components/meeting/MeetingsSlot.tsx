
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
            className="bg-blue-300 text-black p-2 border-t-4 border-t-blue-400 rounded shadow-sm" // Reduced padding
        >
            <p className='text-xs'>{meeting.title}</p> {/* Reduced text size */}
            <small className="text-xs">{meeting.duration}</small> {/* Reduced text size */}
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
            className="border border-gray-200 h-20 relative" // Adjust height for responsiveness
            style={{ width: '100%' }}
        >
            <div
                className={`absolute inset-0 transition-colors duration-200 ${isOver ? 'bg-green-100' : ''} z-0`}  // z-0 ensures the background stays behind
            ></div>

            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

const MeetingsSlot = () => {
    const timeSlots = [
        '10:00 AM', '11:00 AM',
        '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    const allSales = ['Alice', 'Bob', 'Rahim', 'Charlie', 'Salman', 'Nazmul'];
    const [salesTeam, setSalesTeam] = useState(allSales);

    const meet = [
        { id: 1, time: '10:00 AM', teamMember: 'Alice', title: 'Meeting with Client A', duration: '1 hour' },
        { id: 2, time: '10:00 AM', teamMember: 'Bob', title: 'Follow-up with Client B', duration: '30 mins' },
        { id: 3, time: '01:00 PM', teamMember: 'Charlie', title: 'Internal Sales Discussion', duration: '1 hour' },
        { id: 4, time: '03:00 PM', teamMember: 'Alice', title: 'Project Check-in', duration: '30 mins' },
        { id: 5, time: '04:00 PM', teamMember: 'Bob', title: 'Client Feedback Session', duration: '1 hour' },
        { id: 6, time: '06:00 PM', teamMember: 'Alice', title: 'Wrap-up Meeting', duration: '30 mins' },
    ];

    const [meetings, setMeetings] = useState(meet);

    const onDragEnd = ({ active, over }) => {
        if (!over) return;

        const draggedMeetingId = parseInt(active.id);
        const draggedMeeting = meetings.find(meeting => meeting.id === draggedMeetingId);
        const [newTeamMember, newTime] = over.id.split('-');

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
            <div className="grid grid-cols-[150px_repeat(9,_1fr)] bg-gray-100 p-2"> {/* Adjusted padding */}
                <div className="font-bold">Sales Team</div>
                {timeSlots.map((slot, index) => (
                    <div key={index} className="text-center font-bold">{slot}</div>
                ))}
            </div>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
            >
                <SortableContext items={meetings}>
                    <div className="grid grid-cols-[150px_repeat(9,_1fr)]">
                        {salesTeam.map((member) => (
                            <React.Fragment key={member}>
                                <div className="p-2 font-bold bg-gray-50 border border-gray-200">
                                    {member}
                                </div>
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
