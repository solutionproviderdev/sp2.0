
import React, { useState, useEffect } from 'react';
import data from './../components/meeting/data.json';
import { Select, MenuItem, IconButton, Button } from '@mui/material';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import Datepicker from 'react-tailwindcss-datepicker';
import MeetingStates from '../components/meeting/MeetingStates';
import MeetingToggleView from '../components/meeting/MeetingToggleView';
import { Link } from 'react-router-dom';

const Meeting = () => {
  const [cardView, setCardView] = useState(true);  
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
  const [selectedSalesTeam, setSelectedSalesTeam] = useState(''); // Store selected sales team
  const [selectedStatus, setSelectedStatus] = useState(''); // Store selected status
  const [filteredData, setFilteredData] = useState(data); 
  
  // Apply filters whenever a new filter is selected
  useEffect(() => {
    applyFilters(); // Re-apply filters every time the user changes any filter
  }, [selectedDateRange, selectedSalesTeam, selectedStatus]);

  const handleToggle = () => {
    setCardView(!cardView);
  };

  // Handle date range change and apply filter
  const handleDateRangeChange = (range) => {
    setSelectedSalesTeam('')
    setSelectedStatus('')
    setFilteredData(data)


     setSelectedDateRange(range); // Set selected date range
  };

  // Handle sales team change and apply filter
  const handleSalesTeamChange = (event) => {
    setFilteredData(data)
    setSelectedDateRange({ startDate: null, endDate: null })
   setSelectedStatus('')
   
    const salesTeam = event.target.value;
    setFilteredData(data)
    setSelectedSalesTeam(salesTeam); // Set selected sales team
  };

  // Handle status change and apply filter
  const handleStatusChange = (event) => {
    setFilteredData(data)
    setSelectedSalesTeam('')
    setSelectedDateRange({ startDate: null, endDate: null })
     // setFilteredData(data)
    const status = event.target.value;
    setSelectedStatus(status); // Set selected status
  };

  const applyFilters = () => {
    let filteredMeetings = data; // Start filtering from the full dataset

    // Apply status filter (independent)
    if (selectedStatus) {
      filteredMeetings = filteredMeetings.filter(
        (meeting) => meeting.status === selectedStatus
      );
    }

    // Apply sales team filter (independent)
    if (selectedSalesTeam) {
      filteredMeetings = filteredMeetings.filter(
        (meeting) => meeting.salesTeam === selectedSalesTeam
      );
    }

    // Apply date range filter (independent)
    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      filteredMeetings = filteredMeetings.filter((meeting) => {
        const meetingDate = new Date(meeting.dateOfMeeting).getTime();
        return (
          meetingDate >= new Date(selectedDateRange.startDate).getTime() &&
          meetingDate <= new Date(selectedDateRange.endDate).getTime()
        );
      });
    }
    // Set filtered data based on the final filtered meetings
    setFilteredData(filteredMeetings);
  };
 
   return (
    <div className="p-6">
      <MeetingStates />

      <div className="flex justify-between items-center w-full shadow-lg rounded-lg p-4 mb-6">
         <div className='text-blue-300 border p-2 rounded-md border-blue-400'>
          <Link to='/admin/meetings-slot'>Meeting Slot</Link>
        </div>
        {/* Status Filter */}
        <div>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
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

        {/* Sales Team Filter */}
        <div>
          <Select
            value={selectedSalesTeam}
            onChange={handleSalesTeamChange}
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

        {/* Date Range Picker */}
        <div className="border border-gray-400 rounded-lg">
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

      {/* Meeting Cards or List */}
      <MeetingToggleView toggle={cardView} meetings={filteredData} />
    </div>
  );
};

export default Meeting;
