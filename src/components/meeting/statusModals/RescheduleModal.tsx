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
import AdditionalDetailsStep from '../../leadCenter/creStatus/statusModal/steps/AdditionalDetailsStep';
import SimplifiedMeetingsSlot from '../../leadCenter/creStatus/statusModal/steps/SimplifiedMeetingsSlot';
import {
	useGetMeetingByIdQuery,
	useRescheduleMeetingMutation,
} from '../../../features/meeting/meetinApi';

interface RescheduleModalProps {
	isOpen: boolean;
	onClose: () => void;
	meetingId: string;
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({
	isOpen,
	onClose,
	meetingId,
}) => {
	const { data: meeting, isLoading } = useGetMeetingByIdQuery(meetingId);
	const [activeStep, setActiveStep] = useState(0);
	const [isStepValid, setIsStepValid] = useState(false);
	const [meetingData, setMeetingData] = useState({
		date: meeting?.date || '',
		slot: meeting?.slot || '',
		salesExecutive: meeting?.salesExecutive || '',
		comment: {
			text: '',
			images: [],
		},
	});
	const [rescheduleMeeting, { isLoading: isSubmitting, error }] =
		useRescheduleMeetingMutation();

	// Step validation functions
	const validateSlotStep = () => {
		return meetingData.date && meetingData.slot && meetingData.salesExecutive;
	};

	const validateAdditionalDetailsStep = () => {
		return true; // Add your specific validation logic if needed
	};

	useEffect(() => {
		let valid = false;
		if (activeStep === 0) valid = validateSlotStep();
		if (activeStep === 1) valid = validateAdditionalDetailsStep();
		setIsStepValid(valid);
	}, [activeStep, meetingData]);

	const handleNext = async () => {
		if (activeStep === steps.length - 1) {
			try {
				await rescheduleMeeting({ id: meetingId, ...meetingData }).unwrap();
				console.log('Rescheduled meeting successfully:', meetingData);
				onClose(); // Close the modal on successful submission
			} catch (error) {
				console.error('Error rescheduling meeting:', error);
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

	const steps = ['Select Slot & Executive', 'Additional Details'];

	const handleSlotSelect = ({
		slot,
		salesExecutiveId,
		date,
	}: {
		slot: string;
		salesExecutiveId: string;
		date: string;
	}) => {
		console.log('Selected Slot:', slot);
		console.log('Selected Sales Executive ID:', salesExecutiveId);
		console.log('Selected Date:', date);
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
				<Typography variant="h6">Reschedule Meeting</Typography>
				<Stepper activeStep={activeStep}>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<Box className="mt-4">
					{activeStep === 0 && (
						<SimplifiedMeetingsSlot onSlotSelect={handleSlotSelect} />
					)}
					{activeStep === 1 && (
						<AdditionalDetailsStep
							defaultData={{
								name: meeting?.lead?.name || '',
								phone: meeting?.lead?.phone || [],
								projectLocation: meeting?.lead?.projectLocation || 'Inside',
								projectStatus: meeting?.lead?.projectStatus || {
									status: '',
									subStatus: '',
								},
								requirements: meeting?.lead?.requirements || [],
								visitCharge: meetingData.visitCharge || 0,
								comment: meetingData.comment?.text || '',
							}}
							onChange={updatedData =>
								setMeetingData(prevData => ({
									...prevData,
									...updatedData,
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
						disabled={!isStepValid || isSubmitting}
					>
						{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
					</Button>
				</Box>

				{error && (
					<Typography color="error" className="mt-2">
						Error: {error.message || 'Failed to reschedule meeting.'}
					</Typography>
				)}
			</Box>
		</Modal>
	);
};

export default RescheduleModal;
