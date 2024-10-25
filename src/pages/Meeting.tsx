
import React, { useState, useEffect } from 'react';
import data from './../components/meeting/data.json';
import { Select, MenuItem, IconButton, Button } from '@mui/material';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import Datepicker from 'react-tailwindcss-datepicker';
import MeetingStates from '../components/meeting/MeetingStates';
import MeetingToggleView from '../components/meeting/MeetingToggleView';
import { Link } from 'react-router-dom';
import CreateMeetingModal from './CreateMeeting';

const Meeting = () => {
  const [cardView, setCardView] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
  const [selectedSalesTeam, setSelectedSalesTeam] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    applyFilters();
  }, [selectedDateRange, selectedSalesTeam, selectedStatus]);

  const handleToggle = () => {
    setCardView(!cardView);
  };

  const handleDateRangeChange = (range) => {
    setSelectedSalesTeam('');
    setSelectedStatus('');
    setFilteredData(data);
    setSelectedDateRange(range);
  };

  const handleSalesTeamChange = (event) => {
    setFilteredData(data);
    setSelectedDateRange({ startDate: null, endDate: null });
    setSelectedStatus('');
    setSelectedSalesTeam(event.target.value);
  };

  const handleStatusChange = (event) => {
    setFilteredData(data);
    setSelectedSalesTeam('');
    setSelectedDateRange({ startDate: null, endDate: null });
    setSelectedStatus(event.target.value);
  };

  const applyFilters = () => {
    let filteredMeetings = data;

    if (selectedStatus) {
      filteredMeetings = filteredMeetings.filter(
        (meeting) => meeting.status === selectedStatus
      );
    }

    if (selectedSalesTeam) {
      filteredMeetings = filteredMeetings.filter(
        (meeting) => meeting.salesTeam === selectedSalesTeam
      );
    }

    if (selectedDateRange.startDate && selectedDateRange.endDate) {
      filteredMeetings = filteredMeetings.filter((meeting) => {
        const meetingDate = new Date(meeting.dateOfMeeting).getTime();
        return (
          meetingDate >= new Date(selectedDateRange.startDate).getTime() &&
          meetingDate <= new Date(selectedDateRange.endDate).getTime()
        );
      });
    }

    setFilteredData(filteredMeetings);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <MeetingStates />
      <div className="flex justify-between items-center w-full shadow-lg rounded-lg p-2 pb- mb-4">
        {/* Left Button Group */}
        <div className="flex items-center space-x-3">


          {/* Status Filter */}
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            displayEmpty
            size="small"
            className="min-w-[100px] h-8"
            variant="outlined"
          >
            <MenuItem value="" disabled>Status</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
            <MenuItem value="Rescheduled">Rescheduled</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>

          {/* Sales Team Filter */}
          <Select
            value={selectedSalesTeam}
            onChange={handleSalesTeamChange}
            displayEmpty
            size="small"
            className="min-w-[100px] h-8"
            variant="outlined"
          >
            <MenuItem value="" disabled>Sales Team</MenuItem>
            <MenuItem value="Emon">Emon</MenuItem>
            <MenuItem value="Khalid">Khalid</MenuItem>
            <MenuItem value="Supto">Supto</MenuItem>
            <MenuItem value="Oshim">Oshim</MenuItem>
          </Select>

          {/* Date Range Picker */}
          <div className="relative border border-gray-400 rounded-lg w-[150px] h-8 flex items-center z-20"> {/* Adjusted z-index */}
            <Datepicker
              value={selectedDateRange}
              onChange={handleDateRangeChange}
              showShortcuts={true}
              classNames='border border-green-500'
              containerClassName="z-30"
            />
          </div>
        </div>

        {/* Toggle Button Group */}
        <div className='flex gap-2'>

          <div className='text-blue-300 border p-1 rounded-md border-blue-400 text-xs h-8 flex items-center'>
            <Link to='/admin/meeting-create'>Create Meeting</Link>
          </div>

          <div>
      <Button variant="outlined" color="primary" onClick={handleOpenModal}>
        Create Meeting
      </Button>
      <CreateMeetingModal open={modalOpen} onClose={handleCloseModal} />
      {/* Other meeting page content */}
    </div>



          <div className="flex items-center">
            <IconButton
              onClick={handleToggle}
              className="p-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 h-8"
              size="small"
            >
              {cardView ? (
                <FormatListBulletedSharpIcon className="!font-bold !text-2xl" />
              ) : (
                <ViewAgendaSharpIcon className="!font-bold !text-2xl" />
              )}
            </IconButton>
          </div>
        </div>

      </div>

      <MeetingToggleView toggle={cardView} meetings={filteredData} />
    </div>
  );
};

export default Meeting;
