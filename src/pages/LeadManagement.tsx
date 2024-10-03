
import React, { useMemo, useState } from 'react';
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
import SettingsIcon from '@mui/icons-material/Settings';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import { useGetAllLeadQuery } from '../features/conversation/conversationApi';
import { useNavigate } from 'react-router-dom';
import RangeDatePick from '../components/shared/RangeDatePick';



const LeadManagement = () => {
    const navigate = useNavigate();

    // Set the page to 1 and the limit to 500
    const page = 1;
    const limit = 150;
    const { data, error, isLoading } = useGetAllLeadQuery({
        page,
        limit,
    });

    // Function to normalize and count statuses
    const leadData = useMemo(() => {
        console.log('leads is hare ',data)
        if (!data) return [];

        // Normalize statuses (trim whitespace, convert to lowercase)
        const normalizedStatuses = data?.leads?.map(lead => lead.status.trim().toLowerCase());

        // Count occurrences of each status
        const statusCountMap = normalizedStatuses.reduce((acc, status) => {
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        // Convert statusCountMap to the format expected by BarChart
        return Object.entries(statusCountMap).map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize first letter for display
            count,
        }));
    }, [data]);

    // const lead = data
    console.log('status-- to lead management ', data?.leads.map(lead=>lead.status,))

 
    const [alignment, setAlignment] = React.useState('left');

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };


    const [cre, setCre] = useState('');
    const [sales, setSales] = useState('');
    const [viewAsCard, setViewAsCard] = useState(false); // For toggling between card and raw view
    const [isDatePickerOpen, setDatePickerOpen] = useState(false); // State to control modal visibility
    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null }); // Store selected date range

    const handleCreChange = (event) => {
        setCre(event.target.value);
        console.log('cre log', event.target.value);
    };

    const handleSalesChange = (event) => {
        setSales(event.target.value);
        console.log('sales log', event.target.value);
    };
    console.log('phone number--', data?.leads)

    const handleDateRangeChange = (range) => {
        setSelectedDateRange(range); // Set the selected date range
        setDatePickerOpen(false); // Close modal after date is selected
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

                        <InputLabel
                            id="cre-select-label"
                            sx={{
                                fontSize: '0.8rem',
                                lineHeight: '32px', // Match the height of the select box for vertical centering
                                transform: 'translate(14px, -0px) ', // Center label vertically
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -12px) scale(0.75)', // Shrink and move label up on focus/click
                                },
                            }}
                        >
                            CRE
                        </InputLabel>

                        <Select
                            labelId="cre-select-label"
                            id="cre-select"
                            value={cre}
                            label="CRE"
                            onChange={handleCreChange}
                            sx={{
                                height: '32px', // Adjust the height of the select box
                                fontSize: '0.8rem', // Reduce the font size
                            }}
                        >
                            <MenuItem value="" sx={{ fontSize: '0.8rem', height: '30px' }}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="CRE 1" sx={{ fontSize: '0.8rem', height: '30px' }}>CRE 1</MenuItem>
                            <MenuItem value="CRE 2" sx={{ fontSize: '0.8rem', height: '30px' }}>CRE 2</MenuItem>
                            <MenuItem value="CRE 3" sx={{ fontSize: '0.8rem', height: '30px' }}>CRE 3</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Sales Dropdown */}
                    <FormControl sx={{ minWidth: 200 }}>
                        {/* <InputLabel id="sales-select-label">Sales</InputLabel> */}
                        <InputLabel
                            labelId="cre-select-label"
                            id="sales-select-label"
                            sx={{
                                fontSize: '1rem',
                                lineHeight: '32px', // Match the height of the select box for vertical centering
                                transform: 'translate(14px, -0px) ', // Center label vertically
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -12px) scale(0.75)', // Shrink and move label up on focus/click
                                },
                            }}
                        >
                            sales
                        </InputLabel>

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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setDatePickerOpen(true)} // Open the modal
                        >
                            Date <InsertInvitationIcon />
                        </Button>

                        {/* Date Picker Modal */}
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
                                <RangeDatePick onChange={handleDateRangeChange} />
                            </Box>
                        </Modal>

                        {/* Display Selected Date Range */}
                        {selectedDateRange.startDate && selectedDateRange.endDate && (
                            <Typography variant="body1">
                                Selected Range: {new Date(selectedDateRange.startDate).toLocaleDateString()} to {new Date(selectedDateRange.endDate).toLocaleDateString()}
                            </Typography>
                        )}



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
                                            <p className='!line-clamp-2'>Last Message:{lead.lastMsg}</p>
                                        </Typography>
                                        <Typography className='p-2' variant="caption" color="textSecondary">
                                            {new Date(lead.createdAt).toLocaleString()}
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
                                                onClick={() => navigate(`/admin/lead-center/${lead._id}`)}
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
                                        <TableCell  > <p className='!line-clamp-1'> {lead.lastMsg}</p> </TableCell>
                                        <TableCell>{lead.phone} </TableCell>
                                        <TableCell>
                                            {new Date(lead.createdAt).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex'>
                                                <div>
                                                    <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>
                                                        Call
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        startIcon={<ChatIcon />}
                                                        sx={{ ml: 1 }}
                                                        onClick={() => navigate(`/admin/lead-center/${lead._id}`)}
                                                    >
                                                        Chat
                                                    </Button>
                                                </div>
                                            </div>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>x
                    </TableContainer>

                )}
            </Box>
        </div>
    );
};

export default LeadManagement;

