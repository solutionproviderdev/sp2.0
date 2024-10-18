
import React, { useState } from 'react';
import data from './../components/meeting/data.json';
import { Card, CardContent, CardActions, Typography, Chip, Grid, Box, Button, Dialog, TextField, IconButton, Select, MenuItem, Modal } from '@mui/material';
import { CalendarToday, LocationOn, AttachMoney, Star, CheckCircle, Message, Group, Work } from '@mui/icons-material';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import Datepicker from 'react-tailwindcss-datepicker';

// Meeting Card Component
const MeetingCard = ({ meeting }) => (
  <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between h-[340px] p-4 mb-4">
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{meeting.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${meeting.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
          {meeting.status}
        </span>
      </div>

      <div className="flex items-center space-x-2 mb-2">
        <CalendarToday className="text-gray-500" />
        <p className="text-sm text-gray-700">{meeting.dateOfMeeting} at {meeting.time}</p>
      </div>

      <div className="flex items-start space-x-2 mb-2">
        <LocationOn className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-700">{meeting.address}</p>
          <p className="text-xs text-gray-500">{meeting.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
        <div className="flex items-center space-x-2">
          <Work className="text-gray-500" />
          <p>{meeting.projectStatus}</p>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-gray-500" />
          <p>{meeting.requirement}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Group className="text-gray-500" />
          <p>{meeting.salesTeam}</p>
        </div>
        <div className="flex items-center space-x-2">
          <AttachMoney className="text-gray-500" />
          <p>৳{meeting.visitCharge}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <Star className="text-yellow-400" />
        <p>Rating: {meeting.rating}/5</p>
      </div>

      {meeting.remark && (
        <div className="flex items-start space-x-2 text-sm mt-2">
          <Message className="text-gray-500" />
          <p className="italic text-gray-600">{meeting.remark}</p>
        </div>
      )}
    </div>

    <div className="flex justify-between items-center mt-4">
      <p className="text-sm font-medium">Sales Final: {meeting.salesFinal}</p>
      <button className="px-4 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">
        View Details
      </button>
    </div>
  </div>
);

const Meetings = () => {
  const [cardView, setCardView] = useState(true); // Default is card view
  const [openDatePicker, setOpenDatePicker] = useState(false); // State for date picker dialog
  const [selectedRange, setSelectedRange] = useState({ startDate: '', endDate: '' }); // Date range selection
  const [isDatePickerOpen, setDatePickerOpen] = useState(false); // State to control modal visibility
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null }); // Store selected date range



  const handleToggle = () => {
    setCardView(!cardView); // Toggle between card and list view
  };

  const handleRangeSelect = (e) => {
    const { name, value } = e.target;
    setSelectedRange((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
    setDatePickerOpen(false);

    if (range.startDate && range.endDate) {
      const filteredLeadsByDate = data.leads.filter(lead => {
        const createdAtDate = new Date(lead.createdAt).getTime();
        return createdAtDate >= new Date(range.startDate).getTime() &&
          createdAtDate <= new Date(range.endDate).getTime();
      });
      setFilteredData(filteredLeadsByDate);
    } else {
      setFilteredData(data.leads); // Reset to all leads if no date range is selected
    }
  };

  return (
    <div className="p-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-500 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Follow up</h3>
          <p className="text-2xl">4</p>
          <p className="text-lg">৳1,366,390</p>
        </div>
        <div className="bg-blue-300 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Prospect</h3>
          <p className="text-2xl">1</p>
          <p className="text-lg">৳1,979,750</p>
        </div>
        <div className="bg-red-500 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Lost</h3>
          <p className="text-2xl">10</p>
          <p className="text-lg">৳5,230,982</p>
        </div>
        <div className="bg-green-500 text-white rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Sold</h3>
          <p className="text-2xl">3</p>
          <p className="text-lg">৳914,500</p>
        </div>
      </div>

      {/* Dropdown Filters date */}

      <div className="">
        {/* Dropdown Filters */}
        <div className="flex justify-between items-center w-full shadow-lg rounded-lg p-4 mb-6">
          {/* Toggle button on the left side */}


          {/* Dropdowns on the right side */}
          <div>
            <Select
              defaultValue=""
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Rescheduled">Rescheduled</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </div>

          <div>
            <Select
              defaultValue=""
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>Sales Team</MenuItem>
              <MenuItem value="Emon">Emon</MenuItem>
              <MenuItem value="Khalid">Khalid</MenuItem>
              <MenuItem value="Supto">Supto</MenuItem>
              <MenuItem value="Oshim">Oshim</MenuItem>
            </Select>
          </div>

          <div>
            <Button
              variant="contained"
              onClick={() => setOpenDatePicker(true)}
              sx={{ backgroundColor: 'gray', color: 'white' }}
            >
              Choose Date Range
            </Button>
          </div>

          {/* Date Range Picker */}

          <div className='border border-gray-400 rounded-lg'>

            <Datepicker
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              showShortcuts={true}
            />
          </div>



          <div className="flex items-center bg-gray-100 rounded-full">
            <IconButton
              onClick={handleToggle}
              className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              size="large"
            >
              {cardView ? (
                <FormatListBulletedSharpIcon className="!font-bold !text-3xl" />
              ) : (
                <ViewAgendaSharpIcon className="!font-bold !text-3xl" />
              )}
            </IconButton>
          </div>

        </div>

        {/* Date Range Picker Dialog */}
        <Dialog open={openDatePicker} onClose={() => setOpenDatePicker(false)}>
          <Box p={3}>
            <div className="flex space-x-6">
              <TextField
                type="date"
                label="Start Date"
                name="startDate"
                value={selectedRange.startDate}
                onChange={handleRangeSelect}
                fullWidth
              />
              <TextField
                type="date"
                label="End Date"
                name="endDate"
                value={selectedRange.endDate}
                onChange={handleRangeSelect}
                fullWidth
              />
            </div>
            <Box mt={2} textAlign="right">
              <Button onClick={() => setOpenDatePicker(false)} variant="contained">
                Close
              </Button>
            </Box>
          </Box>
        </Dialog>
      </div>


      {/* Meeting Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((meeting) => (
          <MeetingCard key={meeting.no} meeting={meeting} />
        ))}
      </div>
    </div>
  );
};

export default Meetings;
