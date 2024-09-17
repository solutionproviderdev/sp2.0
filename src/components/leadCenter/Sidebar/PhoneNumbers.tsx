// src/components/PhoneNumbers.tsx

import React from 'react';
import { Typography, TextField, IconButton, Button } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

interface PhoneNumbersProps {
  numbers: string[];
  showAllNumbers: boolean;
  setShowAllNumbers: React.Dispatch<React.SetStateAction<boolean>>;
  addNumber: (data: any) => void;
  handleNumberChange: (index: number, value: string) => void;
  handleEditNumber: (index: number) => void;
  handleSaveEdit: () => void;
  editIndex: number | null;
}

const PhoneNumbers: React.FC<PhoneNumbersProps> = ({
  numbers,
  showAllNumbers,
  setShowAllNumbers,
  addNumber,
  handleNumberChange,
  handleEditNumber,
  handleSaveEdit,
  editIndex
}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col my-2">
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        📞 Phone Numbers:
      </Typography>
      {(showAllNumbers ? numbers : numbers.slice(0, 1)).map((number, index) => (
        <div key={index} className="flex items-center mb-2">
          {editIndex === index ? (
            <>
              <TextField
                value={number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <IconButton size="small" onClick={handleSaveEdit}>
                <DoneIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {number}
              </Typography>
              <IconButton size="small" onClick={() => handleEditNumber(index)}>
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
      <form onSubmit={handleSubmit(addNumber)} className="flex items-center mb-2">
        <Controller
          name="newNumber"
          control={control}
          rules={{
            required: 'Number is required',
            pattern: {
              value: /^[0-9]{10,15}$/,
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
        <Button variant="outlined" size="small" startIcon={<AddIcon />} type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default PhoneNumbers;
