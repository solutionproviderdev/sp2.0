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
import PopoverMenu from './PopoverMenu';
import { Meeting } from '../../features/meeting/meetinApi';
import { useSelector } from 'react-redux';
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

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
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
		boxShadow: isDragging ? '0 4px 12px rgba(4, 98, 136, 0.5)' : 'none',
	};

	const statusColor = meeting.status === 'Fixed' ? '#82b1c4' : '#9bc0cf'; // Light shades of #046288

	if (user.type === 'Admin' || meetingFromSameCRE) {
		return (
			<div
				ref={setNodeRef}
				{...attributes}
				{...listeners}
				style={style}
				className={`absolute top-0 left-0 h-full bg-gradient-to-b from-[#82b1c4] to-[#4f91ac] p-2 rounded-lg ${
					isDragging ? 'shadow-xl' : ''
				} cursor-grab transition-all duration-300 ease-in-out`}
			>
				{/* More Options Icon */}
				<div className="absolute top-1 right-1">
					<IconButton
						size="small"
						onClick={handleOpenMenu}
						onPointerDown={e => e.stopPropagation()}
						sx={{ color: '#046288' }}
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
						{/* Lead's Name */}
						<div className="flex items-center gap-1 text-xs mt-1 text-[#022736]">
							<FaUser className="w-3 h-3" />
							<span>{meeting?.lead?.name || 'N/A'}</span>
						</div>

						{/* Phone Number */}
						<div className="flex items-center gap-1 text-xs mt-1 text-[#022736]">
							<FaPhone className="w-3 h-3" />
							<span>{meeting?.lead?.phone?.join(', ') || 'N/A'}</span>
						</div>

						{/* Address */}
						{meeting?.lead?.address && (
							<div className="flex items-center gap-1 text-xs mt-1 text-[#022736]">
								<FaMapMarkerAlt className="w-3 h-3" />
								<span>
									{`${meeting?.lead?.address?.area || ''}, ${
										meeting?.lead?.address?.district || ''
									}, ${meeting?.lead?.address?.division || ''}`}
								</span>
							</div>
						)}

						{/* Project Status */}
						<div className="flex items-center gap-1 text-xs mt-1 text-[#022736]">
							<FaClock className="w-3 h-3" />
							<span>
								{`${meeting?.lead?.projectStatus?.status || 'N/A'} - ${
									meeting?.lead?.projectStatus?.subStatus || ''
								}`}
							</span>
						</div>

						{/* Requirements */}
						<div className="flex flex-wrap gap-1 text-xs mt-1">
							{meeting?.lead?.requirements?.length ? (
								meeting.lead.requirements.map((req, idx) => (
									<span
										key={idx}
										className="bg-white text-[#046288] rounded-full px-2 py-1 border"
									>
										{req}
									</span>
								))
							) : (
								<span className="text-gray-500">No requirements</span>
							)}
						</div>
					</div>

					{/* Status Badge */}
					<div className="mt-2 flex justify-end">
						<span
							className="text-xs font-semibold px-2 py-1 rounded"
							style={{
								backgroundColor: statusColor,
								color: '#022736',
							}}
						>
							{meeting.status || 'N/A'}
						</span>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div
				className={`absolute top-0 left-0 h-full bg-gradient-to-b from-[#68a1b8] to-[#4f91ac] p-2 rounded-lg flex items-center justify-center ${
					isDragging ? 'shadow-lg' : ''
				} cursor-grab`}
				style={style}
			>
				<h1 className="font-bold text-white">{`Booked By ${creName}`}</h1>
			</div>
		);
	}
};

export default DraggableItem;
