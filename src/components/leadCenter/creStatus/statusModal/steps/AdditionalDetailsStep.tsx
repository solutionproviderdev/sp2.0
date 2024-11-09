import React, { useState } from 'react';
import {
	Box,
	Grid,
	Chip,
	TextField,
	Button,
	IconButton,
	Select,
	MenuItem,
	InputLabel,
} from '@mui/material';
import CustomTextField from '../../../../UI/inputs/CustomTextField';
import CustomSelect from '../../../../UI/inputs/CustomSelect';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

interface AdditionalDetailsStepProps {
	defaultData: {
		name: string;
		phone: string[];
		projectLocation: string;
		projectStatus: {
			status: string;
			subStatus: string;
		};
		requirements: string[];
		visitCharge: number;
		comment: string;
	};
	onChange: (updatedData: {
		name?: string;
		phone?: string[];
		projectLocation?: string;
		projectStatus?: {
			status?: string;
			subStatus?: string;
		};
		requirements?: string[];
		visitCharge?: number;
		comment?: string;
	}) => void;
}

const AdditionalDetailsStep: React.FC<AdditionalDetailsStepProps> = ({
	defaultData,
	onChange,
}) => {
	const [formData, setFormData] = useState(defaultData);
	const [newRequirement, setNewRequirement] = useState('');
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [showTextField, setShowTextField] = useState(false);
	const [newPhone, setNewPhone] = useState('');

	// Project Status and SubStatus Options
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

	const handleInputChange = (field: string, value: any) => {
		setFormData(prevData => {
			const updatedData = { ...prevData, [field]: value };
			onChange(updatedData);
			return updatedData;
		});
	};

	const handleStatusChange = (status: string) => {
		handleInputChange('projectStatus', { status, subStatus: '' });
	};

	// Add new requirement chip
	const addRequirement = () => {
		if (newRequirement.trim() !== '') {
			const updatedRequirements = [...formData.requirements, newRequirement];
			handleInputChange('requirements', updatedRequirements);
			setNewRequirement('');
			setShowTextField(false);
		}
	};

	// Save edited requirement
	const handleSaveRequirement = () => {
		if (editIndex !== null) {
			const updatedRequirements = formData.requirements.map((req, idx) =>
				idx === editIndex ? newRequirement : req
			);
			handleInputChange('requirements', updatedRequirements);
			setEditIndex(null);
			setNewRequirement('');
		}
	};

	// Delete requirement chip
	const handleDeleteRequirement = (index: number) => {
		const updatedRequirements = formData.requirements.filter(
			(_, idx) => idx !== index
		);
		handleInputChange('requirements', updatedRequirements);
	};

	// Handle quick-select button for visit charge
	const quickSelectVisitCharge = (amount: number) => {
		handleInputChange('visitCharge', amount);
	};
	// Add a new phone number
	const handleAddPhone = () => {
		if (newPhone.trim() !== '') {
			const updatedPhones = [...formData.phone, newPhone];
			handleInputChange('phone', updatedPhones);
			setNewPhone('');
		}
	};

	return (
		<Box className="p-6 space-y-6">
			{/* Name Section */}
			<div>
				<CustomTextField
					label="Name"
					name="name"
					value={formData.name}
					onChange={() => {}}
					fullWidth
					disabled
				/>
			</div>

			{/* Phone Numbers Section */}
			<div>
				{formData.phone && formData.phone.length > 0 ? (
					formData.phone.map((phone, index) => (
						<div className="mb-2">
							<CustomTextField
								key={index}
								label={`Phone ${index + 1}`}
								name={`phone-${index}`}
								value={phone}
								onChange={() => {}}
								fullWidth
								disabled
							/>
						</div>
					))
				) : (
					// If no phone numbers, render an input to add a new phone number
					<div className="flex items-center gap-2">
						<TextField
							label="Add Phone Number"
							size="small"
							value={newPhone}
							onChange={e => setNewPhone(e.target.value)}
							fullWidth
						/>
						<Button variant="outlined" onClick={handleAddPhone}>
							Add
						</Button>
					</div>
				)}
			</div>

			{/* Project Location Section */}
			<div>
				<CustomSelect
					label="Project Location"
					name="projectLocation"
					value={formData.projectLocation}
					onChange={e => handleInputChange('projectLocation', e.target.value)}
					options={[
						{ value: 'Inside', label: 'Inside' },
						{ value: 'Outside', label: 'Outside' },
					]}
					clearable
				/>
			</div>

			{/* Project Status Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Box>
					<InputLabel id="project-status-label">Project Status</InputLabel>
					<Select
						labelId="project-status-label"
						size="small"
						value={formData.projectStatus.status}
						onChange={e => handleStatusChange(e.target.value)}
						fullWidth
					>
						{statusOptions.map(status => (
							<MenuItem key={status} value={status}>
								{status}
							</MenuItem>
						))}
					</Select>
				</Box>

				<Box>
					<InputLabel id="project-substatus-label">Sub Status</InputLabel>
					<Select
						labelId="project-substatus-label"
						value={formData.projectStatus.subStatus}
						size="small"
						onChange={e =>
							handleInputChange('projectStatus', {
								...formData.projectStatus,
								subStatus: e.target.value,
							})
						}
						fullWidth
						disabled={!formData.projectStatus.status}
					>
						{subStatusOptions[formData.projectStatus.status]?.map(subStatus => (
							<MenuItem key={subStatus} value={subStatus}>
								{subStatus}
							</MenuItem>
						))}
					</Select>
				</Box>
			</div>

			{/* Requirements Section */}
			<div>
				<Box className="flex flex-wrap gap-2 mb-2">
					{formData.requirements.map((requirement, index) => (
						<Chip
							key={index}
							label={
								editIndex === index ? (
									<>
										<TextField
											value={newRequirement}
											onChange={e => setNewRequirement(e.target.value)}
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
							onClick={() => {
								setEditIndex(index);
								setNewRequirement(requirement);
							}}
							deleteIcon={<CloseIcon />}
							sx={{ backgroundColor: '#f0f4f7', padding: '5px' }}
						/>
					))}
					{showTextField ? (
						<div className="flex items-center gap-2">
							<TextField
								label="Add Requirement"
								size="small"
								value={newRequirement}
								onChange={e => setNewRequirement(e.target.value)}
								sx={{ flexGrow: 1 }}
							/>
							<Button variant="outlined" size="medium" onClick={addRequirement}>
								Add
							</Button>
						</div>
					) : (
						<IconButton onClick={() => setShowTextField(true)}>
							<AddIcon />
						</IconButton>
					)}
				</Box>
			</div>

			{/* Visit Charge Section with Quick Select Buttons */}
			<div>
				<div className="flex items-center gap-2">
					<CustomTextField
						label="Visit Charge (BDT)"
						name="visitCharge"
						value={formData.visitCharge.toString()}
						onChange={e =>
							handleInputChange('visitCharge', parseFloat(e.target.value))
						}
						fullWidth
						type="number"
					/>
					{/* Quick Select Buttons */}
					{[500, 800, 1000, 1500, 3000, 5000].map(amount => (
						<Button
							key={amount}
							variant="outlined"
							size="small"
							onClick={() => quickSelectVisitCharge(amount)}
						>
							{amount}
						</Button>
					))}
				</div>
			</div>

			{/* Comment Section */}
			<div>
				<CustomTextField
					label="Comment"
					name="comment"
					value={formData.comment}
					onChange={e => handleInputChange('comment', e.target.value)}
					fullWidth
					multiline
					rows={4}
				/>
			</div>
		</Box>
	);
};

export default AdditionalDetailsStep;
