import React, { useState } from 'react';
import { Popover, Button } from '@mui/material';
import RescheduleModal from './statusModals/RescheduleModal';
import PostponeModal from './statusModals/PostponeModal';
import CancelModal from './statusModals/CancelModal'; // Import the CancelModal component

interface PopoverMenuProps {
	anchorEl: HTMLButtonElement | null;
	onClose: () => void;
	meetingId: string;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({
	anchorEl,
	onClose,
	meetingId,
}) => {
	const [openReschedule, setOpenReschedule] = useState(false);
	const [openPostpone, setOpenPostpone] = useState(false);
	const [openCancel, setOpenCancel] = useState(false); // State for the CancelModal

	const handleOptionClick = (option: string) => {
		switch (option) {
			case 'Reschedule':
				setOpenReschedule(true);
				break;
			case 'Postpone':
				setOpenPostpone(true);
				break;
			case 'Cancel': // Handle the Cancel case
				setOpenCancel(true);
				break;
		}
		onClose();
	};

	return (
		<>
			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={onClose}
				onPointerDown={e => e.stopPropagation()}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			>
				<div className="p-2 flex flex-col">
					<Button onClick={() => handleOptionClick('Reschedule')} size="small">
						Reschedule
					</Button>
					<Button onClick={() => handleOptionClick('Postpone')} size="small">
						Postpone
					</Button>
					<Button onClick={() => handleOptionClick('Cancel')} size="small">
						Cancel
					</Button>
				</div>
			</Popover>

			{/* Reschedule Modal */}
			{openReschedule && (
				<div onPointerDown={e => e.stopPropagation()} className="">
					<RescheduleModal
						isOpen={openReschedule}
						onClose={() => setOpenReschedule(false)}
						meetingId={meetingId}
					/>
				</div>
			)}

			{/* Postpone Modal */}
			{openPostpone && (
				<div
					onPointerDown={e => e.stopPropagation()}
					onKeyDown={e => e.stopPropagation()}
					className=""
				>
					<PostponeModal
						isOpen={openPostpone}
						onClose={() => setOpenPostpone(false)}
						meetingId={meetingId}
					/>
				</div>
			)}

			{/* Cancel Modal */}
			{openCancel && (
				<div
					onPointerDown={e => e.stopPropagation()}
					onKeyDown={e => e.stopPropagation()}
					className=""
				>
					<CancelModal
						isOpen={openCancel}
						onClose={() => setOpenCancel(false)}
						meetingId={meetingId}
					/>
				</div>
			)}
		</>
	);
};

export default PopoverMenu;
