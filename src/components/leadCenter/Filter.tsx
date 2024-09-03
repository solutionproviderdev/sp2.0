import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Chip,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Popover,
} from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const   Filter = () => {
  // States to manage the filter panel
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<string | false>(false);

  // Store selected filter values in a structured way
  const [selectedFilters, setSelectedFilters] = useState<{
    status: string[];
    cre: string[];
    page: string[];
  }>({
    status: [],
    cre: [],
    page: [],
  });

  // Dummy data for the dynamic filter options
  const filters = {
    status: ['Unread', 'Number collected', 'Active'],
    cre: ['Wony', 'Mehu', 'Ritu'],
    page: ['SP-1', 'SP-2', 'SP-3'],
  };

  const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle the filter panel
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false); // Expand/collapse the accordion section
  };

  const handleCheckboxChange = (category: string, item: string) => {
    setSelectedFilters((prevFilters) => {
      const isItemSelected = prevFilters[category as keyof typeof prevFilters].includes(item);
      const updatedItems = isItemSelected
        ? prevFilters[category as keyof typeof prevFilters].filter((i) => i !== item)
        : [...prevFilters[category as keyof typeof prevFilters], item];

      return {
        ...prevFilters,
        [category]: updatedItems,
      };
    });
  };

  // Function to clear all selected filters
  const clearAllFilters = () => {
    setSelectedFilters({
      status: [],
      cre: [],
      page: [],
    });
  };

  // Function to apply filters and clear selected items
  const filterAndSortData = () => {
    console.log('Filter by this data:', selectedFilters, );
    // Implement filtering and sorting logic based on selectedFilters

    // Clear all filters after applying
    clearAllFilters();
    setExpanded(false)
    setAnchorEl(null)
  };

  return (
    <div className='overflow-y-hidden'>
      {/* Main Filter Button */}
      <IconButton onClick={handleFilterButtonClick}>
        <FilterListRoundedIcon className="text-blue-600" />
      </IconButton>

      {/* Filter Panel */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
      >
        <Box
          p={2}
          width="280px"
        >
          {/* Accordion for Filter Categories */}
          {Object.keys(filters).map((filter) => (
            <Accordion
              key={filter}
              expanded={expanded === filter}
              onChange={handleAccordionChange(filter)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {filters[filter as keyof typeof filters].map((item, index) => (
                  <Box key={index} display="flex" alignItems="center">
                    <Checkbox
                      checked={selectedFilters[filter as keyof typeof selectedFilters].includes(item)}
                      onChange={() => handleCheckboxChange(filter, item)}
                      size="small"
                    />
                    <Typography>{item}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          {/* Display selected filter chips */}
          <Box className="flex flex-wrap gap-2 mt-2">
            {Object.entries(selectedFilters).map(([category, items]) =>
              items.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  onDelete={() => handleCheckboxChange(category, item)}
                  color="primary"
                  variant="outlined"
                />
              ))
            )}
          </Box>
          {/* Button to apply filters and clear selected items */}
          <Button
            variant="contained"
            color="primary"
            onClick={filterAndSortData}
            className="!mt-2 !w-full"
          >
            Apply Filters
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default Filter;
