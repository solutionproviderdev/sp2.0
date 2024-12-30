import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Datepicker from 'react-tailwindcss-datepicker';
import CustomSelect from '../UI/inputs/CustomSelect';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewAgendaSharpIcon from '@mui/icons-material/ViewAgendaSharp';
import FormatListBulletedSharpIcon from '@mui/icons-material/FormatListBulletedSharp';
import CreateLead from './CreateLead';
import CustomSelectWithPictures from '../UI/inputs/CustomSelectWithPictures';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

interface LeadFilterAndPaginationProps {
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
	currentPage: number;
	totalPages: number | undefined;
	pageLimit: number;
	setPageLimit: (limit: number) => void;
	setPage: (page: number) => void;
	totalLeads: number | undefined;
	displayedLeads: number;
	filterOptions?: {
		statuses: string[];
		sources: string[];
		creNames: {
			_id: string;
			nameAsPerNID: string;
			nickname: string;
			profilePicture: string;
		}[];
		salesExecutives: {
			_id: string;
			name: string;
			nickname: string;
			profilePicture: string;
		}[];
	};
}

const LeadFilterAndPagination: React.FC<LeadFilterAndPaginationProps> = ({
	filterOptions,
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
	currentPage,
	totalPages,
	pageLimit,
	setPageLimit,
	setPage,
	totalLeads,
	displayedLeads,
}) => {
	const handlePageLimitChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setPageLimit(event.target.value as number);
	};

	const navigate = useNavigate();

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setPage(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setPage(currentPage + 1);
		}
	};

	console.log(filterOptions?.creNames);

	return (
		<Box mb={3}>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				className="space-x-4"
			>
				<CreateLead />

				{/* Status Dropdown */}
				<div className="flex-1">
					<CustomSelect
						label="Status"
						name="status"
						value={selectedStatus}
						onChange={e => handleStatusChange(e)}
						options={
							filterOptions?.statuses.map(status => ({
								value: status,
								label: status,
							})) || []
						}
						clearable
					/>
				</div>

				{/* Source Dropdown */}
				<div className="flex-1">
					<CustomSelect
						label="Source"
						name="source"
						value={selectedSource}
						onChange={e => handleSourceChange(e)}
						options={
							filterOptions?.sources.map(source => ({
								value: source,
								label: source,
							})) || []
						}
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

				{/* CRE Dropdown */}
				<div className="flex-1">
					<CustomSelectWithPictures
						label="CRE"
						name="cre"
						value={cre}
						onChange={e => setCre(e.target.value as string)}
						options={
							filterOptions?.creNames.map(cre => ({
								value: cre._id,
								label: cre.nameAsPerNID,
								profilePicture: cre.profilePicture,
							})) || []
						}
						clearable
					/>
				</div>

				{/* Sales Dropdown */}
				<div className="flex-1">
					<CustomSelectWithPictures
						label="Sales"
						name="sales"
						value={sales}
						onChange={e => setSales(e.target.value as string)}
						options={
							filterOptions?.salesExecutives.map(exec => ({
								value: exec._id,
								label: exec.name,
								profilePicture: exec.profilePicture,
							})) || []
						}
					/>
				</div>

				{/* Toggle View Button */}
				<Button onClick={handleToggleView}>
					{viewAsCard ? (
						<FormatListBulletedSharpIcon />
					) : (
						<ViewAgendaSharpIcon />
					)}
				</Button>

				{/* Settings Button */}
				<Button
					variant="contained"
					color="secondary"
					onClick={() => navigate('../settings/lead-settings')}
				>
					<SettingsIcon />
				</Button>
			</Box>

			{/* Pagination and Page Limit Control */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mt={3}
			>
				<Box display="flex" alignItems="center">
					<Typography variant="body1" mr={1}>
						Show:
					</Typography>
					<CustomSelect
						name="pageLimit"
						value={pageLimit.toString()}
						onChange={handlePageLimitChange}
						options={[
							{ value: '10', label: '10' },
							{ value: '20', label: '20' },
							{ value: '50', label: '50' },
							{ value: '100', label: '100' },
						]}
					/>
				</Box>

				<Typography variant="body1">
					Showing {displayedLeads} out of {totalLeads}
				</Typography>

				{/* Pagination Controls */}
				<Box display="flex" alignItems="center">
					<Button
						onClick={handlePreviousPage}
						disabled={currentPage === 1}
						size="small"
						startIcon={<ArrowBackIosIcon />}
					>
						Previous
					</Button>

					<Typography variant="body2" mx={2}>
						Page {currentPage} of {totalPages}
					</Typography>

					<Button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						size="small"
						endIcon={<ArrowForwardIosIcon />}
					>
						Next
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default LeadFilterAndPagination;
