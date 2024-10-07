import React, { useState } from 'react';
import {
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	Chip,
	Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useUpdateRequirementMutation } from '../../../features/conversation/conversationApi';

interface RequirementsProps {
	leadId: string | undefined;
	requirements: string[];
}

const Requirements: React.FC<RequirementsProps> = ({
	leadId,
	requirements: initialRequirements,
}) => {
	const [updateRequirement] = useUpdateRequirementMutation();

	const [requirements, setRequirements] =
		useState<string[]>(initialRequirements);
	const [newRequirement, setNewRequirement] = useState<string>('');
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [showTextField, setShowTextField] = useState<boolean>(false);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'error' | 'success';
	} | null>(null);

	// Add new requirement
	const addRequirement = async () => {
		if (newRequirement.trim() !== '') {
			const updatedRequirements = [...requirements, newRequirement];
			setRequirements(updatedRequirements);
			setNewRequirement('');
			setShowTextField(false);

			try {
				await updateRequirement({
					id: leadId,
					requirements: updatedRequirements,
				});
				setAlert({
					message: 'Requirement added successfully',
					severity: 'success',
				});
			} catch {
				setAlert({
					message: 'Failed to add requirement',
					severity: 'error',
				});
			}
		}
	};

	// Handle requirement edit
	const handleSaveRequirement = async () => {
		if (editIndex !== null) {
			if (requirements[editIndex].trim() === '') {
				const updatedRequirements = requirements.filter(
					(_, i) => i !== editIndex
				);
				setRequirements(updatedRequirements);
			}
			setEditIndex(null);

			try {
				await updateRequirement({ id: leadId, requirements });
				setAlert({
					message: 'Requirement updated successfully',
					severity: 'success',
				});
			} catch {
				setAlert({
					message: 'Failed to update requirement',
					severity: 'error',
				});
			}
		}
	};

	// Remove requirement
	const handleDeleteRequirement = async (index: number) => {
		const updatedRequirements = requirements.filter((_, i) => i !== index);
		setRequirements(updatedRequirements);

		try {
			await updateRequirement({
				id: leadId,
				requirements: updatedRequirements,
			});
			setAlert({
				message: 'Requirement removed successfully',
				severity: 'success',
			});
		} catch {
			setAlert({
				message: 'Failed to remove requirement',
				severity: 'error',
			});
		}
	};

	return (
		<Box className="flex flex-col my-2 p-2">
			<div className="flex items-center justify-between">
				<Typography variant="body1">📋 Requirements</Typography>
				<IconButton onClick={() => setShowTextField(!showTextField)}>
					<AddIcon />
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

			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
				{requirements.map((requirement, index) => (
					<Chip
						key={index}
						label={
							editIndex === index ? (
								<>
									<TextField
										value={requirement}
										onChange={e =>
											setRequirements(
												requirements.map((req, i) =>
													i === index ? e.target.value : req
												)
											)
										}
										size="small"
										sx={{ flexGrow: 1, marginRight: 1 }}
									/>
									<IconButton onClick={handleSaveRequirement}>
										<DoneIcon />
									</IconButton>
								</>
							) : (
								requirement
							)
						}
						onDelete={() => handleDeleteRequirement(index)}
						onClick={() => setEditIndex(index)}
						deleteIcon={<CloseIcon />}
						sx={{ backgroundColor: '#f0f4f7', padding: '5px' }}
					/>
				))}
			</Box>

			{showTextField && (
				<div className="flex items-center mt-2">
					<TextField
						label="Add Requirement"
						size="small"
						sx={{ flexGrow: 1, marginRight: 1 }}
						value={newRequirement}
						onChange={e => setNewRequirement(e.target.value)}
					/>
					<Button variant="outlined" size="medium" onClick={addRequirement}>
						Add
					</Button>
				</div>
			)}
		</Box>
	);
};

export default Requirements;
