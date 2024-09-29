
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Container,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Card,
    CardContent,
    Switch,
    Modal,
    TextField
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SettingsIcon from '@mui/icons-material/Settings';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useGetAllConversationsQuery } from '../features/conversation/conversationApi';


// Sample data for leads
const leadData = [
    { status: 'Read', count: 150 },
    { status: 'Unread', count: 300 },
    { status: 'Phone Number', count: 400 },
    { status: 'No Phone', count: 150 },
    { status: 'Active', count: 350 },
    { status: 'Inactive', count: 200 },
];

const LeadManagement = () => {

    // Set the page to 1 and the limit to 500
    const page = 1;
    const limit = 150;
    const { data, error, isLoading } = useGetAllConversationsQuery({
        page,
        limit,
    });
    // const lead = data

    console.log('lead management lead', data,error ,isLoading)

    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        setDatePickerOpen(false); // Close the modal after selecting a date
        console.log('cre date',first)
    };

    const [cre, setCre] = useState('');
    const [sales, setSales] = useState('');
    const [viewAsCard, setViewAsCard] = useState(false); // For toggling between card and raw view

    const handleCreChange = (event) => {
        setCre(event.target.value);
        console.log('cre log',event.target.value);
    };

    const handleSalesChange = (event) => {
        setSales(event.target.value);
        console.log('sales log',event.target.value);
    };

    return (
        <div>
            <Box
            sx={{
                height: '100vh', // Take the full height of the viewport
                overflowY: 'auto', // Enable vertical scrolling
                padding: 4,
            }}
        > 
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Lead Status Overview
                    </Typography>
                    <Box sx={{ height: 300, width: '100%' }}>
                        <BarChart
                            dataset={leadData}
                            xAxis={[{ scaleType: 'band', dataKey: 'status' }]}
                            series={[{ dataKey: 'count', label: 'Lead Count' }]}
                            height={300}
                        />
                    </Box>
                </Paper>

                {/* Buttons Section */}
                <Box mb={3} className='flex justify-around items-center'>
                    <Button variant="contained" color="primary" className='h-8'>
                        + Create
                    </Button>
                    <Button variant="contained" color="primary" className='h-8'>
                        Status
                    </Button>

                    {/* CRE Dropdown */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="cre-select-label" className='p-4'>CRE</InputLabel>
                        <Select
                            className='h-8'
                            labelId="cre-select-label"
                            id="cre-select"
                            value={cre}
                            label="CRE"
                            onChange={handleCreChange}
                        >
                            <MenuItem value="" className='h-8'>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="CRE 1">CRE 1</MenuItem>
                            <MenuItem value="CRE 2">CRE 2</MenuItem>
                            <MenuItem value="CRE 3">CRE 3</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Sales Dropdown */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="sales-select-label">Sales</InputLabel>
                        <Select
                            className='h-8'
                            labelId="sales-select-label"
                            id="sales-select"
                            value={sales}
                            label="Sales"
                            onChange={handleSalesChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Sales 1">Sales 1</MenuItem>
                            <MenuItem value="Sales 2">Sales 2</MenuItem>
                            <MenuItem value="Sales 3">Sales 3</MenuItem>
                        </Select>
                    </FormControl>



                </Box>

                <div className='flex justify-between items-center'>
                    <div>
                        <Box my={2}>
                            {/* Date Button */}
                            <Button className='flex gap-1 h-8' variant="contained" color="primary" onClick={() => setDatePickerOpen(true)}>
                                <h1>Date</h1><InsertInvitationIcon />
                            </Button>

                            {/* Modal for Date Picker */}
                            <Modal open={isDatePickerOpen} onClose={() => setDatePickerOpen(false)}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4,
                                        borderRadius: 2,
                                    }}
                                >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Select Date"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Modal>
                        </Box>

                    </div>

                    <div className='flex gap-4 h-10'>

                        {/* Toggle View Button */}

                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="left" aria-label="left aligned"
                                onClick={() => setViewAsCard(false)}
                            >
                                <FormatAlignLeftIcon />
                            </ToggleButton>
                            <ToggleButton value="center" aria-label="centered"
                                onClick={() => setViewAsCard(true)}
                            >
                                <FormatAlignCenterIcon />
                            </ToggleButton>

                        </ToggleButtonGroup>

                        {/* Add another Button */}
                        <Button variant="contained" color="secondary">
                            <SettingsIcon />
                        </Button>
                    </div>
                </div>

                {/* Lead Count Heading */}
                <Typography variant="h6" gutterBottom>
                    Showing {data?.leads.length} leads
                </Typography>

                {/* Leads Display */}
                {viewAsCard ? (
                    <Grid container spacing={2}>
                        {data?.leads.map((lead) => (
                            <Grid item xs={12} sm={6} md={4} key={lead.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{lead.name}</Typography>
                                        <Typography>Status: {lead.status}</Typography>
                                        {lead?.phoneNumber && <Typography>Phone: {lead.phoneNumber}</Typography>}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.leads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.name}</td>
                                    <td>{lead.status}</td>
                                    {lead?.phoneNumber && <td>{lead.phoneNumber}</td> }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Box>
        </div>
    );
};

export default LeadManagement;

























// import React, { useState } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Button,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Grid,
//     Card,
//     CardContent,
//     Modal,
//     TextField,
// } from '@mui/material';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { useGetAllConversationsQuery } from '../features/conversation/conversationApi';

// const leadData = [
//     { status: 'Read', count: 150 },
//     { status: 'Unread', count: 300 },
//     { status: 'Phone Number', count: 400 },
//     { status: 'No Phone', count: 150 },
//     { status: 'Active', count: 350 },
//     { status: 'Inactive', count: 200 },
// ];

// const LeadManagement = () => {
//     const page = 1;
//     const limit = 150;
//     const { data, error, isLoading } = useGetAllConversationsQuery({
//         page,
//         limit,
//     });

//     const [alignment, setAlignment] = useState('left');
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [isDatePickerOpen, setDatePickerOpen] = useState(false);
//     const [cre, setCre] = useState('');
//     const [sales, setSales] = useState('');
//     const [viewAsCard, setViewAsCard] = useState(false);

//     const handleAlignment = (event, newAlignment) => setAlignment(newAlignment);
//     const handleDateChange = (newValue) => {
//         setSelectedDate(newValue);
//         setDatePickerOpen(false); // Close the modal after selecting a date
//     };
//     const handleCreChange = (event) => setCre(event.target.value);
//     const handleSalesChange = (event) => setSales(event.target.value);

//     return (
//         <Box
//             sx={{
//                 height: '100vh', // Take the full height of the viewport
//                 overflowY: 'auto', // Enable vertical scrolling
//                 padding: 4,
//             }}
//         >
//             <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
//                 <Typography variant="h6" gutterBottom>
//                     Lead Status Overview
//                 </Typography>
//                 <Box sx={{ width: '100%' }}>
//                     <BarChart
//                         dataset={leadData}
//                         xAxis={[{ scaleType: 'band', dataKey: 'status' }]}
//                         series={[{ dataKey: 'count', label: 'Lead Count' }]}
//                         height={300}
//                     />
//                 </Box>
//             </Paper>

//             {/* Buttons Section */}
//             <Box mb={3} display="flex" justifyContent="space-around" alignItems="center">
//                 <Button variant="contained" color="primary">
//                     + Create
//                 </Button>
//                 <Button variant="contained" color="primary">
//                     Status
//                 </Button>

//                 {/* CRE Dropdown */}
//                 <FormControl sx={{ minWidth: 200 }}>
//                     <InputLabel id="cre-select-label">CRE</InputLabel>
//                     <Select
//                         labelId="cre-select-label"
//                         id="cre-select"
//                         value={cre}
//                         label="CRE"
//                         onChange={handleCreChange}
//                     >
//                         <MenuItem value="">
//                             <em>None</em>
//                         </MenuItem>
//                         <MenuItem value="CRE 1">CRE 1</MenuItem>
//                         <MenuItem value="CRE 2">CRE 2</MenuItem>
//                         <MenuItem value="CRE 3">CRE 3</MenuItem>
//                     </Select>
//                 </FormControl>

//                 {/* Sales Dropdown */}
//                 <FormControl sx={{ minWidth: 200 }}>
//                     <InputLabel id="sales-select-label">Sales</InputLabel>
//                     <Select
//                         labelId="sales-select-label"
//                         id="sales-select"
//                         value={sales}
//                         label="Sales"
//                         onChange={handleSalesChange}
//                     >
//                         <MenuItem value="">
//                             <em>None</em>
//                         </MenuItem>
//                         <MenuItem value="Sales 1">Sales 1</MenuItem>
//                         <MenuItem value="Sales 2">Sales 2</MenuItem>
//                         <MenuItem value="Sales 3">Sales 3</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>

//             {/* Date Button */}
//             <Box my={2} >
//                 <Button
//                     className="flex gap-1 h-8"
//                     variant="contained"
//                     color="primary"
//                     onClick={() => setDatePickerOpen(true)}
//                 >
//                     Date <InsertInvitationIcon />
//                 </Button>

//                 {/* Modal for Date Picker */}
//                 <Modal open={isDatePickerOpen} onClose={() => setDatePickerOpen(false)}>
//                     <Box
//                         sx={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             bgcolor: 'background.paper',
//                             boxShadow: 24,
//                             p: 4,
//                             borderRadius: 2,
//                         }}
//                     >
//                         <LocalizationProvider dateAdapter={AdapterDayjs}>
//                             <DatePicker
//                                 label="Select Date"
//                                 value={selectedDate}
//                                 onChange={handleDateChange}
//                                 renderInput={(params) => <TextField {...params} />}
//                             />
//                         </LocalizationProvider>
//                     </Box>
//                 </Modal>
//             </Box>

//             {/* View Toggles and Settings */}
//             <Box display="flex" gap={4} alignItems="center">
//                 <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
//                     <ToggleButton value="left" onClick={() => setViewAsCard(false)}>
//                         <FormatAlignLeftIcon />
//                     </ToggleButton>
//                     <ToggleButton value="center" onClick={() => setViewAsCard(true)}>
//                         <FormatAlignCenterIcon />
//                     </ToggleButton>
//                 </ToggleButtonGroup>

//                 <Button variant="contained" color="secondary">
//                     <SettingsIcon />
//                 </Button>
//             </Box>

//             {/* Lead Count Heading */}
//             <Typography variant="h6" gutterBottom mt={4}>
//                 Showing {data?.leads?.length || 0} leads
//             </Typography>

//             {/* Leads Display */}
//             {viewAsCard ? (
//                 <Grid container spacing={2}>
//                     {data?.leads.map((lead) => (
//                         <Grid item xs={12} sm={6} md={4} key={lead.id}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h6">{lead.name}</Typography>
//                                     <Typography>Status: {lead.status}</Typography>
//                                     {lead?.phoneNumber && <Typography>Phone: {lead.phoneNumber}</Typography>}
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))}
//                 </Grid>
//             ) : (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Name</th>
//                             <th>Status</th>
//                             <th>Phone</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data?.leads.map((lead) => (
//                             <tr key={lead.id}>
//                                 <td>{lead.name}</td>
//                                 <td>{lead.status}</td>
//                                 {lead?.phoneNumber && <td>{lead.phoneNumber}</td>}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </Box>
//     );
// };

// export default LeadManagement;
