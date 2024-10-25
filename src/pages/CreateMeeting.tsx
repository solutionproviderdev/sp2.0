// import React from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Box,
//   Grid,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import { Controller, useForm } from 'react-hook-form';
// import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign, FaStar } from 'react-icons/fa';

// interface MeetingFormData {
//   leadName: string;
//   requirement: string;
//   date: string;
//   time: string;
//   location: string;
//   projectStatus: string;
//   salesTeam: string;
//   visitCharge: number;
//   rating: number;
//   salesFinal: string;
//   status: string;
// }

// interface CreateMeetingModalProps {
//   open: boolean;
//   onClose: () => void;
// }

// const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ open, onClose }) => {
//   const { control, handleSubmit } = useForm<MeetingFormData>();

//   const onSubmit = (data: MeetingFormData) => {
//     console.log(data);
//     alert('Meeting created successfully!');
//     onClose(); // Close the modal after submission
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>Create Meeting</DialogTitle>
//       <DialogContent>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 ,marginTop:2}}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="leadName"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label="Lead Name"
//                       variant="outlined"
//                       size="small"
//                       required
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="requirement"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label="Requirement"
//                       variant="outlined"
//                       size="small"
//                       required
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <Controller
//                   name="date"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type="date"
//                       label="Date"
//                       InputLabelProps={{ shrink: true }}
//                       variant="outlined"
//                       size="small"
//                       required
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Controller
//                   name="time"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       type="time"
//                       label="Time"
//                       InputLabelProps={{ shrink: true }}
//                       variant="outlined"
//                       size="small"
//                       required
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Controller
//                   name="location"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <FormControl fullWidth size="small" required>
//                       <InputLabel>Location</InputLabel>
//                       <Select {...field} label="Location">
//                         <MenuItem value="Inside">Inside</MenuItem>
//                         <MenuItem value="Outside">Outside</MenuItem>
//                       </Select>
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="projectStatus"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <FormControl fullWidth size="small" required>
//                       <InputLabel>Project Status</InputLabel>
//                       <Select {...field} label="Project Status">
//                         <MenuItem value="Ongoing">Ongoing</MenuItem>
//                         <MenuItem value="Complete">Complete</MenuItem>
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Canceled">Canceled</MenuItem>
//                       </Select>
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="salesTeam"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label="Sales Team"
//                       variant="outlined"
//                       size="small"
//                       required
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="visitCharge"
//                   control={control}
//                   defaultValue={0}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label="Visit Charge"
//                       type="number"
//                       InputProps={{
//                         startAdornment: <FaDollarSign style={{ marginRight: '8px' }} />
//                       }}
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="rating"
//                   control={control}
//                   defaultValue={0}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label="Rating"
//                       type="number"
//                       InputProps={{
//                         startAdornment: <FaStar style={{ marginRight: '8px' }} />,
//                         inputProps: { min: 0, max: 5 }
//                       }}
//                       variant="outlined"
//                       size="small"
//                     />
//                   )}
//                 />
//               </Grid>
//             </Grid>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="salesFinal"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <FormControl fullWidth size="small" required>
//                       <InputLabel>Sales Final</InputLabel>
//                       <Select {...field} label="Sales Final">
//                         <MenuItem value="Prospect">Prospect</MenuItem>
//                         <MenuItem value="Done">Done</MenuItem>
//                         <MenuItem value="Follow Up">Follow Up</MenuItem>
//                         <MenuItem value="Closed">Closed</MenuItem>
//                       </Select>
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Controller
//                   name="status"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <FormControl fullWidth size="small" required>
//                       <InputLabel>Status</InputLabel>
//                       <Select {...field} label="Status">
//                         <MenuItem value="Pending">Pending</MenuItem>
//                         <MenuItem value="Complete">Complete</MenuItem>
//                         <MenuItem value="Rescheduled">Rescheduled</MenuItem>
//                         <MenuItem value="Canceled">Canceled</MenuItem>
//                       </Select>
//                     </FormControl>
//                   )}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </form>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">Cancel</Button>
//         <Button onClick={handleSubmit(onSubmit)} color="primary">Create Meeting</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default CreateMeetingModal;








import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FaUser, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign, FaStar, FaBuilding, FaCheckCircle } from 'react-icons/fa';

interface MeetingFormData {
  leadName: string;
  requirement: string;
  date: string;
  time: string;
  location: string;
  projectStatus: string;
  salesTeam: string;
  visitCharge: number;
  rating: number;
  salesFinal: string;
  status: string;
}

interface CreateMeetingModalProps {
  open: boolean;
  onClose: () => void;
}

const TabPanel = (props: { children?: React.ReactNode; index: number; value: number }) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
};

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm<MeetingFormData>();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = (data: MeetingFormData) => {
    console.log(data);
    alert('Meeting created successfully!');
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Create Meeting</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tab icon={<FaUser />} label="Lead" />
            <Tab icon={<FaCalendarAlt />} label="Meeting" />
            <Tab icon={<FaBuilding />} label="Project" />
            <Tab icon={<FaCheckCircle />} label="Additional" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="leadName"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Lead Name" variant="outlined" size="small" required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="requirement"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Requirement" variant="outlined" size="small" required />
                  )}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="date"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} variant="outlined" size="small" required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="time"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth type="time" label="Time" InputLabelProps={{ shrink: true }} variant="outlined" size="small" required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="location"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Location</InputLabel>
                      <Select {...field} label="Location">
                        <MenuItem value="Inside">Inside</MenuItem>
                        <MenuItem value="Outside">Outside</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="projectStatus"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Project Status</InputLabel>
                      <Select {...field} label="Project Status">
                        <MenuItem value="Ongoing">Ongoing</MenuItem>
                        <MenuItem value="Complete">Complete</MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Canceled">Canceled</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="salesTeam"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Sales Team" variant="outlined" size="small" required />
                  )}
                />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="visitCharge"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Visit Charge" type="number" InputProps={{ startAdornment: <FaDollarSign style={{ marginRight: '8px' }} /> }} variant="outlined" size="small" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Rating" type="number" InputProps={{ startAdornment: <FaStar style={{ marginRight: '8px' }} /> }} variant="outlined" size="small" />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="salesFinal"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Sales Final</InputLabel>
                      <Select {...field} label="Sales Final">
                        <MenuItem value="Prospect">Prospect</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                        <MenuItem value="Follow Up">Follow Up</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControl fullWidth size="small" required>
                      <InputLabel>Status</InputLabel>
                      <Select {...field} label="Status">
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Complete">Complete</MenuItem>
                        <MenuItem value="Rescheduled">Rescheduled</MenuItem>
                        <MenuItem value="Canceled">Canceled</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </TabPanel>

        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">Create Meeting</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateMeetingModal;
