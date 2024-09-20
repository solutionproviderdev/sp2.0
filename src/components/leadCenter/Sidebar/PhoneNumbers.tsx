
import React, { useState } from 'react';
import { Typography, TextField, IconButton, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

interface PhoneNumbersProps {
  conversation: { id: string } | null; // Assuming conversation contains an id
}

interface FormValues {
  newNumber: string;
}

const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ conversation }) => {
  // Local state to manage the phone numbers list
  const [numbers, setNumbers] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false);

  // React Hook Form
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>();

  // Add new number with form validation
  const addNumber = (data: FormValues) => {
    const newNumber = data.newNumber.trim();
    if (newNumber !== '') {
      const updatedNumbers = [...numbers, newNumber]; // Append new number to the list
      setNumbers(updatedNumbers);
      reset(); // Clear the input field
    }
  };

  // Save updated number with validation
  const handleSaveEdit = (index: number) => {
    if (errors[`editNumber-${index}`]) return; // Prevent saving if there's a validation error
    setEditIndex(null); // Exit edit mode
  };

  // Remove number
  const handleRemoveNumber = (index: number) => {
    const updatedNumbers = numbers.filter((_, i) => i !== index); // Remove the number by index
    setNumbers(updatedNumbers);
  };

  return (
    <div className="flex flex-col my-1">
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        📞 Phone Numbers:
      </Typography>
      {(showAllNumbers ? numbers : numbers.slice(0, 1)).map((number, index) => (
        <div key={index} className="flex items-center mb-2">
          {editIndex === index ? (
            <Controller
              name={`editNumber-${index}`} // Dynamic field name for validation
              control={control}
              defaultValue={number}
              rules={{
                required: 'Number is required',
                pattern: {
                  value: /^[0-9]{10,15}$/, // Validate 10-15 digit numbers
                  message: 'Invalid number format',
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field} // Let react-hook-form manage the value and onChange
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                    error={!!errors[`editNumber-${index}`]}
                    helperText={errors[`editNumber-${index}`]?.message || ''}
                  />
                  <IconButton size="small" onClick={() => handleSaveEdit(index)}>
                    <DoneIcon />
                  </IconButton>
                  <Button onClick={() => handleRemoveNumber(index)} size="small" color="error">
                    Remove
                  </Button>
                </>
              )}
            />
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  flexGrow: 1,
                  padding: '8px',
                  borderLeft:1,
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
                  borderLeft:1,
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

      {/* Add Phone Number Input with validation */}
      <form onSubmit={handleSubmit(addNumber)} className="flex items-center mb-2">
        <Controller
          name="newNumber"
          control={control}
          rules={{
            required: 'Number is required',
            pattern: {
              value: /^[0-9]{10,15}$/, // Validate 10-15 digit numbers
              message: 'Invalid number format',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Add Number"
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
              error={!!errors.newNumber}
              helperText={errors.newNumber ? errors.newNumber.message : ''}
            />
          )}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default PhoneNumbers;
