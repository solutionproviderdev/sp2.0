
import React from 'react';
import { CalendarToday, LocationOn, AttachMoney, Star, CheckCircle, Message, Group, Work } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Tooltip, Typography, IconButton, Paper, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';

const MeetingToggleView = ({ toggle, meetings }) => {
  if (!meetings || meetings.length === 0) {
    return <p>No meetings found</p>;
  }

  return (
    <>
      {toggle ? (
        <div className="grid grid-cols-3 gap-4">
          {meetings?.map((meeting) => (
            <div key={meeting.id} className="bg-white shadow-lg rounded-lg flex flex-col justify-between h-[340px] p-4 mb-4">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{meeting.name || 'Unknown'}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${meeting.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                    {meeting.status || 'Status Not Available'}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <CalendarToday className="text-gray-500" />
                  <p className="text-sm text-gray-700">
                    {meeting.dateOfMeeting ? `${meeting.dateOfMeeting} at ${meeting.time}` : 'Date & Time Not Available'}
                  </p>
                </div>

                <div className="flex items-start space-x-2 mb-2">
                  <LocationOn className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-700">{meeting.address || 'Address Not Available'}</p>
                    <p className="text-xs text-gray-500">{meeting.location || 'Location Not Available'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <Work className="text-gray-500" />
                    <p>{meeting.projectStatus || 'Project Status Not Available'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-gray-500" />
                    <p>{meeting.requirement || 'Requirement Not Available'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Group className="text-gray-500" />
                    <p>{meeting.salesTeam || 'Sales Team Not Available'}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AttachMoney className="text-gray-500" />
                    <p>৳{meeting.visitCharge || '0'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Star className="text-yellow-400" />
                  <p>Rating: {meeting.rating ? `${meeting.rating}/5` : 'Rating Not Available'}</p>
                </div>

                {meeting.remark && (
                  <div className="flex items-start space-x-2 text-sm mt-2">
                    <Message className="text-gray-500" />
                    <p className="italic text-gray-600">{meeting.remark}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm font-medium">Sales Final: {meeting.salesFinal || 'Not Available'}</p>
                <button className="px-4 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">View Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table aria-label="meeting table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date & Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Project Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Requirement</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Sales Team</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Visit Charge</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Remark</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Sales Final</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {meetings?.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <Chip label={meeting.status || 'Status Not Available'} color={meeting.status === 'Completed' ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>{meeting.dateOfMeeting ? `${meeting.dateOfMeeting} at ${meeting.time}` : 'Date & Time Not Available'}</TableCell>
                  <TableCell>{meeting.address || 'Address Not Available'}</TableCell>
                  <TableCell>{meeting.location || 'Location Not Available'}</TableCell>
                  <TableCell>{meeting.projectStatus || 'Project Status Not Available'}</TableCell>
                  <TableCell>{meeting.requirement || 'Requirement Not Available'}</TableCell>
                  <TableCell>{meeting.salesTeam || 'Sales Team Not Available'}</TableCell>
                  <TableCell>৳{meeting.visitCharge || '0'}</TableCell>
                  <TableCell>{meeting.rating ? `${meeting.rating}/5` : 'Rating Not Available'}</TableCell>
                  <TableCell>{meeting.remark || 'N/A'}</TableCell>
                  <TableCell>{meeting.salesFinal || 'Not Available'}</TableCell>
                  <TableCell>
                    <Button className="!text-xs !outline-red-100">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default MeetingToggleView;
