import React, { useState, useEffect } from 'react';
import {
	Modal,
	Box,
	Typography,
	TextField,
	Select,
	MenuItem,
	Button,
} from '@mui/material';

interface ProjectStatusModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: {
		projectStatus: string;
		projectSubStatus: string;
		comment: string;
	}) => void;
}

const ProjectStatusModal: React.FC<ProjectStatusModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [projectStatus, setProjectStatus] = useState<string>('');
	const [projectSubStatus, setProjectSubStatus] = useState<string>('');
	const [subStatusOptions, setSubStatusOptions] = useState<string[]>([]); // Array of sub-status options
	const [comment, setComment] = useState<string>('');

	// Function to update the sub-status options based on project status
	useEffect(() => {
		let options: string[] = [];
		switch (projectStatus) {
			case 'Ongoing':
				options = [
					'Roof Casting',
					'Brick Wall',
					'Plaster',
					'Pudding',
					'Two Coat Paint',
				];
				break;
			case 'Ready':
				options = [
					'Tiles Complete',
					'Final Paint Done',
					'Handed Over',
					'Staying in the Apartment',
				];
				break;
			case 'Renovation':
				options = ['Interior Work Complete'];
				break;
			default:
				options = [];
				break;
		}
		setSubStatusOptions(options); // Update the state with the new options
		setProjectSubStatus(''); // Reset the sub-status when project status changes
	}, [projectStatus]);

	const handleSubmit = () => {
		onSubmit({ projectStatus, projectSubStatus, comment });
		setProjectStatus('');
		setProjectSubStatus('');
		setComment('');
		onClose();
	};

	return (
		<Modal
			open={isOpen}
			className="flex flex-col items-center justify-center"
			onClose={onClose}
		>
			<Box
				sx={{
					padding: 4,
					backgroundColor: 'white',
					margin: 'auto',
				}}
			>
				<Typography variant="h6">Update Project Status</Typography>
				<Select
					value={projectStatus}
					onChange={e => {
						setProjectStatus(e.target.value);
					}}
					fullWidth
					sx={{ mt: 2 }}
					displayEmpty
				>
					<MenuItem value="" disabled>
						Select Status
					</MenuItem>
					<MenuItem value="Ongoing">Ongoing</MenuItem>
					<MenuItem value="Ready">Ready</MenuItem>
					<MenuItem value="Renovation">Renovation</MenuItem>
				</Select>
				<Select
					value={projectSubStatus}
					onChange={e => setProjectSubStatus(e.target.value)}
					fullWidth
					sx={{ mt: 2 }}
					disabled={!projectStatus}
					displayEmpty
				>
					<MenuItem value="" disabled>
						Select Sub Status
					</MenuItem>
					{subStatusOptions.map(subStatus => (
						<MenuItem key={subStatus} value={subStatus}>
							{subStatus}
						</MenuItem>
					))}
				</Select>
				<TextField
					label="Comment"
					fullWidth
					multiline
					rows={3}
					value={comment}
					onChange={e => setComment(e.target.value)}
					sx={{ mt: 2 }}
				/>
				<Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
					Submit
				</Button>
			</Box>
		</Modal>
	);
};

export default ProjectStatusModal;
