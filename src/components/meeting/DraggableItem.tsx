import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
	FaClock,
	FaUser,
	FaPhone,
	FaMapMarkerAlt,
	FaEllipsisH,
} from 'react-icons/fa';
import { IconButton } from '@mui/material';
import PopoverMenu from './PopoverMenu'; // Adjust the path as necessary
import { Meeting } from '../../features/meeting/meetinApi';
import Meeting from '../../pages/Meeting';
import { useSelector } from 'react-redux';
import { useGetDepartmentByIdQuery } from '../../features/auth/department/departmentAPI';
import { useGetUserByIdQuery } from '../../features/auth/authAPI';

interface DraggableItemProps {
	id: string;
	meeting: Meeting;
	isDragging: boolean;
	canExpandToTwoSlots?: boolean;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
	id,
	meeting,
	isDragging,
	canExpandToTwoSlots,
}) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const { data: userData } = useGetUserByIdQuery(meeting.lead.creName || '', {
		skip: !meeting.lead.creName,
	});

	const creName = userData?.nickname || userData?.nameAsPerNID;

	const { user } = useSelector((state: { auth: { user: any } }) => state.auth);

	const meetingFromSameCRE = meeting.lead.creName === user._id;

	// console.log(meeting);

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation(); // Prevents the drag from triggering
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const style = {
		transform: transform
			? `translate(${transform.x}px, ${transform.y}px)`
			: undefined,
		zIndex: isDragging ? 10 : 1,
		width: canExpandToTwoSlots ? '200%' : '100%',
	};

	console.log(meeting.status);

	if (user.type === 'Admin' || meetingFromSameCRE) {
		return (
			<div
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				style={style}
				className={`absolute top-0 left-0 h-full ${
					meeting.status === 'Fixed' ? 'bg-blue-300' : 'bg-red-300'
				} bg-blue-300 p-2 rounded ${
					isDragging ? 'shadow-lg bg-blue-400' : ''
				} cursor-grab`}
			>
				{/* More Options Icon */}
				<div className="absolute top-1 right-1">
					<IconButton
						size="small"
						onClick={handleOpenMenu}
						onPointerDown={e => e.stopPropagation()} // Prevents drag on pointer down
					>
						<FaEllipsisH />
					</IconButton>
					<PopoverMenu
						meetingId={meeting?._id}
						anchorEl={anchorEl}
						onClose={handleCloseMenu}
					/>
				</div>

				<div className="flex flex-col h-full justify-between">
					<div>
						{/* Display the lead's name */}
						<div className="flex items-center gap-1 text-xs mt-1">
							<FaUser className="w-3 h-3" />
							<span>{meeting?.lead?.name || 'N/A'}</span>
						</div>
						{/* Display the lead's phone number */}
						<div className="flex items-center gap-1 text-xs mt-1">
							<FaPhone className="w-3 h-3" />
							<span>{meeting?.lead?.phone?.join(', ') || 'N/A'}</span>
						</div>
						{/* Display the lead's address */}
						{meeting?.lead?.address && (
							<div className="flex items-center gap-1 text-xs mt-1">
								<FaMapMarkerAlt className="w-3 h-3" />
								<span>
									{`${meeting?.lead?.address?.area || ''}, ${
										meeting?.lead?.address?.district || ''
									}, ${meeting?.lead?.address?.division || ''}`}
								</span>
							</div>
						)}
						{/* Display project status */}
						<div className="flex items-center gap-1 text-xs mt-1">
							<FaClock className="w-3 h-3" />
							<span>
								{`${meeting?.lead?.projectStatus?.status || 'N/A'} - ${
									meeting?.lead?.projectStatus?.subStatus || ''
								}`}
							</span>
						</div>
						{/* Display requirements */}
						<div className="flex flex-wrap gap-1 text-xs mt-1">
							{meeting?.lead?.requirements?.length ? (
								meeting.lead.requirements.map((req, idx) => (
									<span
										key={idx}
										className="bg-white text-black rounded-full px-2 py-1 border"
									>
										{req}
									</span>
								))
							) : (
								<span className="text-gray-500">No requirements</span>
							)}
						</div>
					</div>

					{/* Display the status at the bottom right */}
					<div className="mt-2 flex justify-end">
						<span className="text-xs font-semibold bg-gray-200 p-1 rounded">
							{meeting.status || 'N/A'}
						</span>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div
				className={`absolute top-0 left-0 h-full bg-blue-300 p-2 rounded flex items-center justify-center ${
					isDragging ? 'shadow-lg bg-blue-400' : ''
				} cursor-grab`}
				style={style}
			>
				<h1 className="font-bold">{`Booked By ${creName}`}</h1>
			</div>
		);
	}
};

export default DraggableItem;
