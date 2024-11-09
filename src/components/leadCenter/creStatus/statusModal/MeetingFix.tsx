import React, { useState, useEffect } from 'react';
import {
	Modal,
	Box,
	Typography,
	Stepper,
	Step,
	StepLabel,
	Button,
} from '@mui/material';
import AddressStep from './steps/AddressStep';
import { useGetSingleLeadQuery } from '../../../../features/conversation/conversationApi';
import {
	MeetingPayload,
	useFixMeetingMutation,
} from '../../../../features/meeting/meetinApi';
import SimplifiedMeetingsSlot from './steps/SimplifiedMeetingsSlot';
import AdditionalDetailsStep from './steps/AdditionalDetailsStep';

interface FixMeetingModalProps {
	isOpen: boolean;
	onClose: () => void;
	leadId: string;
}

const FixMeetingModal: React.FC<FixMeetingModalProps> = ({
	isOpen,
	onClose,
	leadId,
}) => {
	const { data: lead, isLoading } = useGetSingleLeadQuery(leadId);
	const [activeStep, setActiveStep] = useState(0);
	const [isStepValid, setIsStepValid] = useState(false);

	const [meetingData, setMeetingData] = useState<MeetingPayload>({
		leadId: leadId,
		date: '', // Filled in Step 2
		slot: '', // Filled in Step 2
		salesExecutive: '', // Filled in Step 2
		status: 'Fixed', // Default status
		visitCharge: 0, // Updated in Step 3
		name: lead?.name || '', // From Lead data
		requirements: lead?.requirements || [], // From Lead data
		projectStatus: {
			status: lead?.projectStatus?.status || '',
			subStatus: lead?.projectStatus?.subStatus || '',
		},
		comment: {
			text: '',
			images: [],
		},
		address: {
			district: lead?.address?.district || '',
			division: lead?.address?.division || '',
			area: lead?.address?.area || '',
			address: lead?.address?.address || '',
		},
	});

	const [fixMeeting] = useFixMeetingMutation();

	useEffect(() => {
		if (lead) {
			setMeetingData(prevData => ({
				...prevData,
				name: lead.name,
				requirements: lead.requirements || [],
				projectStatus: {
					status: lead.projectStatus?.status || '',
					subStatus: lead.projectStatus?.subStatus || '',
				},
				address: {
					district: lead.address?.district || '',
					division: lead.address?.division || '',
					area: lead.address?.area || '',
					address: lead.address?.address || '',
				},
			}));
		}
	}, [lead]);

	// Step validation functions
	const validateAddressStep = () => {
		const { address } = meetingData;
		return (
			address.division && address.district && address.area && address.address
		);
	};

	const validateSlotStep = () => {
		return meetingData.date && meetingData.slot && meetingData.salesExecutive;
	};

	const validateAdditionalDetailsStep = () => {
		return (
			meetingData.visitCharge > 0 &&
			meetingData.projectStatus.status &&
			meetingData.requirements.length > 0
		);
	};

	// Validate the current step
	useEffect(() => {
		let valid = false;
		if (activeStep === 0) valid = validateAddressStep();
		if (activeStep === 1) valid = validateSlotStep();
		if (activeStep === 2) valid = validateAdditionalDetailsStep();
		setIsStepValid(valid);
	}, [activeStep, meetingData]);

	const handleNext = async () => {
		if (activeStep === steps.length - 1) {
			try {
				await fixMeeting(meetingData).unwrap();
				setActiveStep(0);
				onClose();
			} catch (error) {
				console.error('Error fixing meeting:', error);
			}
		} else {
			setActiveStep(prevStep => prevStep + 1);
		}
	};

	const handleBack = () => {
		if (activeStep > 0) {
			setActiveStep(prevStep => prevStep - 1);
		}
	};

	const steps = ['Address', 'Select Slot & Executive', 'Additional Details'];

	const handleSlotSelect = ({
		slot,
		salesExecutiveId,
		date,
	}: {
		slot: string;
		salesExecutiveId: string;
		date: string;
	}) => {
		setMeetingData(prevData => ({
			...prevData,
			slot,
			salesExecutive: salesExecutiveId,
			date,
		}));
	};

	return (
		<Modal open={isOpen} onClose={onClose}>
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
					{activeStep === 0 && lead && (
						<AddressStep
							defaultAddress={meetingData.address}
							lead={lead}
							onChange={updatedAddress =>
								setMeetingData(prevData => ({
									...prevData,
									address: updatedAddress,
								}))
							}
						/>
					)}
					{activeStep === 1 && (
						<SimplifiedMeetingsSlot onSlotSelect={handleSlotSelect} />
					)}
					{activeStep === 2 && (
						<AdditionalDetailsStep
							defaultData={{
								name: lead?.name || '',
								phone: lead?.phone || [],
								projectLocation: lead?.projectLocation || 'Inside',
								projectStatus: lead?.projectStatus || {
									status: '',
									subStatus: '',
								},
								requirements: lead?.requirements || [],
								visitCharge: meetingData.visitCharge || 0,
								comment: meetingData.comment?.text || '',
							}}
							onChange={updatedData =>
								setMeetingData(prevData => ({
									...prevData,
									...updatedData,
									projectStatus: {
										status:
											updatedData.projectStatus?.status ||
											prevData.projectStatus.status,
										subStatus:
											updatedData.projectStatus?.subStatus ||
											prevData.projectStatus.subStatus,
									},
									comment: {
										...prevData.comment,
										text: updatedData.comment || prevData.comment.text,
									},
								}))
							}
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
	);
};

export default FixMeetingModal;
