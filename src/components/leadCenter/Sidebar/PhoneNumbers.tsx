import React, { useState, useEffect } from 'react';
import {
	Typography,
	TextField,
	IconButton,
	Button,
	Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import {
	useAddPhoneMutation,
	useUpdateLeadsMutation,
} from '../../../features/conversation/conversationApi';

interface PhoneNumbersProps {
	leadId: string | undefined;
	phoneNumbers: string[] | undefined;
}

const PhoneNumbers: React.FC<PhoneNumbersProps> = ({
	leadId,
	phoneNumbers,
}) => {
	const [numbers, setNumbers] = useState<string[]>([]);
	const [editIndex, setEditIndex] = useState<number | null>(null);
	const [newNumber, setNewNumber] = useState<string>('');
	const [showTextField, setShowTextField] = useState<boolean>(false);
	const [alert, setAlert] = useState<{
		message: string;
		severity: 'error' | 'success';
	} | null>(null);

	const [addPhone] = useAddPhoneMutation();
	const [updateLeads] = useUpdateLeadsMutation();

	useEffect(() => {
		if (phoneNumbers) {
			setNumbers(phoneNumbers);
		}
	}, [phoneNumbers]);

	const handleAddNumber = async () => {
		if (newNumber) {
			try {
				console.log(typeof newNumber, newNumber);
				const response = await addPhone({
					id: leadId,
					phoneNumber: newNumber,
				});
				if (response?.error) {
					setAlert({
						message: response.error.data?.msg || 'Failed to add number.',
						severity: 'error',
					});
				} else {
					setNumbers(prev => [...prev, newNumber]);
					setAlert({
						message: 'Phone number added successfully',
						severity: 'success',
					});
					setNewNumber('');
					setShowTextField(false);
				}
			} catch {
				setAlert({
					message: 'Failed to add phone number due to a network error',
					severity: 'error',
				});
			}
		}
	};

	const handleEditNumber = async (index: number, updatedNumber: string) => {
		if (updatedNumber) {
			const updatedNumbers = [...numbers];
			updatedNumbers[index] = updatedNumber;
			// check if leadId and UpdatedNumbers are defined
			if (leadId && updatedNumbers) {
				try {
					const response = await updateLeads({
						id: leadId,
						data: { phone: updatedNumbers },
					});
					if (response?.error) {
						setAlert({
							message:
								response.error.data?.msg || 'Failed to update phone number',
							severity: 'error',
						});
					} else {
						setNumbers(updatedNumbers);
						setAlert({
							message: 'Phone number updated successfully',
							severity: 'success',
						});
						setEditIndex(null);
					}
				} catch {
					setAlert({
						message: 'Failed to update phone number due to a network error',
						severity: 'error',
					});
				}
			}
		}
	};

	return (
		<div className="flex flex-col my-2 p-2">
			<div className="flex items-center justify-between">
				<Typography variant="body1">📞 Phone Numbers</Typography>
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

			{numbers.map((number, index) => (
				<div key={index} className="flex items-center mb-2">
					{editIndex === index ? (
						<>
							<TextField
								value={number}
								onChange={e =>
									setNumbers(
										numbers.map((num, i) =>
											i === index ? e.target.value : num
										)
									)
								}
								size="small"
								sx={{ flexGrow: 1, marginRight: 1 }}
							/>
							<IconButton
								onClick={() => handleEditNumber(index, numbers[index])}
							>
								<DoneIcon />
							</IconButton>
						</>
					) : (
						<>
							<Typography
								variant="body2"
								sx={{
									flexGrow: 1,
									padding: '8px',
									borderLeft: 1,
									backgroundColor: '#f0f4f7',
									// borderRadius: '5px',
								}}
							>
								{number}
							</Typography>
							<IconButton
								size="small"
								sx={{ color: '#0288d1', marginLeft: 1 }}
								onClick={() => setEditIndex(index)}
							>
								<EditIcon />
							</IconButton>
						</>
					)}
				</div>
			))}

			{showTextField && (
				<div className="flex items-center mb-2">
					<TextField
						label="Add Number"
						size="small"
						sx={{ flexGrow: 1, marginRight: 1 }}
						value={newNumber}
						onChange={e => setNewNumber(e.target.value)}
					/>
					<Button variant="outlined" size="medium" onClick={handleAddNumber}>
						Add
					</Button>
				</div>
			)}
		</div>
	);
};

export default PhoneNumbers;
