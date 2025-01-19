import React, { useState, useEffect } from 'react';
import { useAssignLeadToCREMutation } from '../../../features/lead/leadAPI';
import { useGetUserByDepartmentAndRoleQuery } from '../../../features/auth/authAPI';
import { Box, Typography, IconButton, Alert, Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CustomSelectWithPictures from '../../UI/inputs/CustomSelectWithPictures';

interface AssignLeadProps {
	leadID: string;
	currentCREId: string; // Current CRE ID passed as a prop
}

export default function AssignLead({ leadID, currentCREId }: AssignLeadProps) {
	const [selectedCRE, setSelectedCRE] = useState<string>(currentCREId); // State to track selected CRE, default to currentCREId
	const [editMode, setEditMode] = useState<boolean>(false); // State to toggle edit mode
	const [assignLeadToCRE] = useAssignLeadToCREMutation();

	// State for Snackbar (toast) notifications
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
		'success'
	);

	// Fetch all CREs
	const { data: CREs } = useGetUserByDepartmentAndRoleQuery({
		departmentName: 'CRE',
		roleName: 'CRE',
	});

	// Find the current CRE details
	const currentCRE = CREs?.find(cre => cre._id === currentCREId._id);

	// Set the current CRE as the default selected value
	useEffect(() => {
		if (currentCREId) {
			setSelectedCRE(currentCREId._id); // Ensure selectedCRE is always in sync with currentCREId
		}
	}, [currentCREId]);

	// Map CREs to the format required by CustomSelectWithPictures
	const CREOptions =
		CREs?.map(cre => ({
			value: cre._id, // Use CRE ID as the value
			label: cre.nameAsPerNID, // Use CRE name as the label
			profilePicture: cre.profilePicture, // Use CRE profile picture
		})) || [];

	// Handle CRE selection change
	const handleCREChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const selectedValue = e.target.value as string;
		setSelectedCRE(selectedValue);

		if (selectedValue) {
			// Assign the lead to the selected CRE
			assignLeadToCRE({ id: leadID, data: { newCREId: selectedValue } })
				.unwrap()
				.then(() => {
					setSnackbarMessage('Lead assigned successfully!');
					setSnackbarSeverity('success');
					setSnackbarOpen(true);
					setEditMode(false); // Exit edit mode after successful assignment
				})
				.catch(error => {
					setSnackbarMessage('Failed to assign lead. Please try again.');
					setSnackbarSeverity('error');
					setSnackbarOpen(true);
					console.error('Error assigning lead:', error);
				});
		}
	};

	// Close the Snackbar
	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<Box className="flex flex-col my-2 p-2">
			<div className="flex items-center justify-between">
				<div className="">
					<Typography variant="body1">👤 Assigned CRE</Typography>
				</div>
				<IconButton onClick={() => setEditMode(!editMode)}>
					{editMode ? <DoneIcon /> : <EditIcon />}
				</IconButton>
			</div>

			{/* Display current CRE's name and profile picture */}
			{currentCRE && !editMode && (
				<Box className="flex items-center mt-2">
					<img
						src={currentCRE.profilePicture}
						alt={currentCRE.nameAsPerNID}
						style={{
							width: '40px',
							height: '40px',
							borderRadius: '50%',
							marginRight: '10px',
						}}
					/>
					<Typography variant="body2">{currentCRE.nameAsPerNID}</Typography>
				</Box>
			)}

			{/* Show dropdown in edit mode */}
			{editMode && (
				<Box className="mt-2">
					<CustomSelectWithPictures
						label="Assign to CRE"
						name="cre"
						value={selectedCRE} // Default to currentCREId
						onChange={handleCREChange}
						options={CREOptions}
						fullWidth
					/>
				</Box>
			)}

			{/* MUI Snackbar for toast notifications */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000} // Auto-close after 6 seconds
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position of the Snackbar
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
}
