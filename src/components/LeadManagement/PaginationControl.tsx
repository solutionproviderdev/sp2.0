import React from 'react';
import { Box, Button, Select, MenuItem, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface PaginationControlProps {
	currentPage: number;
	totalPages: number;
	pageLimit: number;
	setPageLimit: (limit: number) => void;
	setPage: (page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({
	currentPage,
	totalPages,
	pageLimit,
	setPageLimit,
	setPage,
}) => {
	const handlePageLimitChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setPageLimit(event.target.value as number);
	};

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

	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			mt={3}
		>
			{/* Page Limit Dropdown */}
			<Box display="flex" alignItems="center">
				<Typography variant="body1" mr={1}>
					Show:
				</Typography>
				<Select value={pageLimit} onChange={handlePageLimitChange} size="small">
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={50}>50</MenuItem>
					<MenuItem value={100}>100</MenuItem>
				</Select>
			</Box>

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

				{/* Page Numbers */}
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
	);
};

export default PaginationControl;
