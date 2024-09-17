// src/components/Reminders.tsx
import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

interface RemindersProps {
  reminders: string[];
  newReminder: string;
  setNewReminder: (reminder: string) => void;
  showAllReminders: boolean;
  setShowAllReminders: (showAll: boolean) => void;
  handleEditReminder: (index: number) => void;
  handleSaveReminder: () => void;
  handleAddReminder: () => void;
  editReminderIndex: number | null;
}

const Reminders: React.FC<RemindersProps> = ({
  reminders,
  newReminder,
  setNewReminder,
  showAllReminders,
  setShowAllReminders,
  handleEditReminder,
  handleSaveReminder,
  handleAddReminder,
  editReminderIndex,
}) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2">Follow-up:</Typography>
      {(showAllReminders ? reminders : reminders.slice(0, 1)).map((reminder, index) => (
        <div key={index} className="flex items-center mb-2">
          {editReminderIndex === index ? (
            <>
              <TextField
                value={reminder}
                onChange={(e) => setNewReminder(e.target.value)}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <IconButton size="small" onClick={handleSaveReminder}>
                <DoneIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {reminder}
              </Typography>
              <IconButton size="small" onClick={() => handleEditReminder(index)}>
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
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
        />
        <Button
          variant="outlined"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleAddReminder}
        >
          Add
        </Button>
      </div>
    </Box>
  );
};

export default Reminders;
