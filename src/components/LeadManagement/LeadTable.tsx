import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const LeadTable = ({ leads }) => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Message</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Call</TableCell>
              <TableCell>Chat</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead) => {
              const lastMessage = lead.messages[lead.messages.length - 1];
              const formattedDate = new Date(lastMessage?.date).toLocaleString();
  
              return (
                <TableRow key={lead._id}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lastMessage?.content || 'No message'}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" startIcon={<Phone />}>
                      Call
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" startIcon={<Chat />}>
                      Chat
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  export default LeadTable;