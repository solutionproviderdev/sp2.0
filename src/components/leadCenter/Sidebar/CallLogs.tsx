

import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface CallLog {
  name: string;
  details: string;
  date: string;
}

const CallLogs: React.FC = () => {
  // Local state to manage the call logs list
  const [callLogs, setCallLogs] = useState<CallLog[]>([
    { name: 'John Doe', details: 'Duration: 2:30 min', date: '25-Aug, 10:44 am' },

  ]);
  const [newCallLog, setNewCallLog] = useState<CallLog>({ name: '', details: '', date: '' });
  const [showAllCallLogs, setShowAllCallLogs] = useState<boolean>(false);


  // Add a new call log
  const addCallLog = () => {
    if (newCallLog.name.trim() && newCallLog.details.trim() && newCallLog.date.trim()) {
      setCallLogs([...callLogs, newCallLog]);
      setNewCallLog({ name: '', details: '', date: '' }); // Clear input
    }
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="body2" sx={{}}>
      ☎️ Call Logs:
      </Typography>

      {/* Display Call Logs */}
      <List>
        {(showAllCallLogs ? callLogs : callLogs.slice(0, 1)).map((log, index) => (
          <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {log.name}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="body2">{log.details}</Typography>
              <Typography variant="body2" sx={{ textAlign: 'right', color: 'gray' }}>
                {log.date}
              </Typography>
            </Box>

          </ListItem>
        ))}
      </List>

      {/* Show/Hide All Call Logs Button */}
      {!showAllCallLogs && callLogs.length > 1 && (
        <Button onClick={() => setShowAllCallLogs(true)} size="small">
          Show All
        </Button>
      )}
      {showAllCallLogs && (
        <Button onClick={() => setShowAllCallLogs(false)} size="small">
          Show Less
        </Button>
      )}

      {/* Add Call Log Input */}
      <div className="flex items-center mb-2">
        <TextField
          label="Name"
          value={newCallLog.name}
          onChange={(e) => setNewCallLog({ ...newCallLog, name: e.target.value })}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <TextField
          label="Durations"
          value={newCallLog.details}
          onChange={(e) => setNewCallLog({ ...newCallLog, details: e.target.value })}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1, marginTop: 1 }}
        />
        <TextField
          label="Date"
          value={newCallLog.date}
          onChange={(e) => setNewCallLog({ ...newCallLog, date: e.target.value })}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={addCallLog}>
          Add
        </Button>
      </div>

    </Box>
  );
};

export default CallLogs;
