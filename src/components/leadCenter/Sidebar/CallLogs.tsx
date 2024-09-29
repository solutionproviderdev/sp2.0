
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Modal,
  TextField,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useAddCallLogsMutation } from '../../../features/conversation/conversationApi';

interface CallLog {
  recipientNumber: string;
  callDuration: number | string; // Allow string format as "MM:SS"
  timestamp: string;
  callType: string;
  status: string;
}

interface CallLogsProps {
  conversation: any;
  leadCallLogs: CallLog[];
  refetch: () => void;
}

const CallLogs: React.FC<CallLogsProps> = ({ conversation, leadCallLogs, refetch }) => {
  const [addCallLogs, { isLoading }] = useAddCallLogsMutation();
  const [callLogs, setCallLogs] = useState<CallLog[]>(leadCallLogs);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [durationError, setDurationError] = useState<boolean>(false); // To track invalid duration input
  const [newCallLog, setNewCallLog] = useState<CallLog>({
    recipientNumber: '',
    callDuration: '0:00', // Default duration in MM:SS format
    timestamp: dayjs().toISOString(),
    callType: 'Outgoing',
    status: 'Received',
  });
  const [durationInput, setDurationInput] = useState<string>(''); // For MM:SS input

  useEffect(() => {
    setCallLogs(leadCallLogs);
  }, [leadCallLogs]);

  // Simple phone validation (accepts + followed by 10-14 digits)
  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\+?[0-9]{10,14}$/;
    return phoneNumberRegex.test(newCallLog.recipientNumber);
  };

  // Validate the duration input in MM:SS format
  const validateDuration = (duration: string) => {
    const durationRegex = /^([0-5]?[0-9]):([0-5][0-9])$/; // MM:SS format (0-59 for minutes and seconds)
    return durationRegex.test(duration);
  };

  // Save call log and show error if validation fails
  const handleSaveCallLog = async () => {
    // Validate phone number and duration input
    if (!validatePhoneNumber()) {
      setPhoneError(true);
      return;
    }
    if (!validateDuration(durationInput)) {
      setDurationError(true);
      return;
    }
    // console.log("durationInput",durationInput)

    // Proceed to save if validations pass
    setDurationError(false); // Clear the error state

    // Set call duration as string in MM:SS format
    const updatedCallLog = { ...newCallLog, callDuration:durationInput};

    // console.log('Saving call log:', updatedCallLog);
    setModalOpen(false);
    const response = await addCallLogs({ id: conversation?._id, newCallLog: updatedCallLog });
    // console.log('Call logs mutation response', response);
    refetch();
  };

  // Helper function to get emoji based on call status
  const getStatusEmoji = (status: string) => {
    return status === 'Missed' ? '📵' : '📞';
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="body2">☎️ Call Logs:</Typography>

      {/* Display Call Logs */}

      <List>
        {callLogs?.map((log, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between', // This will ensure space between the items
              alignItems: 'center',
              padding: '10px',
              backgroundColor: '#f0f0f0',
              marginBottom: '8px',
              borderRadius: '8px',
              boxShadow: 1,
            }}
          >
            {/* Status Emoji */}
            <Typography variant="body1" sx={{ marginRight: '8px' }}>
              {getStatusEmoji(log.status)}
            </Typography>

            {/* Recipient Number */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: '8px' }}>
              {log.recipientNumber}
            </Typography>

            {/* Duration and Timestamp */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography variant="body2">{`Duration: ${log.callDuration}`}</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                {dayjs(log.timestamp).format('DD-MM-YYYY HH:mm')}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setModalOpen(true)}
        sx={{
          backgroundColor: 'primary.main',
          '&:hover': { backgroundColor: 'primary.dark' },
          width: '100%',
          marginTop: '20px',
        }}
      >
        Add Call Log
      </Button>

      {/* Modal to Add Call Log */}
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add Call Log
          </Typography>

          {/* Recipient Number Input with validation */}
          <TextField
            label="Recipient Number"
            value={newCallLog.recipientNumber}
            onChange={(e) => {
              setNewCallLog({ ...newCallLog, recipientNumber: e.target.value });
              setPhoneError(false);
            }}
            fullWidth
            margin="normal"
            error={phoneError}
            helperText={phoneError ? 'Please enter a valid phone number (e.g. +8801234567890)' : ''}
          />

          {/* Call Type Input */}
          <TextField
            select
            label="Call Type"
            value={newCallLog.callType}
            onChange={(e) => setNewCallLog({ ...newCallLog, callType: e.target.value })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Outgoing">Outgoing</MenuItem>
            <MenuItem value="Incoming">Incoming</MenuItem>
          </TextField>

          {/* Status Input */}
          <TextField
            select
            label="Status"
            value={newCallLog.status}
            onChange={(e) => setNewCallLog({ ...newCallLog, status: e.target.value })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Received">Received</MenuItem>
            <MenuItem value="Missed">Missed</MenuItem>
          </TextField>

          {/* Call Duration Input (MM:SS) */}
          <TextField
            label="Call Duration (MM:SS)"
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
            fullWidth
            margin="normal"
            error={durationError} // Show red border when input is invalid
            helperText={durationError ? 'Please enter a valid duration in MM:SS format' : ''}
            placeholder="e.g. 2:30"
          />

          {/* Timestamp Input */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className='w-full'
              label="Timestamp"
              value={dayjs(newCallLog.timestamp)}
              onChange={(newValue) =>
                setNewCallLog({ ...newCallLog, timestamp: newValue?.toISOString() || '' })
              }
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>

          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" onClick={handleSaveCallLog} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CallLogs;
