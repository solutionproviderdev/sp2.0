import React, { useState } from 'react';
import {
	Box,
	Typography,
	Select,
	MenuItem,
	Button,
	IconButton,
	Chip,
	Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useUpdateLeadsMutation } from '../../../features/conversation/conversationApi';

interface ProjectStatusProps {
	leadId: string | undefined;
	projectStatus: {
		status: string;
		subStatus: string;
	};
}

const ProjectStatus: React.FC<ProjectStatusProps> = ({
	leadId,
	projectStatus: { status: currentStatus, subStatus: currentSubStatus },
}) => {
	const [updateLeads] = useUpdateLeadsMutation();

	const [projectStatus, setProjectStatus] = useState<string>(currentStatus);
	const [projectSubStatus, setProjectSubStatus] =
		useState<string>(currentSubStatus);
	const [editMode, setEditMode] = useState<boolean>(false);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'error' | 'success';
	} | null>(null);

	const statusOptions = ['Ongoing', 'Ready', 'Renovation'];

	const subStatusOptions: { [key: string]: string[] } = {
		Ongoing: [
			'Roof Casting',
			'Brick Wall',
			'Plaster',
			'Pudding',
			'Two Coat Paint',
		],
		Ready: [
			'Tiles Complete',
			'Final Paint Done',
			'Handed Over',
			'Staying in the Apartment',
		],
		Renovation: ['Interior Work Complete'],
	};

	const handleUpdateStatus = async () => {
		try {
			await updateLeads({
				id: leadId,
				data: {
					projectStatus: { status: projectStatus, subStatus: projectSubStatus },
				},
			});
			setAlert({
				message: 'Project status updated successfully',
				severity: 'success',
			});
			setEditMode(false);
		} catch {
			setAlert({
				message: 'Failed to update project status',
				severity: 'error',
			});
		}
	};

	return (
		<Box className="flex flex-col my-2 p-2">
			<div className="flex items-center justify-between">
				<Typography variant="body1">🏗️ Project Status</Typography>
				<IconButton onClick={() => setEditMode(!editMode)}>
					<EditIcon />
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

			{editMode ? (
				<Box className="flex flex-row mt-2 gap-2">
					<Select
						value={projectStatus}
						onChange={e => {
							setProjectStatus(e.target.value);
							setProjectSubStatus(''); // Reset sub-status when main status changes
						}}
						size="small"
						sx={{ flexGrow: 1 }}
					>
						{statusOptions.map(status => (
							<MenuItem key={status} value={status}>
								{status}
							</MenuItem>
						))}
					</Select>
					<Select
						value={projectSubStatus}
						onChange={e => setProjectSubStatus(e.target.value)}
						size="small"
						sx={{ flexGrow: 1 }}
						disabled={!projectStatus}
					>
						{subStatusOptions[projectStatus]?.map(subStatus => (
							<MenuItem key={subStatus} value={subStatus}>
								{subStatus}
							</MenuItem>
						))}
					</Select>
					<IconButton onClick={handleUpdateStatus} disabled={!projectSubStatus}>
						<DoneIcon />
					</IconButton>
				</Box>
			) : (
				<Box className="flex flex-row mt-2 gap-2">
					<Chip
						label={projectStatus}
						sx={{ backgroundColor: '#f0f4f7', padding: '5px' }}
					/>
					{projectSubStatus && (
						<Chip
							label={projectSubStatus}
							sx={{ backgroundColor: '#e0f7fa', padding: '5px' }}
						/>
					)}
				</Box>
			)}
		</Box>
	);
};

export default ProjectStatus;
