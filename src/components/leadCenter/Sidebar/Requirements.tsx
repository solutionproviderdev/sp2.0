
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useGetSingleLeadQuery, useUpdateRequirementMutation } from '../../../features/conversation/conversationApi';

interface Conversation {
  id: string;
}

interface InboxProps {
  conversation: Conversation | null;
}

const Requirements: React.FC<InboxProps> = ({ conversation }) => {
  // Fetch lead data (requirements) based on the conversation (lead) ID
  console.log('pitoitary gland ', conversation)
  const { data, error, isLoading, refetch } = useGetSingleLeadQuery(conversation ?? '');

  const [updateRequirement, { isLoading: isUpdating, isSuccess, isError }] = useUpdateRequirementMutation();

  // Local state to manage the requirements list
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState<string>('');
  const [editRequirementIndex, setEditRequirementIndex] = useState<number | null>(null);
  const [showAllRequirements, setShowAllRequirements] = useState<boolean>(false);

  // Update local state when data is fetched
  useEffect(() => {
    if (data && data && data?.requirements) {
      setRequirements(data?.requirements); // Load requirements from the lead data
    }
  }, [data]);

  // Add new requirement (without overwriting)
  const addRequirement = async () => {
    if (newRequirement.trim() !== '') {
      const updatedRequirements = [...requirements, newRequirement]; // Append new requirement to the list
      setRequirements(updatedRequirements);
      setNewRequirement('');

      // Update requirements in the backend
      await updateRequirement({ id: conversation, requirements: updatedRequirements });
      refetch(); // Refetch to get the latest data
    }
  };

  // Edit requirement
  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = requirements.map((req, i) => (i === index ? value : req));
    setRequirements(updatedRequirements);
  };

  // Handle saving updated requirement
  const handleSaveRequirement = async () => {
    if (editRequirementIndex !== null) {
      if (requirements[editRequirementIndex].trim() === '') {
        setRequirements(requirements.filter((_, i) => i !== editRequirementIndex)); // Remove empty requirement
      }
      setEditRequirementIndex(null);

      // Update requirements in the backend
      await updateRequirement({ id: conversation, requirements });
      refetch(); // Refetch to get the latest data
    }
  };

  // Remove empty requirements
  const handleRemoveRequirement = async (index: number) => {
    const updatedRequirements = requirements.filter((_, i) => i !== index); // Remove requirement by index
    setRequirements(updatedRequirements);

    // Update the backend with the updated list
    await updateRequirement({ id: conversation, requirements: updatedRequirements });
    refetch();
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="body2">📋 Requirements:</Typography>

      {(showAllRequirements ? requirements : requirements.slice(0, 1)).map((requirement, index) => (
        <div key={index} className="flex items-center mb-2">
          {editRequirementIndex === index ? (
            <>
              <TextField
                value={requirement}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <IconButton size="small" onClick={handleSaveRequirement}>
                <DoneIcon />
              </IconButton>
              <Button onClick={() => handleRemoveRequirement(index)} size="small" color="error">
                Remove
              </Button>
            </>
          ) : (

            <>
              <Typography
                variant="body2"
                sx={{
                  flexGrow: 1,
                  padding: '8px',
                  backgroundColor: '#e0f7fa',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {requirement}
              </Typography>

              <IconButton
                size="small"
                sx={{
                  color: '#0288d1',
                  '&:hover': { color: '#01579b' },
                }}
                onClick={() => setEditRequirementIndex(index)}
              >
                <EditIcon />
              </IconButton>
            </>

          )}
        </div>
      ))}

      {!showAllRequirements && requirements.length > 1 && (
        <Button onClick={() => setShowAllRequirements(true)} size="small">
          Show All
        </Button>
      )}
      {showAllRequirements && (
        <Button onClick={() => setShowAllRequirements(false)} size="small">
          Show Less
        </Button>
      )}

      {/* Add Requirement Input */}
      <div className="flex items-center mb-2">
        <TextField
          label="Add Requirement"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={addRequirement}>
          Add
        </Button>
      </div>
    </Box>
  );
};

export default Requirements;
