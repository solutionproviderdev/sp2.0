import React from 'react';
import { TextField } from '@mui/material';

const SearchInput = ({ filters, setFilters }) => {
	const handleSearchChange = event => {
		setFilters(prevFilters => ({
			...prevFilters,
			searchText: event?.target?.value,
		}));
	};

	return (
		<TextField
			fullWidth
			label="Search"
			variant="outlined"
			value={filters.searchText}
			onChange={handleSearchChange}
			className="mb-4"
		/>
	);
};

export default SearchInput;
