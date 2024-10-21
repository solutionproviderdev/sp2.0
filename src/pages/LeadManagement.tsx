
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
    IconButton,
    Chip,
    Avatar,
    Tooltip
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import { useGetAllLeadQuery } from '../features/conversation/conversationApi';
import { useNavigate } from 'react-router-dom';
import CreateLead from '../components/LeadManagement/CreateLead';
import Datepicker from 'react-tailwindcss-datepicker';

import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import { CalendarIcon } from '@mui/x-date-pickers/icons';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardListView from '../components/LeadManagement/CardListView';


const LeadManagement = () => {
    const [alignment, setAlignment] = useState('left');
    const [cre, setCre] = useState('');
    const [sales, setSales] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState({ startDate: null, endDate: null });
    const [filteredData, setFilteredData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [viewAsCard, setViewAsCard] = useState(false);
    const [cardView, setCardView] = useState(true);

    console.log('leadmanagement---->', filteredData)
    const navigate = useNavigate();

    const page = 1;
    const limit = 150;
    const { data, error, isLoading } = useGetAllLeadQuery({
        page,
        limit,
    });

    useEffect(() => {
        if (data) {
            setFilteredData(data.leads);
        }
    }, [data]);

    const leadData = useMemo(() => {
        if (!data) return [];

        const normalizedStatuses = data?.leads?.map((lead) => lead.status.trim().toLowerCase());
        const statusCountMap = normalizedStatuses.reduce((acc, status) => {
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(statusCountMap).map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1),
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
            setFilteredData(data.leads);
        }
    };

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
            setFilteredData(data.leads);
        }
    };

    const handleToggle = () => {
        setCardView(!cardView);
        setViewAsCard(!viewAsCard)
    };

    return (
        <div>
            <Box
                sx={{
                    height: '100vh',
                    overflowY: 'auto',
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
                {/* CardListView comonent for card and list view */}
                <CardListView viewAsCard={viewAsCard} data={filteredData} />
            </Box>
        </div>
    );
};

export default LeadManagement;
