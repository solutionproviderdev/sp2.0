import { Assignment, Chat, Delete, Markunread, Phone } from "@mui/icons-material";
import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";

const LeadCard = ({ lead }) => {
    const lastMessage = lead.messages[lead.messages.length - 1];
    const formattedDate = new Date(lastMessage?.date).toLocaleString();
  
    return (
      <Card sx={{ margin: 2, boxShadow: 3 }}>
        <CardContent>
          {/* Top Action Buttons */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <IconButton color="primary">
              <Assignment />
            </IconButton>
            <IconButton color="secondary">
              <Markunread />
            </IconButton>
            <IconButton color="error">
              <Delete />
            </IconButton>
          </Box>
  
          {/* Last Message and Date */}
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Last Message: {lastMessage?.content || 'No message'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formattedDate}
            </Typography>
          </Box>
  
          {/* Call and Chat Buttons */}
          <Box display="flex" justifyContent="space-around" mt={2}>
            <Button variant="contained" color="primary" startIcon={<Phone />}>
              Call
            </Button>
            <Button variant="contained" color="secondary" startIcon={<Chat />}>
              Chat
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  };

  export default LeadCard