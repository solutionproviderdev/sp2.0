import React from 'react';
import { Box, Button } from '@mui/material';
import Datepicker from 'react-tailwindcss-datepicker';
import CustomSelect from '../UI/inputs/CustomSelect';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import CreateLead from './CreateLead';

interface LeadFilterProps {
	selectedStatus: string;
	handleStatusChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
	selectedSource: string;
	handleSourceChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
	selectedDateRange: { startDate: string | null; endDate: string | null };
	handleDateRangeChange: (newValue: {
		startDate: string | null;
		endDate: string | null;
	}) => void;
	cre: string;
	setCre: (value: string) => void;
	sales: string;
	setSales: (value: string) => void;
	viewAsCard: boolean;
	handleToggleView: () => void;
}

const LeadFilter: React.FC<LeadFilterProps> = ({
	selectedStatus,
	handleStatusChange,
	selectedSource,
	handleSourceChange,
	selectedDateRange,
	handleDateRangeChange,
	cre,
	setCre,
	sales,
	setSales,
	viewAsCard,
	handleToggleView,
}) => {
	return (
		<Box
			mb={3}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			className="space-x-4"
		>
			<CreateLead />

			{/* Status Dropdown using CustomSelect */}
			<div className="flex-1">
				<CustomSelect
					label="Status"
					name="status"
					value={selectedStatus}
					onChange={e => handleStatusChange(e)}
					options={[
						{ value: 'New', label: 'New' },
						{ value: 'No Response', label: 'No Response' },
						{ value: 'Need Support', label: 'Need Support' },
						{ value: 'Message Reschedule', label: 'Message Reschedule' },
						{ value: 'Number Collected', label: 'Number Collected' },
						{ value: 'Call Reschedule', label: 'Call Reschedule' },
						{ value: 'Ongoing', label: 'Ongoing' },
						{ value: 'Close', label: 'Close' },
						{ value: 'Meeting Fixed', label: 'Meeting Fixed' },
						{ value: 'Meeting Postponed', label: 'Meeting Postponed' },
						{ value: 'Follow Up', label: 'Follow Up' },
					]}
					clearable
				/>
			</div>

			{/* Source Dropdown using CustomSelect */}
			<div className="flex-1">
				<CustomSelect
					label="Source"
					name="source"
					value={selectedSource}
					onChange={e => handleSourceChange(e)}
					options={[
						{ value: 'Facebook', label: 'Facebook' },
						{ value: 'WhatsApp', label: 'WhatsApp' },
						{ value: 'Web', label: 'Web' },
						{ value: 'Phone', label: 'Phone' },
					]}
				/>
			</div>

			{/* Datepicker */}
			<div className="flex-1">
				<Datepicker
					value={selectedDateRange}
					onChange={handleDateRangeChange}
					showShortcuts
				/>
			</div>

			{/* CRE Dropdown using CustomSelect */}
			<div className="flex-1">
				<CustomSelect
					label="CRE"
					name="cre"
					value={cre}
					onChange={e => setCre(e.target.value as string)}
					options={[
						{ value: 'CRE1', label: 'CRE1' },
						{ value: 'CRE2', label: 'CRE2' },
						{ value: 'CRE3', label: 'CRE3' },
					]}
				/>
			</div>

			{/* Sales Dropdown using CustomSelect */}
			<div className="flex-1">
				<CustomSelect
					label="Sales"
					name="sales"
					value={sales}
					onChange={e => setSales(e.target.value as string)}
					options={[
						{ value: 'Sales 1', label: 'Sales 1' },
						{ value: 'Sales 2', label: 'Sales 2' },
						{ value: 'Sales 3', label: 'Sales 3' },
					]}
				/>
			</div>

			{/* Toggle View Button */}
			<Button onClick={handleToggleView}>
				{viewAsCard ? <FormatListBulletedSharpIcon /> : <ViewAgendaSharpIcon />}
			</Button>

			{/* Settings Button */}
			<Button variant="contained" color="secondary">
				<SettingsIcon />
			</Button>
		</Box>
	);
};

export default LeadFilter;
