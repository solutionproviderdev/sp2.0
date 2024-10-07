import React, { useState } from 'react';
import { Typography, IconButton, Alert } from '@mui/material';
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
	leadId: string | undefined;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, leadId }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'error' | 'success';
	} | null>(null);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<div className="flex flex-col my-2 p-2">
			<div className="flex items-center justify-between">
				<Typography variant="body1">📍 Address</Typography>
				<IconButton onClick={handleModalOpen}>
					{address ? <EditIcon /> : <AddIcon />}
				</IconButton>
			</div>

			{alert && (
				<Alert
					severity={alert.severity}
					onClose={() => setAlert(null)}
					sx={{ marginBottom: 2 }}
				>
					{alert.message}
				</Alert>
			)}

			{address ? (
				<div className="flex items-center mb-2">
					<Typography
						variant="body2"
						sx={{
							flexGrow: 1,
							padding: '8px',
							borderLeft: 1,
							backgroundColor: '#f0f4f7',
						}}
					>
						{address.address}, {address.area}, {address.district},{' '}
						{address.division}
					</Typography>
				</div>
			) : (
				<Typography
					variant="body2"
					sx={{
						flexGrow: 1,
						padding: '8px',
						borderLeft: 1,
						backgroundColor: '#f0f4f7',
						marginBottom: 2,
					}}
				>
					No address available. Please add one.
				</Typography>
			)}

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
