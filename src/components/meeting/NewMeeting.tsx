import React, { useEffect, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	Stepper,
	Step,
	StepLabel,
	Button,
} from '@mui/material';
import { useFixMeetingMutation } from '../../features/meeting/meetinApi';
import { useCreateLeadWithNumberMutation } from '../../features/conversation/conversationApi';
import AdditionalDetailsStep from '../leadCenter/creStatus/statusModal/steps/AdditionalDetailsStep';
import AddressStep from '../leadCenter/creStatus/statusModal/steps/AddressStep';
import SimplifiedMeetingsSlot from '../leadCenter/creStatus/statusModal/steps/SimplifiedMeetingsSlot';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useGetDepartmentByIdQuery } from '../../features/auth/department/departmentAPI';

const NewMeeting: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
	const [activeStep, setActiveStep] = useState(0); // State to track the current step
	const [isStepValid, setIsStepValid] = useState(false); // State to track step validation
	const { user } = useSelector((state: RootState) => state.auth);
	const [cre, setCre] = useState<string>('');
	const { data: departments } = useGetDepartmentByIdQuery(
		user?.departmentId || '',
		{
			skip: !user?.departmentId,
		}
	);

	// Combined state for lead and meeting data
	const [formData, setFormData] = useState({
		// Lead data
		name: '',
		phone: [],
		requirements: [],
		projectStatus: { status: '', subStatus: '' },
		address: { district: '', division: '', area: '', address: '' },
		source: 'Phone',
		cre: '',

		// Meeting data
		leadId: '', // Will be set after lead creation
		date: '', // Filled in Step 2
		slot: '', // Filled in Step 2
		salesExecutive: '', // Filled in Step 2
		status: 'Fixed', // Default status
		visitCharge: 0, // Updated in Step 3
		comment: { text: '', images: [] },
		projectLocation: 'Inside',
	});

	useEffect(() => {
		// check if the department has a cre role
		const creRole = departments?.roles.find(role => role.roleName === 'CRE');

		// check if the user has the cre role
		const userHasCreRole = user?.roleId === creRole?._id;

		if (userHasCreRole) {
			setFormData(prev => ({
				...prev,
				cre: user?._id || '',
			}));
		}
	}, [departments, user?._id, user?.roleId]);

	// API mutations
	const [createLead] = useCreateLeadWithNumberMutation();
	const [fixMeeting] = useFixMeetingMutation();

	// Step validation functions
	const validateAddressStep = () => {
		const { address } = formData;
		return (
			!!address.division && // Check if division is not empty
			!!address.district && // Check if district is not empty
			!!address.area && // Check if area is not empty
			!!address.address // Check if specific address is not empty
		);
	};

	const validateSlotStep = () => {
		return (
			!!formData.date && // Check if date is selected
			!!formData.slot && // Check if slot is selected
			!!formData.salesExecutive // Check if sales executive is selected
		);
	};

	const validateAdditionalDetailsStep = () => {
		return (
			(formData.visitCharge ?? 0) > 0 && // Check if visit charge is greater than 0
			!!formData.projectStatus?.status && // Check if project status is selected
			!!formData.requirements && // Check if requirements array exists
			formData.requirements.length > 0 // Check if at least one requirement is added
		);
	};

	// Validate the current step
	React.useEffect(() => {
		let valid = false;
		if (activeStep === 0) valid = validateAddressStep();
		if (activeStep === 1) valid = validateSlotStep();
		if (activeStep === 2) valid = validateAdditionalDetailsStep();
		setIsStepValid(valid);
		console.log(valid);
	}, [activeStep, formData]);

	// Handle next step
	const handleNext = async () => {
		if (activeStep === steps.length - 1) {
			// Submit logic
			try {
				console.log(formData);
				// Step 1: Create a new lead
				const leadResponse = await createLead({
					leadData: {
						name: formData.name,
						phone: formData.phone[0],
						source: formData.source,
						cre: formData.cre,
					},
				}).unwrap();
				const newLeadId = leadResponse?.lead?._id; // Assuming the API returns the created lead ID
				console.log(newLeadId);

				// Step 2: Fix the meeting for the newly created lead
				await fixMeeting({
					leadId: newLeadId,
					date: formData.date,
					slot: formData.slot,
					salesExecutive: formData.salesExecutive,
					status: 'Fixed',
					visitCharge: formData.visitCharge,
					comment: formData.comment,
					projectLocation: formData.projectLocation,
					address: formData.address,
					projectStatus: formData.projectStatus,
					requirements: formData.requirements,
				}).unwrap();

				// Reset the form and close the modal
				setActiveStep(0);
				setIsModalOpen(false);
				// clear the form data
				setFormData({
					// Lead data
					name: '',
					phone: [],
					requirements: [],
					projectStatus: { status: '', subStatus: '' },
					address: { district: '', division: '', area: '', address: '' },
					source: 'Phone',
					cre: '',

					// Meeting data
					leadId: '', // Will be set after lead creation
					date: '', // Filled in Step 2
					slot: '', // Filled in Step 2
					salesExecutive: '', // Filled in Step 2
					status: 'Fixed', // Default status
					visitCharge: 0, // Updated in Step 3
					comment: { text: '', images: [] },
					projectLocation: 'Inside',
				});
			} catch (error) {
				console.error('Error creating lead or fixing meeting:', error);
			}
		} else {
			setActiveStep(prevStep => prevStep + 1);
		}
	};

	// Handle back step
	const handleBack = () => {
		if (activeStep > 0) {
			setActiveStep(prevStep => prevStep - 1);
		}
	};

	// Steps for the stepper
	const steps = ['Address', 'Select Slot & Executive', 'Additional Details'];

	// Handle slot selection
	const handleSlotSelect = ({
		slot,
		salesExecutiveId,
		date,
	}: {
		slot: string;
		salesExecutiveId: string;
		date: string;
	}) => {
		setFormData(prevData => ({
			...prevData,
			slot,
			salesExecutive: salesExecutiveId,
			date,
		}));
	};
	console.log(formData);

	return (
		<>
			{/* Button to open the modal */}
			<Button variant="contained" onClick={() => setIsModalOpen(true)}>
				Fix New Meeting
			</Button>

			{/* Modal for the multi-step form */}
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<Box className="bg-white p-4 rounded-lg shadow-md max-w-screen-lg mx-auto">
					<Typography variant="h6">Fix a New Meeting</Typography>
					<Stepper activeStep={activeStep}>
						{steps.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<Box className="mt-4">
						{activeStep === 0 && (
							<AddressStep
								defaultAddress={formData.address}
								onChange={updatedAddress => {
									setFormData(prevData => ({
										...prevData,
										address: updatedAddress,
									}));
								}}
							/>
						)}
						{activeStep === 1 && (
							<SimplifiedMeetingsSlot onSlotSelect={handleSlotSelect} />
						)}
						{activeStep === 2 && (
							<AdditionalDetailsStep
								defaultData={{
									name: formData.name,
									phone: formData.phone,
									projectLocation: 'Inside', // Default value
									projectStatus: formData.projectStatus,
									requirements: formData.requirements,
									visitCharge: formData.visitCharge || 0,
									comment: formData.comment?.text || '',
									cre: formData.cre || '',
								}}
								sourceField={true}
								creField={user?.type === 'Admin'}
								onChange={updatedData => {
									setFormData(prevData => ({
										...prevData,
										name: updatedData.name || prevData.name,
										phone: updatedData.phone || prevData.phone,
										projectStatus:
											updatedData.projectStatus || prevData.projectStatus,
										cre: updatedData.cre || prevData.cre,
										requirements:
											updatedData.requirements || prevData.requirements,
										visitCharge:
											updatedData.visitCharge || prevData.visitCharge,
										projectLocation:
											updatedData.projectLocation || prevData.projectLocation,
										source: updatedData.source || prevData.source,
										comment: {
											...prevData.comment,
											text: updatedData.comment || prevData.comment.text,
										},
									}));
								}}
							/>
						)}
					</Box>

					<Box className="mt-4 flex justify-between">
						<Button disabled={activeStep === 0} onClick={handleBack}>
							Back
						</Button>
						<Button
							variant="contained"
							onClick={handleNext}
							disabled={!isStepValid}
						>
							{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default NewMeeting;
