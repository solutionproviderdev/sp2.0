import { useMemo, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useGetAllLeadQuery } from '../features/conversation/conversationApi';
import CardListView from '../components/LeadManagement/CardListView';
import LeadFilterAndPagination from '../components/LeadManagement/LeadFilterAndPagination';

const LeadManagement = () => {
	const today = new Date().toISOString().split('T')[0];

	// Filter states
	const [cre, setCre] = useState('');
	const [sales, setSales] = useState('');
	const [selectedSource, setSelectedSource] = useState('');
	const [selectedDateRange, setSelectedDateRange] = useState({
		startDate: today,
		endDate: today,
	});
	const [selectedStatus, setSelectedStatus] = useState('');
	const [viewAsCard, setViewAsCard] = useState(true);

	// Pagination states
	const [page, setPage] = useState(1);
	const [pageLimit, setPageLimit] = useState(20); // Default page limit

	// Query with all filter options and pagination control
	const { data, isFetching } = useGetAllLeadQuery({
		page,
		limit: pageLimit,
		status: selectedStatus,
		source: selectedSource,
		startDate: selectedDateRange?.startDate,
		endDate: selectedDateRange?.endDate,
		assignedCre: cre,
		salesExecutive: sales,
	});


	const leadData = useMemo(() => {
		if (!data) return [];

		const normalizedStatuses = data.leads.map(lead =>
			lead.status.trim().toLowerCase()
		);
		const statusCountMap = normalizedStatuses.reduce((acc, status) => {
			acc[status] = (acc[status] || 0) + 1;
			return acc;
		}, {});

		return Object.entries(statusCountMap).map(([status, count]) => ({
			status: status.charAt(0).toUpperCase() + status.slice(1),
			count,
		}));
	}, [data]);

	const handleStatusChange = event => {
		setSelectedStatus(event.target.value);
	};

	const handleSourceChange = event => {
		setSelectedSource(event.target.value);
	};

	const handleDateRangeChange = newValue => {
		setSelectedDateRange(newValue);
	};

	const handleToggleView = () => {
		setViewAsCard(prev => !prev);
	};

	return (
		<Box
			sx={{ height: '100vh', overflowY: 'auto', padding: 4 }}
			className="scrollbar-thin"
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

			{/* Filter and Pagination combined into one component */}
			<LeadFilterAndPagination
				selectedStatus={selectedStatus}
				handleStatusChange={handleStatusChange}
				selectedSource={selectedSource}
				handleSourceChange={handleSourceChange}
				selectedDateRange={selectedDateRange}
				handleDateRangeChange={handleDateRangeChange}
				filterOptions={data?.filters}
				cre={cre}
				setCre={setCre}
				sales={sales}
				setSales={setSales}
				viewAsCard={viewAsCard}
				handleToggleView={handleToggleView}
				currentPage={page}
				totalPages={data?.totalPages}
				pageLimit={pageLimit}
				setPageLimit={setPageLimit}
				setPage={setPage}
				totalLeads={data?.total}
				displayedLeads={data?.leads.length || 0}
			/>

			<Typography variant="h6" gutterBottom>
				{isFetching ? 'Loading...' : `Showing ${data?.leads.length} leads`}
			</Typography>

			<CardListView viewAsCard={viewAsCard} data={data?.leads || []} />
		</Box>
	);
};

export default LeadManagement;
