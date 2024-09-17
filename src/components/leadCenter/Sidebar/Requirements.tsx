// src/components/Requirements.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';




const Requirements= () => {
  const [showAllRequirements, setShowAllRequirements] = useState<boolean>(false);

  const [requirements, setRequirements] = useState<string[]>(['Kitchen', 'Bedroom']);
  const [newRequirement, setNewRequirement] = useState<string>('');
  const [editRequirementIndex, setEditRequirementIndex] = useState<number | null>(null);


  const addRequirement = () => {
    if (newRequirement.trim() !== '') {
      setRequirements([...requirements, newRequirement]);
      setNewRequirement('');
    }
  };

  const handleRequirementChange = (index: number, value: string) => {
    setRequirements(requirements.map((req, i) => (i === index ? value : req)));
  };

  const handleEditRequirement = (index: number) => {
    setEditRequirementIndex(index);
  };

  const handleSaveRequirement = () => {
    if (editRequirementIndex !== null) {
      if (requirements[editRequirementIndex].trim() === '') {
        setRequirements(requirements.filter((_, i) => i !== editRequirementIndex));
      }
      setEditRequirementIndex(null);
    }
  };
  return (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body2">Requirements:</Typography>
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
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {requirement}
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditRequirement(index)}>
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
            <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addRequirement}>
              Add
            </Button>
          </div>
        </Box>
  );
};

export default Requirements;
