import { FormControl, Button, IconButton, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { PieChart } from '@mui/x-charts/PieChart';
import { useGetAllLeadsWithRemindersQuery } from '../features/lead/leadAPI';
import dayjs from 'dayjs';
import { FaAngleRight, FaSort } from 'react-icons/fa'; // Import FaSort for sorting icon
import ReminderCard from '../components/follow-up/ReminderCard';
import { useNavigate, useParams } from 'react-router-dom';
import FollowUp from './FollowUp';
import { useSelector } from 'react-redux';
import CustomSelectWithPictures from '../components/UI/inputs/CustomSelectWithPictures';

const FollowUpList = () => {
	const today = dayjs().format('YYYY-MM-DD');
	const { user } = useSelector(state => state.auth);

	// State to manage filter options
	const [dateRange, setDateRange] = useState({
		startDate: today,
		endDate: today,
	});
	const [cre, setCre] = useState('');
	const [sales, setSales] = useState('');
	const [isSorted, setIsSorted] = useState(true); // Default sorting is enabled

	// Pie chart data
	const [pendingCount, setPendingCount] = useState(0);
	const [missedCount, setMissedCount] = useState(0);
	const [completeCount, setCompleteCount] = useState(0);
	const [lateCompleteCount, setLateCompleteCount] = useState(0); // Add Late Complete count
	const navigate = useNavigate();
	const { leadId } = useParams();

	// Automatically set CRE filter for CRE users
	useEffect(() => {
		if (user.type === 'CRE') {
			setCre(user._id);
		}
	}, [user]);

	// Fetch filter options and reminders
	const { data: reminders, refetch } = useGetAllLeadsWithRemindersQuery({
		startDate: dateRange.startDate
			? dayjs(dateRange.startDate).format('YYYY-MM-DD')
			: '',
		endDate: dateRange.endDate
			? dayjs(dateRange.endDate).format('YYYY-MM-DD')
			: '',
		assignedCre: cre,
		salesExecutive: sales,
	});

	// Calculate counts for each reminder status when reminders data changes
	useEffect(() => {
		if (reminders?.leads) {
			let pending = 0;
			let missed = 0;
			let complete = 0;
			let lateComplete = 0;

			// Loop through the leads and count reminders based on their status
			reminders.leads.forEach(lead => {
				lead.reminder.forEach(rem => {
					if (rem.status === 'Pending') pending++;
					if (rem.status === 'Missed') missed++;
					if (rem.status === 'Complete') complete++;
					if (rem.status === 'Late Complete') lateComplete++;
				});
			});

			setPendingCount(pending);
			setMissedCount(missed);
			setCompleteCount(complete);
			setLateCompleteCount(lateComplete);
		}
	}, [reminders]);

	// Handle the search button click
	const handleSearch = () => {
		refetch(); // Refetch with the current filter values
	};

	// Create an array of not complete leadIds from the reminders data
	const leadIds = reminders?.leads
		?.filter(lead => {
			// Check if the last reminder of the lead is not complete
			const lastReminder = lead.reminder[lead.reminder.length - 1];
			return lastReminder && lastReminder.status !== 'Complete';
		})
		.map(lead => lead._id);

	// Handle start button click
	const handleStartClick = () => {
		if (leadIds && leadIds.length > 0) {
			navigate(`/admin/lead-followUp/${leadIds[0]}`);
		}
	};

	// Handle sorting button click
	const handleSortClick = () => {
		setIsSorted(!isSorted); // Toggle sorting state
	};

	// Sort reminders based on status priority
	const sortedLeads = isSorted
		? reminders?.leads?.slice().sort((a, b) => {
				const statusPriority = {
					Missed: 0,
					Pending: 1,
					'Late Complete': 2,
					Complete: 3,
				};
				const aStatus = a.reminder[a.reminder.length - 1].status;
				const bStatus = b.reminder[b.reminder.length - 1].status;
				return statusPriority[aStatus] - statusPriority[bStatus];
		  })
		: reminders?.leads;

	if (leadId) {
		return <FollowUp leadIdList={leadIds} />;
	}

	return (
		<div className="flex flex-col space-y-6 p-6">
			{/* Top Section with Filter Options and Pie Chart */}
			<div className="flex justify-between">
				{/* Left Filter Section */}
				<div className="flex flex-col space-y-2 rounded-lg p-2 w-2/5 shadow-lg">
					<h1 className="text-xl mb-4">Filter Options</h1>

					{/* Date Range Picker */}
					<FormControl fullWidth>
						<div className="border border-gray-400 rounded-md">
							<Datepicker
								value={dateRange}
								onChange={newValue => setDateRange(newValue)}
								asSingle={false} // For date range
								useRange={true}
								showShortcuts
								displayFormat="MM/DD/YYYY"
							/>
						</div>
					</FormControl>

					{/* CRE Filter (Only for Admin) */}
					{user.type === 'Admin' && (
						<CustomSelectWithPictures
							label="CRE"
							name="cre"
							value={cre}
							onChange={e => setCre(e.target.value as string)}
							options={
								reminders?.filterOptions?.creNames?.map(creName => ({
									value: creName._id,
									label: creName.name,
									profilePicture: creName.profilePicture,
								})) || []
							}
							clearable={true}
						/>
					)}

					{/* Sales Filter */}
					<CustomSelectWithPictures
						label="Sales"
						name="sales"
						value={sales}
						onChange={e => setSales(e.target.value as string)}
						options={
							reminders?.filterOptions?.salesNames?.map(salesName => ({
								value: salesName._id,
								label: salesName.name,
								profilePicture: salesName.profilePicture,
							})) || []
						}
						clearable={true}
					/>

					{/* Search Button */}
					<Button
						variant="contained"
						color="primary"
						fullWidth
						onClick={handleSearch}
					>
						Search
					</Button>
				</div>

				{/* Middle Pie Chart Section */}
				<div className="w-2/5 flex justify-center items-center">
					<PieChart
						series={[
							{
								data: [
									{ id: 0, value: pendingCount, color: 'orange' },
									{ id: 1, value: missedCount, color: 'red' },
									{ id: 2, value: completeCount, color: 'green' },
									{ id: 3, value: lateCompleteCount, color: 'blue' },
								],
							},
						]}
						// width={400}
						// height={200}
						className="w-1/3"
					/>
					<div className="w-2/3">
						<p>
							Total:{' '}
							{pendingCount + missedCount + completeCount + lateCompleteCount}
						</p>
						<p>Pending: {pendingCount}</p>
						<p>Missed: {missedCount}</p>
						<p>Late Complete: {lateCompleteCount}</p>
						<p>Complete: {completeCount}</p>
					</div>
				</div>

				{/* Right Start Button Section */}
				<Button
					onClick={handleStartClick}
					variant="contained"
					color="primary"
					className="w-1/5 text-5xl"
				>
					<p className="text-2xl">Start</p>
					<FaAngleRight className="text-5xl" />
				</Button>
			</div>

			{/* Follow-Up Summary Section */}
			<div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm">
				<Typography variant="h6" fontWeight="bold">
					Follow-Ups Left: {pendingCount + missedCount + lateCompleteCount}
				</Typography>
				<IconButton onClick={handleSortClick} color="primary">
					<FaSort /> {/* Minimalistic sort icon button */}
				</IconButton>
			</div>

			{/* Reminder Information Cards Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{sortedLeads?.map(lead => (
					<ReminderCard reminder={lead} key={lead._id} />
				))}
			</div>
		</div>
	);
};

export default FollowUpList;
