
import React from 'react';
import { CalendarToday, LocationOn, AttachMoney, Star, CheckCircle, Message, Group, Work } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Paper, Button, Tooltip } from '@mui/material';

const MeetingToggleView = ({ toggle, meetings }) => {
  if (!meetings || meetings.length === 0) {
    return <p>No meetings found</p>;
  }

  const commonCellStyles = {
    padding: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };


  return (
    <>
      {toggle ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto">
          {meetings?.map((meeting) => (
            <div
              key={meeting.no}
              className="bg-white shadow rounded-lg flex flex-col justify-between h-auto p-2" // Reduced padding
              style={{ minHeight: '280px' }} // Reduced min-height
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{meeting.name || 'Unknown'}</h3> {/* Reduced text size */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${meeting.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    {meeting.status || 'Status Not Available'}
                  </span>
                </div>

                <div className="flex items-center space-x-2 mb-1">
                  <CalendarToday className="text-gray-500" />
                  <p className="text-xs text-gray-700">{meeting.dateOfMeeting ? `${meeting.dateOfMeeting} at ${meeting.time}` : 'Date & Time Not Available'}</p>
                </div>

                <div className="flex items-start space-x-2 mb-1">
                  <LocationOn className="text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-700">{meeting.address || 'Address Not Available'}</p>
                    <p className="text-xs text-gray-500">{meeting.location || 'Location Not Available'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-xs mb-2"> {/* Reduced gap and text size */}
                  <div className="flex items-center space-x-1">
                    <Work className="text-gray-500" />
                    <p>{meeting.projectStatus || 'Project Status Not Available'}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="text-gray-500" />
                    <p>{meeting.requirement || 'Requirement Not Available'}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Group className="text-gray-500" />
                    <p>{meeting.salesTeam || 'Sales Team Not Available'}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AttachMoney className="text-gray-500" />
                    <p>৳{meeting.visitCharge || '0'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs"> {/* Reduced text size */}
                  <Star className="text-yellow-400" />
                  <p>Rating: {meeting.rating ? `${meeting.rating}/5` : 'Rating Not Available'}</p>
                </div>

                {meeting.remark && (
                  <div className="flex items-start space-x-1 text-xs mt-2"> {/* Reduced text size */}
                    <Message className="text-gray-500" />
                    <p className="italic text-gray-600">{meeting.remark}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-2"> {/* Reduced margin */}
                <p className="text-xs font-medium">Sales Final: {meeting.salesFinal || 'Not Available'}</p> {/* Reduced text size */}
                <button className="px-2 py-1 border border-gray-300 rounded-md text-xs hover:bg-gray-100">View Details</button> {/* Reduced padding and text size */}
              </div>
            </div>
          ))}
        </div>


      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, maxHeight: '450px', overflow: 'auto', flexGrow: 1 }}>
          <Table aria-label="meeting table" stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={commonCellStyles}>Name</TableCell>
                <TableCell sx={commonCellStyles}>Status</TableCell>
                <TableCell sx={commonCellStyles}>Date & Time</TableCell>
                <TableCell sx={commonCellStyles}>Address</TableCell>
                <TableCell sx={commonCellStyles}>Location</TableCell>
                <TableCell sx={commonCellStyles}>Project Status</TableCell>
                <TableCell sx={commonCellStyles}>Requirement</TableCell>
                <TableCell sx={commonCellStyles}>Sales Team</TableCell>
                <TableCell sx={commonCellStyles}>Visit Charge</TableCell>
                <TableCell sx={commonCellStyles}>Rating</TableCell>
                <TableCell sx={commonCellStyles}>Remark</TableCell>
                <TableCell sx={commonCellStyles}>Sales Final</TableCell>
                <TableCell sx={commonCellStyles}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {meetings?.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.name || 'Unknown'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>
                    <Chip
                      label={meeting.status || 'N/A'}
                      color={meeting.status === 'Completed' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>
                    {meeting.dateOfMeeting ? `${meeting.dateOfMeeting} at ${meeting.time}` : 'Date & Time Not Available'}
                  </TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.address || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.location || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.projectStatus || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.requirement || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.salesTeam || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>৳{meeting.visitCharge || '0'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.rating ? `${meeting.rating}/5` : 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.remark || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>{meeting.salesFinal || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: '4px', fontSize: '0.75rem' }}>
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
