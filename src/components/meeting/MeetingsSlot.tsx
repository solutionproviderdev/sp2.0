
import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    useDraggable,
    useDroppable
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { FaClock, FaUser, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Keep existing DraggableItem and DroppableSlot components exactly as they are
const DraggableItem = ({ id, meeting, isDragging, canExpandToTwoSlots }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id
    });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        zIndex: isDragging ? 10 : 1,
        width: canExpandToTwoSlots ? '200%' : '100%',
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`absolute top-0 left-0 h-full bg-blue-300 p-2 rounded ${isDragging ? 'shadow-lg bg-blue-400' : ''} cursor-grab`}
        >
            <div className="flex flex-col h-full justify-between">
                <div>
                    <p className="font-medium text-sm truncate">{meeting.title}</p>
                    <div className="flex items-center gap-1 text-xs">
                        <FaClock className="w-3 h-3" />
                        <span>{meeting.time}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                    <FaUser className="w-3 h-3" />
                    <span>{meeting.teamMember}</span>
                </div>
            </div>
        </div>
    );
};

const DroppableSlot = ({ id, children, isOccupied, isSecondSlot }) => {
    const { isOver, setNodeRef } = useDroppable({
        id,
        disabled: isSecondSlot
    });

    const getBgColor = () => {
        if (isOccupied) {
            return isOver ? 'bg-red-100' : 'bg-gray-50';
        }
        return isOver ? 'bg-green-100' : 'bg-white';
    };

    return (
        <div ref={setNodeRef} className={`border border-gray-200 h-20 relative ${getBgColor()}`}>
            {children}
        </div>
    );
};

// DateSelector component
const DateSelector = ({ selectedDate, onDateChange }) => {
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

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
                <button onClick={handlePrevDate} className="p-2 hover:bg-gray-100 rounded-full transition-colors" type="button">
                    <FaChevronLeft className="w-5 h-5"/>
                </button>
                <h2 className="text-xl font-bold">{formatDate(selectedDate)}</h2>
                <button onClick={handleNextDate} className="p-2 hover:bg-gray-100 rounded-full transition-colors" type="button">
                    <FaChevronRight className="w-5 h-5 "/>
                </button>
            </div>
        </div>
    );
};

const MeetingsSlot = () => {
    const timeSlots = [
        '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    const allSales = ['Alice', 'Bob', 'Rahim', 'Charlie', 'Salman', 'Nazmul'];
    const [salesTeam] = useState(allSales);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const initialMeetings = [
        { id: 1, time: '10:00 AM', teamMember: 'Alice', title: 'Meeting A', date: '2024-10-24' },
        { id: 2, time: '10:00 AM', teamMember: 'Bob', title: 'Meeting B', date: '2024-10-24' },
        { id: 3, time: '01:00 PM', teamMember: 'Charlie', title: 'Meeting C', date: '2024-10-25' },
        { id: 4, time: '03:00 PM', teamMember: 'Alice', title: 'Meeting D', date: '2024-10-25' },
        { id: 5, time: '04:00 PM', teamMember: 'Bob', title: 'Meeting E', date: '2024-10-24' }
    ];

    const [meetings, setMeetings] = useState(initialMeetings);
    const [draggingId, setDraggingId] = useState(null);
    const [visibleMeetings, setVisibleMeetings] = useState([]);

    const getVisibleMeetings = () => {
        const dateString = selectedDate.toISOString().split('T')[0];
        return meetings.filter(meeting => meeting.date === dateString);
    };

    useEffect(() => {
        setVisibleMeetings(getVisibleMeetings());
    }, [selectedDate, meetings]);

    const canExpandToTwoSlots = (member, time) => {
        const timeIndex = timeSlots.indexOf(time);
        if (timeIndex === timeSlots.length - 1) return false;
        
        const nextSlotTime = timeSlots[timeIndex + 1];
        const nextSlotOccupied = visibleMeetings.some(m => 
            m.teamMember === member && 
            m.time === nextSlotTime
        );
        
        return !nextSlotOccupied;
    };

    const onDragStart = (event) => {
        setDraggingId(event.active.id);
    };

    const onDragEnd = ({ active, over }) => {
        setDraggingId(null);
        if (!over) return;

        const draggedMeetingId = parseInt(active.id);
        const draggedMeeting = meetings.find(meeting => meeting.id === draggedMeetingId);
        const [newTeamMember, newTime] = over.id.split('-');

        const targetMeeting = visibleMeetings.find(
            m => m.teamMember === newTeamMember && 
                m.time === newTime
        );

        let updatedMeetings;

        if (targetMeeting) {
            updatedMeetings = meetings.map(meeting => {
                if (meeting.id === draggedMeetingId) {
                    return {
                        ...meeting,
                        teamMember: newTeamMember,
                        time: newTime,
                        date: selectedDate.toISOString().split('T')[0]
                    };
                }
                if (meeting.id === targetMeeting.id) {
                    return {
                        ...meeting,
                        teamMember: draggedMeeting.teamMember,
                        time: draggedMeeting.time
                    };
                }
                return meeting;
            });
        } else {
            updatedMeetings = meetings.map(meeting => {
                if (meeting.id === draggedMeetingId) {
                    return {
                        ...meeting,
                        teamMember: newTeamMember,
                        time: newTime,
                        date: selectedDate.toISOString().split('T')[0]
                    };
                }
                return meeting;
            });
        }

        setMeetings(updatedMeetings);
    };

    return (
        <div className="w-full">
            <DateSelector 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
            
            <div className="grid grid-cols-[150px_repeat(9,_1fr)] bg-gray-100 p-2">
                <div className="font-bold">Sales Team</div>
                {timeSlots.map((slot, index) => (
                    <div key={index} className="text-center font-bold">{slot}</div>
                ))}
            </div>

            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
                <SortableContext items={visibleMeetings}>
                    <div className="grid grid-cols-[150px_repeat(9,_1fr)]">
                        {salesTeam.map((member) => (
                            <React.Fragment key={member}>
                                <div className="p-4 font-bold bg-gray-50 border border-gray-200">
                                    {member}
                                </div>
                                {timeSlots.map((slot, index) => {
                                    const meeting = visibleMeetings.find(
                                        (m) => m.teamMember === member && m.time === slot
                                    );
                                    const isOccupied = !!meeting;
                                    const canExpand = meeting && canExpandToTwoSlots(member, slot);
                                    const prevSlotMeeting = visibleMeetings.find(
                                        (m) => m.teamMember === member && 
                                        m.time === timeSlots[index - 1] &&
                                        canExpandToTwoSlots(member, timeSlots[index - 1])
                                    );

                                    return (
                                        <DroppableSlot 
                                            key={`${member}-${slot}`} 
                                            id={`${member}-${slot}`} 
                                            isOccupied={isOccupied}
                                            isSecondSlot={!!prevSlotMeeting}
                                        >
                                            {meeting && (
                                                <DraggableItem 
                                                    id={String(meeting.id)} 
                                                    meeting={meeting} 
                                                    isDragging={draggingId === String(meeting.id)}
                                                    canExpandToTwoSlots={canExpand}
                                                />
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
