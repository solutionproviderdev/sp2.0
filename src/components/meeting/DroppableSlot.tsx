import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DroppableSlotProps {
	id: string;
	children?: React.ReactNode;
	isOccupied: boolean;
	isSecondSlot: boolean;
}

const DroppableSlot: React.FC<DroppableSlotProps> = ({
	id,
	children,
	isOccupied,
	isSecondSlot,
}) => {
	const { isOver, setNodeRef } = useDroppable({ id, disabled: isSecondSlot });

	const getBgColor = () => {
		if (isOccupied) {
			return isOver ? 'bg-red-100' : 'bg-gray-50';
		}
		return isOver ? 'bg-green-100' : 'bg-white';
	};

	return (
		<div
			ref={setNodeRef}
			className={`border border-gray-200 h-40 relative ${getBgColor()}`}
		>
			{children}
		</div>
	);
};

export default DroppableSlot;
