
import React from 'react';
import data from './../components/meeting/data.json';
import { Card, CardContent, CardActions, Typography, Button as MuiButton, Chip, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  CalendarToday, 
  LocationOn, 
  AttachMoney, 
  Star, 
  CheckCircle, 
  Message, 
  Group, 
  Work 
} from '@mui/icons-material';
import { Button } from "@/components/ui/button";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  margin: 'auto',
  marginBottom: theme.spacing(2),
}));

const IconWrapper = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& > svg': {
    marginRight: theme.spacing(1),
    fontSize: '1rem',
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
}));

const MeetingCard = ({ meeting }) => (
  <StyledCard>
    <CardContent>
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h6" component="div">
          {meeting.name}
        </Typography>
        <Chip 
          label={meeting.status} 
          color={meeting.status === 'Completed' ? 'primary' : 'default'} 
          size="small" 
        />
      </Grid>

      <IconWrapper>
        <CalendarToday color="action" />
        <Typography variant="body2">{meeting.dateOfMeeting} at {meeting.time}</Typography>
      </IconWrapper>

      <IconWrapper>
        <LocationOn color="action" />
        <Typography variant="body2">
          {meeting.address}
          <br />
          <Typography variant="caption" color="textSecondary">{meeting.location}</Typography>
        </Typography>
      </IconWrapper>

      <Grid container spacing={2} marginY={2}>
        <Grid item xs={6}>
          <IconWrapper>
            <Work color="action" />
            <Typography variant="body2">{meeting.projectStatus}</Typography>
          </IconWrapper>
        </Grid>
        <Grid item xs={6}>
          <IconWrapper>
            <CheckCircle color="action" />
            <Typography variant="body2">{meeting.requirement}</Typography>
          </IconWrapper>
        </Grid>
        <Grid item xs={6}>
          <IconWrapper>
            <Group color="action" />
            <Typography variant="body2">{meeting.salesTeam}</Typography>
          </IconWrapper>
        </Grid>
        <Grid item xs={6}>
          <IconWrapper>
            <AttachMoney color="action" />
            <Typography variant="body2">৳{meeting.visitCharge}</Typography>
          </IconWrapper>
        </Grid>
      </Grid>

      <IconWrapper>
        <Star style={{ color: '#FFD700' }} />
        <Typography variant="body2">Rating: {meeting.rating}/5</Typography>
      </IconWrapper>

      {meeting.remark && (
        <IconWrapper>
          <Message color="action" />
          <Typography variant="body2" color="textSecondary" style={{ fontStyle: 'italic' }}>
            {meeting.remark}
          </Typography>
        </IconWrapper>
      )}
    </CardContent>
    <CardActions style={{ justifyContent: 'space-between', padding: '16px' }}>
      <Typography variant="body2" fontWeight="medium">
        Sales Final: {meeting.salesFinal}
      </Typography>
      <MuiButton size="small" variant="outlined">View Details</MuiButton>
    </CardActions>
  </StyledCard>
);

const Meetings = () => {
  console.log('data', data);

  return (
    <Box sx={{ p: 5 }}>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={3}>
          <StatCard sx={{ bgcolor: 'primary.main' }}>
            <Typography variant="h6">Follow up</Typography>
            <Typography variant="h4">4</Typography>
            <Typography variant="body1">৳1,366,390</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={3}>
          <StatCard sx={{ bgcolor: 'info.main' }}>
            <Typography variant="h6">Prospect</Typography>
            <Typography variant="h4">1</Typography>
            <Typography variant="body1">৳1,979,750</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={3}>
          <StatCard sx={{ bgcolor: 'error.main' }}>
            <Typography variant="h6">Lost</Typography>
            <Typography variant="h4">10</Typography>
            <Typography variant="body1">৳5,230,982</Typography>
          </StatCard>
        </Grid>
        <Grid item xs={3}>
          <StatCard sx={{ bgcolor: 'success.main' }}>
            <Typography variant="h6">Sold</Typography>
            <Typography variant="h4">3</Typography>
            <Typography variant="body1">৳914,500</Typography>
          </StatCard>
        </Grid>
      </Grid>
      {/* hare is the dropdowns */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4">
  <div className="w-1/4">
    <label for="status" className="block text-sm font-medium text-gray-700">Status</label>
    <select id="status" className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
      <option value="">All</option>
      <option value="Pending">Pending</option>
      <option value="Complete">Complete</option>
      <option value="Rescheduled">Rescheduled</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </div>

  <div className="w-1/4">
    <label for="sales" className="block text-sm font-medium text-gray-700">Sales Team</label>
    <select id="sales" className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
      <option value="">All</option>
      <option value="Emon">Emon</option>
      <option value="Khalid">Khalid</option>
      <option value="Supto">Supto</option>
      <option value="Oshim">Oshim</option>
    </select>
  </div>

  <div className="w-1/4">
    <label for="date" className="block text-sm font-medium text-gray-700">Date</label>
    <input type="date" id="date" className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
  </div>

  <div className="flex items-center justify-end w-1/4">
    <button className="flex items-center p-2 bg-gray-200 hover:bg-gray-300 rounded-md">
      <span className="mr-2">Toggle View</span>
      <i className="fas fa-th-large mr-2"></i>
      <i className="fas fa-list hidden"></i>
    </button>
  </div>
</div>


      <Grid container spacing={2}>
        {data.map((meeting) => (
          <Grid item xs={12} md={6} lg={4} key={meeting.no}>
            <MeetingCard meeting={meeting} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Meetings;