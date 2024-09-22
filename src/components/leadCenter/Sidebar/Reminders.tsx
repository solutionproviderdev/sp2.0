
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useGetSingleLeadQuery, useUpdateRequirementMutation } from '../../../features/conversation/conversationApi';

interface Conversation {
  id: string;
}

interface RemindersProps {
  conversation: Conversation | null;
}

const Reminders: React.FC<RemindersProps> = ({ conversation }) => {
  // Fetch lead data (reminders) based on the conversation (lead) ID
  const { data, error, isLoading, refetch } = useGetSingleLeadQuery(conversation ?? '');
  const [updateRequirement, { isLoading: isUpdating ,isSuccess}] = useUpdateRequirementMutation();
// console.log('reminder save or not ',isSuccess)
  // Local state to manage reminders list
  const [reminders, setReminders] = useState<string[]>([]);
  const [newReminder, setNewReminder] = useState<string>('');
  const [editReminderIndex, setEditReminderIndex] = useState<number | null>(null);
  const [showAllReminders, setShowAllReminders] = useState<boolean>(false);

  // Load reminders from backend when the data is fetched
  useEffect(() => {
    if (data && data.reminders) {
      setReminders(data.reminders);
    }
  }, [data]);

  // Add a new reminder to the list and update the backend
  const addReminder = async () => {
    if (newReminder.trim() !== '') {
      const updatedReminders = [...reminders, newReminder]; // Append new reminder
      setReminders(updatedReminders);
      setNewReminder('');
      
      // Update the backend
      await updateRequirement({ id: conversation, reminders: updatedReminders });
      refetch();
    }
  };

  // Edit reminder in the list
  const handleReminderChange = (index: number, value: string) => {
    const updatedReminders = reminders.map((reminder, i) => (i === index ? value : reminder));
    setReminders(updatedReminders);
  };

  // Save updated reminder and update the backend
  const handleSaveReminder = async () => {
    if (editReminderIndex !== null) {
      if (reminders[editReminderIndex].trim() === '') {
        setReminders(reminders.filter((_, i) => i !== editReminderIndex)); // Remove empty reminder
      }
      setEditReminderIndex(null);

      // Update the backend
      await updateRequirement({ id: conversation, reminders:reminders });
      refetch();
    }
  };

  // Remove reminder and update the backend
  const handleRemoveReminder = async (index: number) => {
    const updatedReminders = reminders.filter((_, i) => i !== index); // Remove reminder by index
    setReminders(updatedReminders);

    // Update the backend
    await updateRequirement({ id: conversation, reminders: updatedReminders });
    refetch();
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="body2">🔔 Follow-up Reminders:</Typography>

      {(showAllReminders ? reminders : reminders.slice(0, 1)).map((reminder, index) => (
        <div key={index} className="flex items-center mb-2">
          {editReminderIndex === index ? (
            <>
              <TextField
                value={reminder}
                onChange={(e) => handleReminderChange(index, e.target.value)}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <IconButton size="small" onClick={handleSaveReminder}>
                <DoneIcon />
              </IconButton>
              <Button onClick={() => handleRemoveReminder(index)} size="small" color="error">
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
                {reminder}
              </Typography>
              <IconButton
                size="small"
                sx={{
                  color: '#0288d1',
                  '&:hover': { color: '#01579b' },
                }}
                onClick={() => setEditReminderIndex(index)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </div>
      ))}

      {!showAllReminders && reminders.length > 1 && (
        <Button onClick={() => setShowAllReminders(true)} size="small">
          Show All
        </Button>
      )}
      {showAllReminders && (
        <Button onClick={() => setShowAllReminders(false)} size="small">
          Show Less
        </Button>
      )}

      {/* Add Reminder Input */}
      <div className="flex items-center mb-2">
        <TextField
          label="New Reminder"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={addReminder}>
          Add
        </Button>
      </div>
    </Box>
  );
};

export default Reminders;
