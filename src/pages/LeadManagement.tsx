
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
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
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

import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';


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

    console.log('lead management lead', data, error, isLoading)

    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        setDatePickerOpen(false); // Close the modal after selecting a date
        console.log('cre date', first)
    };

    const [cre, setCre] = useState('');
    const [sales, setSales] = useState('');
    const [viewAsCard, setViewAsCard] = useState(false); // For toggling between card and raw view

    const handleCreChange = (event) => {
        setCre(event.target.value);
        console.log('cre log', event.target.value);
    };

    const handleSalesChange = (event) => {
        setSales(event.target.value);
        console.log('sales log', event.target.value);
    };
    console.log('phone number--',data?.leads)

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
                 
                </Box>


                {/* Lead Count Heading */}
                <Typography variant="h6" gutterBottom>
                    Showing {data?.leads.length} leads
                </Typography>

                {/* Leads Display card and table*/}

                {viewAsCard ? (
                    <Grid container spacing={2}>
                        {data?.leads.map((lead) => (
                            <Grid item xs={12} sm={6} md={4} key={lead._id}>
                                <Card className='h-full'>
                                    <CardContent>
                                    <Box mt={2} display="flex" justifyContent="space-around">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<PhoneIcon />}
                                            >
                                                Status
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<ChatIcon />}
                                            >
                                                Tags
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<ChatIcon />}
                                            >
                                                btn
                                            </Button>
                                        </Box>
                                        {/* Last Message and Date */}
                                        <Typography variant="h5" className='p-2'>{lead.name}</Typography>
                                        <Typography variant="body2" className='p-2' color="textSecondary">
                                            Last Message: {lead.lastMsg}
                                        </Typography>
                                        <Typography className='p-2' variant="caption" color="textSecondary">
                                            {new Date(lead.date).toLocaleString()}
                                        </Typography>

                                        {/* Call and Chat Buttons */}
                                        <Box mt={2} display="flex" justifyContent="space-around">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<PhoneIcon />}
                                            >
                                                Call
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<ChatIcon />}
                                            >
                                                Chat
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Last Message</TableCell>
                                    <TableCell>number</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.leads.map((lead) => (
                                    <TableRow key={lead._id}>
                                        <TableCell>{lead.name}</TableCell>
                                        <TableCell>{lead.status}</TableCell>
                                        <TableCell>{lead.lastMsg}</TableCell>
                                        <TableCell>{lead.phone}</TableCell>
                                        <TableCell>
                                            {new Date(lead.date).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>
                                                Call
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<ChatIcon />}
                                                sx={{ ml: 1 }}
                                            >
                                                Chat
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
            </Box>
        </div>
    );
};

export default LeadManagement;
