
import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Card,
    CardContent,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import { useGetAllLeadQuery } from '../features/conversation/conversationApi';
import { useNavigate } from 'react-router-dom';
import CreateLead from '../components/LeadManagement/CreateLead';
import Datepicker from 'react-tailwindcss-datepicker';

import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';

const LeadManagement = () => {
    const [alignment, setAlignment] = useState('left');
    const [cre, setCre] = useState('');
    const [sales, setSales] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null }); // Store selected date range
    const [filteredData, setFilteredData] = useState([]); // Store filtered leads data
    const [selectedStatus, setSelectedStatus] = useState(''); // Store selected status
    const [viewAsCard, setViewAsCard] = useState(false); // For toggling between card and raw view
    const [cardView, setCardView] = useState(true); // Default is card view


    const navigate = useNavigate();

    // Set the page to 1 and the limit to 500
    const page = 1;
    const limit = 150;
    const { data, error, isLoading } = useGetAllLeadQuery({
        page,
        limit,
    });

    // Set filteredData to all leads initially
    useEffect(() => {
        if (data) {
            setFilteredData(data.leads);
        }
    }, [data]);

    // Function to normalize and count statuses for the bar chart
    const leadData = useMemo(() => {
        if (!data) return [];

        const normalizedStatuses = data?.leads?.map((lead) => lead.status.trim().toLowerCase());
        const statusCountMap = normalizedStatuses.reduce((acc, status) => {
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(statusCountMap).map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize first letter
            count,
        }));
    }, [data]);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleCreChange = (event) => {
        setCre(event.target.value);
    };

    const handleSalesChange = (event) => {
        setSales(event.target.value);
    };

    // Handle Status Filter Change
    const handleStatusChange = (event) => {
        const selectedStatus = event.target.value;
        setSelectedStatus(selectedStatus);

        if (selectedStatus) {
            const leadByStatus = data.leads.filter((lead) => lead.status === selectedStatus);
            setFilteredData(leadByStatus);
        } else {
            setFilteredData(data.leads); // Reset to all leads if no status is selected
        }
    };

    // Handle Date Range Change for filtering leads
    const handleDateRangeChange = (newValue) => {
        setSelectedDateRange(newValue);

        if (newValue.startDate && newValue.endDate) {
            const filteredLeadsByDate = data.leads.filter((lead) => {
                const createdAtDate = new Date(lead.createdAt).getTime();
                return (
                    createdAtDate >= new Date(newValue.startDate).getTime() &&
                    createdAtDate <= new Date(newValue.endDate).getTime()
                );
            });
            setFilteredData(filteredLeadsByDate);
        } else {
            setFilteredData(data.leads); // Reset to all leads if no date range is selected
        }
    };

    const handleToggle = () => {
        setCardView(!cardView); // Toggle between card and list view
        setViewAsCard(!viewAsCard)
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

                <Box mb={3} className="flex justify-around items-center">
                    <CreateLead />

                    {/* Status Dropdown */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel
                            id="cre-select-label"
                            sx={{
                                fontSize: '0.8rem',
                                lineHeight: '32px',
                                transform: 'translate(14px, -0px)',
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -12px) scale(0.75)',
                                },
                            }}
                        >
                            Status
                        </InputLabel>
                        <Select
                            value={selectedStatus}
                            onChange={handleStatusChange}
                            label="Status"
                            sx={{ height: '32px', fontSize: '0.8rem' }}
                        >
                            {[
                                'unread',
                                'No Response',
                                'Need Support',
                                'Message Reschedule',
                                'Number Collected',
                                'Call Reschedule',
                                'On Going',
                                'Close',
                                'Meeting Fixed',
                                'Meeting Pospond',
                                'Follow Up',
                            ].map((status, index) => (
                                <MenuItem key={index} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Date Range Picker */}
                    <div className='border border-gray-400 rounded-lg'>
                        <Datepicker
                            value={selectedDateRange}
                            onChange={handleDateRangeChange}
                            showShortcuts={true}
                        />
                    </div>

                    {/* CRE Dropdown */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel
                            id="cre-select-label"
                            sx={{
                                fontSize: '0.8rem',
                                lineHeight: '32px',
                                transform: 'translate(14px, -0px)',
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -12px) scale(0.75)',
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
                                height: '32px',
                                fontSize: '0.8rem',
                            }}
                        >
                            <MenuItem value="" sx={{ fontSize: '0.8rem', height: '30px' }}>
                                <em>None</em>
                            </MenuItem>
                            {['CRE1', 'CRE2', 'CRE3'].map((status, index) => (
                                <MenuItem key={index} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Sales Dropdown */}
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel
                            labelId="cre-select-label"
                            id="sales-select-label"
                            sx={{
                                fontSize: '1rem',
                                lineHeight: '32px',
                                transform: 'translate(14px, -0px)',
                                '&.MuiInputLabel-shrink': {
                                    transform: 'translate(14px, -12px) scale(0.75)',
                                },
                            }}
                        >
                            Sales
                        </InputLabel>
                        <Select
                            className="h-8"
                            labelId="sales-select-label"
                            id="sales-select"
                            value={sales}
                            label="Sales"
                            onChange={handleSalesChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {['Sales 1', 'Sales 2', 'Sales 3'].map((status, index) => (
                                <MenuItem key={index} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="flex gap-4 h-10">

                        <Button
                            onClick={handleToggle}
                            className="!bg-gray-100 hover:!bg-gray-200 transition-colors duration-200"
                        >
                            <div className=' p-2 rounded-md'>

                                {cardView ? (
                                    <FormatListBulletedSharpIcon className="!font-bold !text-3xl" />
                                ) : (
                                    <ViewAgendaSharpIcon className="!font-bold !text-3xl" />
                                )}
                            </div>
                        </Button>


                        <Button variant="contained" color="secondary">
                            <SettingsIcon />
                        </Button>
                    </div>
                </Box>

                <Typography variant="h6" gutterBottom>
                    Showing {filteredData.length} leads
                </Typography>

                {/* Render Lead Cards or Table based on View */}
                {viewAsCard ? (
                    <Grid container spacing={2}>
                        {filteredData.map((lead) => (
                            <Grid item xs={12} sm={6} md={4} key={lead._id}>
                                <Card className="h-full">
                                    <CardContent>
                                        <Box mt={2} display="flex" justifyContent="space-around">
                                            <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>
                                                Status
                                            </Button>
                                            <Button variant="contained" color="secondary" startIcon={<ChatIcon />}>
                                                Tags
                                            </Button>
                                            <Button variant="contained" color="secondary" startIcon={<ChatIcon />}>
                                                btn
                                            </Button>
                                        </Box>
                                        <Typography variant="h5" className="p-2">
                                            {lead.name}
                                        </Typography>
                                        <Typography variant="body2" className="p-2" color="textSecondary">
                                            <p className="!line-clamp-2">Last Message: {lead.lastMsg}</p>
                                        </Typography>
                                        <Typography className="p-2" variant="caption" color="textSecondary">
                                            {new Date(lead.createdAt).toLocaleString()}
                                        </Typography>
                                        <Box mt={2} display="flex" justifyContent="space-around">
                                            <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>
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
                                    <TableCell>Number</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((lead) => (
                                    <TableRow key={lead._id}>
                                        <TableCell>{lead.name}</TableCell>
                                        <TableCell>{lead.status}</TableCell>
                                        <TableCell>
                                            <p className="!line-clamp-1">{lead.lastMsg}</p>
                                        </TableCell>
                                        <TableCell>{lead.phone}</TableCell>
                                        <TableCell>{new Date(lead.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>
                                            <div className="flex">
                                                <Button variant="contained" color="primary" startIcon={<PhoneIcon />}>
                                                    Call
                                                </Button>
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
