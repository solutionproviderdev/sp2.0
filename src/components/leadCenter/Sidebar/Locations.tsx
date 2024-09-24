import React, { useState } from 'react';
import {
	Button,
	Card,
	CardContent,
	IconButton,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AddressModal from './AddressModal';

interface Address {
	division: string;
	district: string;
	area: string;
	address: string;
}

interface AddressCardProps {
	address?: Address;
	leadId: string;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, leadId }) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<div className="w-full max-w-md mx-auto my-4">
			<Card className="shadow-lg">
				<CardContent>
					{address ? (
						<div className="flex items-start justify-between">
							<div>
								<Typography variant="body2" className=''>📍 Address</Typography>
								<Typography variant="body2" className="text-gray-600 p-2">
									{address.address},{address.area}, {address.district},
									{address.division}
								</Typography>
							</div>
							<IconButton size="small" onClick={handleModalOpen}>
								<EditIcon />
							</IconButton>
						</div>
					) : (
						<div className="flex items-center justify-between">
							<Typography variant="body2">Address</Typography>
							<IconButton size="small" onClick={handleModalOpen}>
								<AddIcon />
							</IconButton>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Address Modal */}
			{isModalOpen && (
				<AddressModal
					leadId={leadId}
					open={isModalOpen}
					handleClose={handleModalClose}
				/>
			)}
		</div>
	);
};

export default AddressCard;
