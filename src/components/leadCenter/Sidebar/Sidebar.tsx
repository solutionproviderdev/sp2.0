import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Drawer,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  List,
  ListItem,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';

import { RiScales2Fill } from "react-icons/ri";
import Requirements from './Requirements';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  newNumber: string;
  newReminder: string;
  newLocation: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [numbers, setNumbers] = useState<string[]>(['01957795943', '01234629732']);
  const [locations, setLocations] = useState<string[]>(['12/b Banani', 'Awwal Tower Gulshan']);
  const [newLocation, setNewLocation] = useState<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newReminder, setNewReminder] = useState<string>('');
  const [reminders, setReminders] = useState<string[]>(['Have to call - 25-Aug, 10:30 am']);
  const [editReminderIndex, setEditReminderIndex] = useState<number | null>(null);
  const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false);
  const [showAllLocations, setShowAllLocations] = useState<boolean>(false);
  const [showAllReminders, setShowAllReminders] = useState<boolean>(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [showAllCallLogs, setShowAllCallLogs] = useState<boolean>(false);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { newNumber: '', newReminder: '', newLocation: '' },
  });
  
  const addNumber = (data: FormValues) => {
    const trimmedNumber = data.newNumber.trim();
    if (trimmedNumber !== '') {
      setNumbers([...numbers, trimmedNumber]);
    }
    reset({ newNumber: '' });
  };

  const addLocation = () => {
    const trimmedLocation = newLocation.trim();
    if (trimmedLocation !== '') {
      setLocations([...locations, trimmedLocation]);
      setNewLocation('');
    }
  };

  const handleLocationChange = (index: number, value: string) => {
    setLocations(locations.map((location, i) => (i === index ? value : location)));
  };
  
  const handleEditLocation = (index: number) => {
    setEditIndex(index);
  };

  const handleSaveLocation = () => {
    if (editIndex !== null && locations[editIndex].trim() === '') {
      setLocations(locations.filter((_, i) => i !== editIndex));
    }
    setEditIndex(null);
  };

  const handleNumberChange = (index: number, value: string) => {
    setNumbers(numbers.map((number, i) => (i === index ? value : number)));
  };

  const handleEditNumber = (index: number) => {
    setEditIndex(index);
  };
  
  const handleSaveEdit = () => {
    if (editIndex !== null && numbers[editIndex].trim() === '') {
      setNumbers(numbers.filter((_, i) => i !== editIndex));
    }
    setEditIndex(null);
  };
  
  const handleSidebarClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  
  // const [showAllRequirements, setShowAllRequirements] = useState<boolean>(false);
  // const [requirements, setRequirements] = useState<string[]>(['Kitchen', 'Bedroom']);
  // const [newRequirement, setNewRequirement] = useState<string>('');
  // const [editRequirementIndex, setEditRequirementIndex] = useState<number | null>(null);

  // const addRequirement = () => {
  //   if (newRequirement.trim() !== '') {
  //     setRequirements([...requirements, newRequirement]);
  //     setNewRequirement('');
  //   }
  // };

  // const handleRequirementChange = (index: number, value: string) => {
  //   setRequirements(requirements.map((req, i) => (i === index ? value : req)));
  // };

  // const handleEditRequirement = (index: number) => {
  //   setEditRequirementIndex(index);
  // };

  // const handleSaveRequirement = () => {
  //   if (editRequirementIndex !== null) {
  //     if (requirements[editRequirementIndex].trim() === '') {
  //       setRequirements(requirements.filter((_, i) => i !== editRequirementIndex));
  //     }
  //     setEditRequirementIndex(null);
  //   }
  // };

  const handleAddReminder = () => {
    const trimmedReminder = newReminder.trim();
    if (trimmedReminder !== '') {
      setReminders([...reminders, trimmedReminder]);
      setNewReminder('');
    }
  };

  const handleEditReminder = (index: number) => {
    setEditReminderIndex(index);
  };

  const handleSaveReminder = () => {
    if (editReminderIndex !== null) {
      if (reminders[editReminderIndex].trim() === '') {
        setReminders(reminders.filter((_, i) => i !== editReminderIndex));
      }
      setEditReminderIndex(null);
    }
  };

  const [comments, setComments] = useState<string[]>([
    'Wony: She is good - 25-06-2024, 2:36 am',
  ]);
  const [newComment, setNewComment] = useState<string>('');

  const addComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          padding: 2,
        }}
        role="presentation"
        onClick={handleSidebarClick}
      >
        {/* Lead Information */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Salma Akter
        </Typography>
        
        {/* Numbers Section */}
        <div className="flex flex-col my-2">
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            📞 Phone Numbers:
          </Typography>
          {(showAllNumbers ? numbers : numbers.slice(0, 1)).map((number, index) => (
            <div key={index} className="flex items-center mb-2">
              {editIndex === index ? (
                <>
                  <TextField
                    value={number}
                    onChange={(e) => handleNumberChange(index, e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <IconButton size="small" onClick={handleSaveEdit}>
                    <DoneIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {number}
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditNumber(index)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
          {!showAllNumbers && numbers.length > 1 && (
            <Button onClick={() => setShowAllNumbers(true)} size="small">
              Show All
            </Button>
          )}
          {showAllNumbers && (
            <Button onClick={() => setShowAllNumbers(false)} size="small">
              Show Less
            </Button>
          )}
          {/* Add Number Input */}
          <form onSubmit={handleSubmit(addNumber)} className="flex items-center mb-2">
            <Controller
              name="newNumber"
              control={control}
              rules={{
                required: 'Number is required',
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: 'Invalid number format',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Add Number"
                  size="small"
                  sx={{ flexGrow: 1, marginRight: 1 }}
                  error={!!errors.newNumber}
                  helperText={errors.newNumber ? errors.newNumber.message : ''}
                />
              )}
            />
            <Button variant="outlined" size="small" startIcon={<AddIcon />} type="submit">
              Add
            </Button>
          </form>
        </div>

        {/* Location Section */}
        <div className="flex flex-col my-2">
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            🗺️ Locations:
          </Typography>
          {(showAllLocations ? locations : locations.slice(0, 1)).map((location, index) => (
            <div key={index} className="flex items-center mb-2">
              {editIndex === index ? (
                <>
                  <TextField
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <IconButton size="small" onClick={handleSaveLocation}>
                    <DoneIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {location}
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditLocation(index)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
          {!showAllLocations && locations.length > 1 && (
            <Button onClick={() => setShowAllLocations(true)} size="small">
              Show All
            </Button>
          )}
          {showAllLocations && (
            <Button onClick={() => setShowAllLocations(false)} size="small">
              Show Less
            </Button>
          )}
          {/* Add Location Input */}
          <div className="flex items-center mb-2">
            <TextField
              label="Add Location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)} 
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
            />
            <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addLocation}>
              Add
            </Button>
          </div>
        </div>

        <Divider />
<Requirements />

        {/* Requirements Section */}
        {/* <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body2">Requirements:</Typography>
          {(showAllRequirements ? requirements : requirements.slice(0, 1)).map((requirement, index) => (
            <div key={index} className="flex items-center mb-2">
              {editRequirementIndex === index ? (
                <>
                  <TextField
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <IconButton size="small" onClick={handleSaveRequirement}>
                    <DoneIcon />
                  </IconButton>
                </> */}
              {/* ) : (
                <>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {requirement}
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditRequirement(index)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))} */}
          {/* {!showAllRequirements && requirements.length > 1 && (
            <Button onClick={() => setShowAllRequirements(true)} size="small">
              Show All
            </Button>
          )}
          {showAllRequirements && (
            <Button onClick={() => setShowAllRequirements(false)} size="small">
              Show Less
            </Button>
          )} */}
          {/* Add Requirement Input */}
          {/* <div className="flex items-center mb-2">
            <TextField
              label="Add Requirement"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
            />
            <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addRequirement}>
              Add
            </Button>
          </div>
        </Box> */}

        <Divider />

        {/* Follow-up Section */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">Follow-up:</Typography>
          {(showAllReminders ? reminders : reminders.slice(0, 1)).map((reminder, index) => (
            <div key={index} className="flex items-center mb-2">
              {editReminderIndex === index ? (
                <>
                  <TextField
                    value={reminder}
                    onChange={(e) => setReminders(reminders.map((r, i) => i === index ? e.target.value : r))}
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                  />
                  <IconButton size="small" onClick={handleSaveReminder}>
                    <DoneIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="body2" sx={{ flexGrow: 1 }}>
                    {reminder}
                  </Typography>
                  <IconButton size="small" onClick={() => handleEditReminder(index)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </div>
          ))}
          {!showAllReminders && reminders.length > 1 && (
            <Button onClick={() => setShowAllReminders(true)} size="small">
              Show All
            </Button>
          )}
          {showAllReminders && (
            <Button onClick={() => setShowAllReminders(false)} size="small">
              Show Less
            </Button>
          )}
          {/* Add Reminder Input */}
          <div className="flex items-center mb-2">
            <TextField
              label="New Reminder"
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
            />
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddReminder}
            >
              Add
            </Button>
          </div>
        </Box>

        <Divider />

        {/* Call Logs */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Call Logs:
          </Typography>
          <List>
            {[
              { name: 'John Doe', details: 'Duration: 2:30 min', date: '25-Aug, 10:44 am' },
              { name: 'Jane Smith', details: 'Missed Call', date: '24-Aug, 09:20 am' },
            ]
              .slice(0, showAllCallLogs ? undefined : 1)
              .map((log, index) => (
                <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {log.name}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant="body2">{log.details}</Typography>
                    <Typography variant="body2" sx={{ textAlign: 'right', color: 'gray' }}>
                      {log.date}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
          </List>
          {!showAllCallLogs && (
            <Button onClick={() => setShowAllCallLogs(true)} size="small">
              Show All
            </Button>
          )}
          {showAllCallLogs && (
            <Button onClick={() => setShowAllCallLogs(false)} size="small">
              Show Less
            </Button>
          )}
        </Box>

        <Divider />

        {/* Comments Section */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2">All Comments:</Typography>
          <List>
            {(showAllComments ? comments : comments.slice(0, 1)).map((comment, index) => (
              <ListItem key={index}>
                <Typography variant="body2">{comment}</Typography>
              </ListItem>
            ))}
          </List>
          {!showAllComments && comments.length > 1 && (
            <Button onClick={() => setShowAllComments(true)} size="small">
              Show All
            </Button>
          )}
          {showAllComments && (
            <Button onClick={() => setShowAllComments(false)} size="small">
              Show Less
            </Button>
          )}
          <TextField
            label="Add a comment"
            size="small"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ marginTop: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={addComment}
                    color="primary"
                    aria-label="send comment"
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;











// import React, { useState, useRef, useEffect } from 'react';
// import { Box, Drawer, Divider } from '@mui/material';
// import { useForm, FormProvider } from 'react-hook-form';

// import LeadInformation from './LeadInformation';
// import PhoneNumbers from './PhoneNumbers';
// import Locations from './Locations';
// import Requirements from './Requirements';
// import Reminders from './Reminders';
// import CallLogs from './CallLogs';
// import Comments from './Comments';

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   const [numbers, setNumbers] = useState<string[]>(['01957795943', '01234629732']);
//   const [locations, setLocations] = useState<string[]>(['12/b Banani', 'Awwal Tower Gulshan']);
//   const [newLocation, setNewLocation] = useState<string>('');
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false);
//   const [showAllLocations, setShowAllLocations] = useState<boolean>(false);

//   const [requirements, setRequirements] = useState<string[]>(['Kitchen', 'Bedroom']);
//   const [newRequirement, setNewRequirement] = useState<string>('');
//   const [showAllRequirements, setShowAllRequirements] = useState<boolean>(false);
//   const [editRequirementIndex, setEditRequirementIndex] = useState<number | null>(null);

//   const [reminders, setReminders] = useState<string[]>(['Have to call - 25-Aug, 10:30 am']);
//   const [newReminder, setNewReminder] = useState<string>('');
//   const [editReminderIndex, setEditReminderIndex] = useState<number | null>(null);
//   const [showAllReminders, setShowAllReminders] = useState<boolean>(false);

//   const [comments, setComments] = useState<string[]>(['Wony: She is good - 25-06-2024, 2:36 am']);
//   const [newComment, setNewComment] = useState<string>('');
//   const [showAllComments, setShowAllComments] = useState<boolean>(false);

//   const [showAllCallLogs, setShowAllCallLogs] = useState<boolean>(false);

//   const methods = useForm({ defaultValues: { newNumber: '' } });

//   const sidebarRef = useRef<HTMLDivElement | null>(null);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside);
//     }

//     // Clean up the event listener when the component is unmounted
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);

//   return (
//     <Drawer anchor="right" open={isOpen} onClose={onClose}>
//       <Box ref={sidebarRef} sx={{ width: 400, padding: 2 }}>
//         {/* Lead Information */}
//         <LeadInformation />

//         {/* Use FormProvider to share form context methods */}
//         <FormProvider {...methods}>
//           {/* Phone Numbers */}
//           <PhoneNumbers
//             numbers={numbers}
//             showAllNumbers={showAllNumbers}
//             setShowAllNumbers={setShowAllNumbers}
//             addNumber={(data) => {
//               const trimmedNumber = data.newNumber.trim();
//               if (trimmedNumber !== '') {
//                 setNumbers([...numbers, trimmedNumber]);
//               }
//               methods.reset({ newNumber: '' });
//             }}
//             handleNumberChange={(index, value) =>
//               setNumbers(numbers.map((number, i) => (i === index ? value : number)))
//             }
//             handleEditNumber={setEditIndex}
//             handleSaveEdit={() => setEditIndex(null)}
//             editIndex={editIndex}
//           />
//         </FormProvider>

//         {/* Locations */}
//         <Locations
//           locations={locations}
//           showAllLocations={showAllLocations}
//           setShowAllLocations={setShowAllLocations}
//           newLocation={newLocation}
//           setNewLocation={setNewLocation}
//           addLocation={() => {
//             const trimmedLocation = newLocation.trim();
//             if (trimmedLocation !== '') {
//               setLocations([...locations, trimmedLocation]);
//               setNewLocation('');
//             }
//           }}
//           handleLocationChange={(index, value) =>
//             setLocations(locations.map((location, i) => (i === index ? value : location)))
//           }
//           handleEditLocation={setEditIndex}
//           handleSaveLocation={() => setEditIndex(null)}
//           editIndex={editIndex}
//         />

//         <Divider />

//         {/* Requirements */}
//         <Requirements
//           requirements={requirements}
//           newRequirement={newRequirement}
//           setNewRequirement={setNewRequirement}
//           showAllRequirements={showAllRequirements}
//           setShowAllRequirements={setShowAllRequirements}
//           handleRequirementChange={(index, value) =>
//             setRequirements(requirements.map((req, i) => (i === index ? value : req)))
//           }
//           handleEditRequirement={setEditRequirementIndex}
//           handleSaveRequirement={() => setEditRequirementIndex(null)}
//           addRequirement={() => {
//             if (newRequirement.trim() !== '') {
//               setRequirements([...requirements, newRequirement]);
//               setNewRequirement('');
//             }
//           }}
//           editRequirementIndex={editRequirementIndex}
//         />

//         <Divider />

//         {/* Reminders */}
//         <Reminders
//           reminders={reminders}
//           newReminder={newReminder}
//           setNewReminder={setNewReminder}
//           showAllReminders={showAllReminders}
//           setShowAllReminders={setShowAllReminders}
//           handleAddReminder={() => {
//             const trimmedReminder = newReminder.trim();
//             if (trimmedReminder !== '') {
//               setReminders([...reminders, trimmedReminder]);
//               setNewReminder('');
//             }
//           }}
//           handleEditReminder={setEditReminderIndex}
//           handleSaveReminder={() => setEditReminderIndex(null)}
//           editReminderIndex={editReminderIndex}
//         />

//         <Divider />

//         {/* Call Logs */}
//         <CallLogs showAllCallLogs={showAllCallLogs} setShowAllCallLogs={setShowAllCallLogs} />

//         <Divider />

//         {/* Comments */}
//         <Comments
//           comments={comments}
//           newComment={newComment}
//           setNewComment={setNewComment}
//           showAllComments={showAllComments}
//           setShowAllComments={setShowAllComments}
//           addComment={() => {
//             if (newComment.trim() !== '') {
//               setComments([...comments, newComment]);
//               setNewComment('');
//             }
//           }}
//         />
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
