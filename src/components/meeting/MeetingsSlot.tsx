// import React, { useState } from 'react';
// import {
//     DndContext,
//     closestCenter,
//     useDraggable,
//     useDroppable
// } from '@dnd-kit/core';
// import { arrayMove, SortableContext } from '@dnd-kit/sortable';

// const DraggableItem = ({ id, meeting }) => {
//     const { attributes, listeners, setNodeRef, transform } = useDraggable({
//         id
//     });

//     const style = {
//         transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
//     };

//     return (
//         <div
//             ref={setNodeRef}
//             {...attributes}
//             {...listeners}
//             style={style}
//             className="absolute inset-2 bg-blue-500 text-white p-2 rounded shadow-lg"
//         >
//             <strong>{meeting.title}</strong><br />
//             <small>{meeting.duration}</small>
//         </div>
//     );
// };

// const DroppableSlot = ({ id, children }) => {
//     const { isOver, setNodeRef } = useDroppable({
//         id
//     });

//     return (
//         <div
//             ref={setNodeRef}
//             className={`border border-gray-200 h-24 relative ${isOver ? 'bg-green-100' : ''}`}
//             style={{ width: '100%' }}
//         >
//             {children}
//         </div>
//     );
// };

// const MeetingsSlot = () => {
//     // Time slots for the day
//     const timeSlots = [
//         '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
//         '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
//     ];

//     // Sales team members
//     const salesTeam = ['Alice', 'Bob', 'Charlie','emon','supto'];

//     // State to manage meetings
//     const [meetings, setMeetings] = useState([
//         { id: 1, time: '09:00 AM', teamMember: 'Alice', title: 'Meeting with Client A', duration: '1 hour' },
//         { id: 2, time: '11:00 AM', teamMember: 'Bob', title: 'Follow-up with Client B', duration: '30 mins' },
//         { id: 3, time: '01:00 PM', teamMember: 'Charlie', title: 'Internal Sales Discussion', duration: '1 hour' }
//     ]);

//     const onDragEnd = ({ active, over }) => {
//         if (active.id !== over.id) {
//             const oldIndex = meetings.findIndex(meeting => meeting.id === parseInt(active.id));
//             const newIndex = meetings.findIndex(meeting => meeting.id === parseInt(over.id));
//             const reorderedMeetings = arrayMove(meetings, oldIndex, newIndex);
//             setMeetings(reorderedMeetings);
//         }
//     };

//     return (
//         <div className="w-full">
//             {/* Header with time slots */}
//             <div className="grid grid-cols-[150px_repeat(9,_1fr)] bg-gray-100 p-4">
//                 <div className="font-bold">Sales Team</div>
//                 {timeSlots.map((slot, index) => (
//                     <div key={index} className="text-center font-bold">{slot}</div>
//                 ))}
//             </div>

//             {/* Body with sales team and meetings */}
//             <DndContext
//                 collisionDetection={closestCenter}
//                 onDragEnd={onDragEnd}
//             >
//                 <SortableContext items={meetings}>
//                     <div className="grid grid-cols-[150px_repeat(9,_1fr)]">
//                         {salesTeam.map((member) => (
//                             <React.Fragment key={member}>
//                                 {/* Sales Team Member Column */}
//                                 <div className="p-4 font-bold bg-gray-50 border border-gray-200">
//                                     {member}
//                                 </div>
//                                 {/* Time Slots for Each Member */}
//                                 {timeSlots.map((slot, index) => {
//                                     const meeting = meetings.find(
//                                         (m) => m.teamMember === member && m.time === slot
//                                     );
//                                     return (
//                                         <DroppableSlot key={slot} id={`${member}-${slot}`}>
//                                             {meeting && (
//                                                 <DraggableItem id={String(meeting.id)} meeting={meeting} />
//                                             )}
//                                         </DroppableSlot>
//                                     );
//                                 })}
//                             </React.Fragment>
//                         ))}
//                     </div>
//                 </SortableContext>
//             </DndContext>
//         </div>
//     );
// };

// export default MeetingsSlot;












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
            style={style}
            className="absolute inset-2 bg-blue-500 text-white p-2 rounded shadow-lg"
        >
            <strong>{meeting.title}</strong><br />
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
            className={`border border-gray-200 h-24 relative ${isOver ? 'bg-green-100' : ''}`}
            style={{ width: '100%' }}
        >
            {children}
        </div>
    );
};

const MeetingsSlot = () => {
    // Time slots for the day
    const timeSlots = [
        '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    // Sales team members
    const salesTeam = ['Alice', 'Bob', 'Charlie'];

    // State to manage meetings
    const [meetings, setMeetings] = useState([
        { id: 1, time: '09:00 AM', teamMember: 'Alice', title: 'Meeting with Client A', duration: '1 hour' },
        { id: 2, time: '11:00 AM', teamMember: 'Bob', title: 'Follow-up with Client B', duration: '30 mins' },
        { id: 3, time: '01:00 PM', teamMember: 'Charlie', title: 'Internal Sales Discussion', duration: '1 hour' }
    ]);

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
                                <div className="p-4 font-bold bg-gray-50 border border-gray-200">
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
