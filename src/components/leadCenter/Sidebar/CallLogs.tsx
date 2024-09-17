// src/components/CallLogs.tsx
import React from 'react';
import { Box, Typography, List, ListItem, Button } from '@mui/material';

interface CallLogsProps {
  showAllCallLogs: boolean;
  setShowAllCallLogs: (showAll: boolean) => void;
}

const CallLogs: React.FC<CallLogsProps> = ({ showAllCallLogs, setShowAllCallLogs }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        Call Logs:
      </Typography>
      <List>
        {[
          { name: 'John Doe', details: 'Duration: 2:30 min', date: '25-Aug, 10:44 am' },
          { name: 'Jane Smith', details: 'Missed Call', date: '24-Aug, 09:20 am' },
        ]
          .slice(0, showAllCallLogs ? undefined : 1)
          .map((log, index) => (
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
      {!showAllCallLogs && (
        <Button onClick={() => setShowAllCallLogs(true)} size="small">
          Show All
        </Button>
      )}
      {showAllCallLogs && (
        <Button onClick={() => setShowAllCallLogs(false)} size="small">
          Show Less
        </Button>
      )}
    </Box>
  );
};

export default CallLogs;
