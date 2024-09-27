import React from 'react';
import { Button } from '@mui/material';
import Filter from './Filter'; // Assuming you already have a Filter component

const ConversationFilter = ({ setFilters, filters, availableFilters }) => {
	// Handle "All" button click
	const handleShowAll = () => {
		setFilters({
			...filters,
			messagesSeen: null,
		}); // Reset filters to show all
	};

	// Handle "Unseen" button click (i.e., messageSeen: false)
	const handleShowUnseen = () => {
		setFilters({
			...filters,
			messagesSeen: false,
		}); // Set filter for unseen conversations
	};

	return (
		<div className="flex items-center justify-between mt-2">
			<div className="flex gap-2">
				<Button
					variant={filters.messagesSeen === null ? 'contained' : 'outlined'}
					onClick={handleShowAll}
					className="!h-7"
				>
					All
				</Button>
				<Button
					variant={filters.messagesSeen === false ? 'contained' : 'outlined'}
					onClick={handleShowUnseen}
					className="!h-7"
				>
					Unseen
				</Button>
			</div>
			<Filter
				availableFilters={availableFilters} // Pass available filters here
				onApplyFilters={setFilters}
			/>
		</div>
	);
};

export default ConversationFilter;
