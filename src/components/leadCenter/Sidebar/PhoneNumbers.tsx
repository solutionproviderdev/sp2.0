import React, { useState, useEffect } from 'react';
import { Typography, TextField, IconButton, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useAddPhoneMutation, useUpdateLeadsMutation } from '../../../features/conversation/conversationApi';

interface PhoneNumbersProps {
  leadId: string | null;
  phoneNumbers: string[];
}

const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ leadId, phoneNumbers }) => {
  const [numbers, setNumbers] = useState<string[]>([]); // Store phone numbers
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which number is being edited
  const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false); // Toggle showing all numbers
  const [newNumber, setNewNumber] = useState<string>(''); // Store new phone number input
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // Store API response message
  const [alertSeverity, setAlertSeverity] = useState<'error' | 'success' | undefined>(undefined); // Alert type

  const [addPhone] = useAddPhoneMutation(); // Mutation for adding phone numbers
  const [updateLeads] = useUpdateLeadsMutation(); // Mutation for updating phone numbers

  // Initialize phone numbers from props when the component is mounted
  useEffect(() => {
    if (phoneNumbers) {
      setNumbers(phoneNumbers);
    }
  }, [phoneNumbers]);

  // Add new phone number
  const addNumber = async () => {
    if (newNumber) {
      try {
        const response = await addPhone({ id: leadId, phoneNumber: {phoneNumber: newNumber} });
        if (response?.error) {
          setAlertMessage(response.error.data?.msg || 'Failed to add number.');
          setAlertSeverity('error');
        } else {
          const updatedNumbers = response.data?.updatedPhoneNumbers || [...numbers, newNumber];
          setNumbers(updatedNumbers);
          setAlertMessage('Phone number added successfully');
          setAlertSeverity('success');
          setNewNumber(''); // Clear input field
        }
      } catch {
        setAlertMessage('Failed to add phone number due to a network error');
        setAlertSeverity('error');
      }
    }
  };

  // Edit phone number
  const editNumber = async (index: number, updatedNumber: string) => {
    if (updatedNumber) {
      const updatedNumbers = [...numbers];
      updatedNumbers[index] = updatedNumber;

      try {
        const response = await updateLeads({ id: leadId, data: { phone: updatedNumbers } });
        if (response?.error) {
          setAlertMessage(response.error.data?.msg || 'Failed to update phone number');
          setAlertSeverity('error');
        } else {
          setNumbers(updatedNumbers); // Update local state with the updated numbers
          setAlertMessage('Phone number updated successfully');
          setAlertSeverity('success');
          setEditIndex(null); // Exit edit mode
        }
      } catch {
        setAlertMessage('Failed to update phone number due to a network error');
        setAlertSeverity('error');
      }
    }
  };

  return (
    <div className="flex flex-col my-1">
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        📞 Phone Numbers:
      </Typography>

      {/* Display success or error message */}
      {alertMessage && (
        <Alert severity={alertSeverity} onClose={() => setAlertMessage(null)}>
          {alertMessage}
        </Alert>
      )}

      {/* Display phone numbers */}
      {numbers.slice(0, showAllNumbers ? undefined : 1).map((number, index) => (
        <div key={index} className="flex items-center mb-2">
          {editIndex === index ? (
            <>
              <TextField
                value={number}
                onChange={(e) => setNumbers(numbers.map((num, i) => (i === index ? e.target.value : num)))}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <IconButton onClick={() => editNumber(index, numbers[index])}>
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
                  backgroundColor: '#e0f7fa',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {number}
              </Typography>

              <IconButton
                size="small"
                sx={{
                  padding: '6px',
                  borderRadius: '5px',
                  backgroundColor: '#e8f0fe',
                  borderLeft: 1,
                  color: '#0288d1',
                  '&:hover': { color: '#01579b' },
                }}
                onClick={() => setEditIndex(index)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </div>
      ))}

      {!showAllNumbers && numbers.length > 1 && (
        <Button onClick={() => setShowAllNumbers(true)} size="small">
          Show All
        </Button>
      )}
      {showAllNumbers && (
        <Button onClick={() => setShowAllNumbers(false)} size="small">
          Show Less
        </Button>
      )}

      {/* Add Phone Number Input */}
      <div className="flex items-center mb-2">
        <TextField
          label="Add Number"
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={addNumber}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumbers;
