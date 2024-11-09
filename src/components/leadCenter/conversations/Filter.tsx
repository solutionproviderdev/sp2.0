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

const Filter = ({ onApplyFilters, availableFilters }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [expanded, setExpanded] = useState<string | false>(false);

	// Store selected filter values
	const [selectedFilters, setSelectedFilters] = useState<{
		statuses: string[];
		creNames: string[];
		pages: string[];
	}>({
		statuses: [],
		creNames: [],
		pages: [],
	});

	// Filters coming from the backend
	const { statuses = [], creNames = [], pages = [] } = availableFilters || {};

	const handleFilterButtonClick = (event: React.MouseEvent<HTMLElement>) => {
		console.log(event?.currentTarget);
		setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle the filter panel
	};

	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false); // Expand/collapse the accordion section
		};

	const handleCheckboxChange = (category: string, item: string) => {
		setSelectedFilters(prevFilters => {
			const isItemSelected =
				prevFilters[category as keyof typeof prevFilters].includes(item);
			const updatedItems = isItemSelected
				? prevFilters[category as keyof typeof prevFilters].filter(
						i => i !== item
				  )
				: [...prevFilters[category as keyof typeof prevFilters], item];

			return {
				...prevFilters,
				[category]: updatedItems,
			};
		});
	};

	const applyFilters = () => {
		onApplyFilters(prev => ({
			...prev,
			statuses: selectedFilters.statuses,
			creNames: selectedFilters.creNames,
			pages: selectedFilters.pages,
		}));
		setAnchorEl(null);
		setExpanded(false);
	};

	const handleDeleteChip = (category: string, item: string) => {
		setSelectedFilters(prevFilters => ({
			...prevFilters,
			[category]: prevFilters[category as keyof typeof prevFilters].filter(
				i => i !== item
			),
		}));
	};

	return (
		<div>
			<IconButton onClick={handleFilterButtonClick}>
				<FilterListRoundedIcon className="text-blue-600" />
			</IconButton>

			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
				disableRestoreFocus
			>
				<Box p={2} width="280px">
					{/* Status Filter */}
					<Accordion
						expanded={expanded === 'statuses'}
						onChange={handleAccordionChange('statuses')}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="subtitle1">Status</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{statuses.map((item, index) => (
								<Box key={index} display="flex" alignItems="center">
									<Checkbox
										checked={selectedFilters.statuses.includes(item)}
										onChange={() => handleCheckboxChange('statuses', item)}
										size="small"
									/>
									<Typography>{item}</Typography>
								</Box>
							))}
						</AccordionDetails>
					</Accordion>

					{/* CRE Filter */}
					<Accordion
						expanded={expanded === 'creNames'}
						onChange={handleAccordionChange('creNames')}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="subtitle1">CRE</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{creNames.map((cre, index) => (
								<Box key={index} display="flex" alignItems="center">
									<Checkbox
										checked={selectedFilters.creNames.includes(cre._id)}
										onChange={() => handleCheckboxChange('creNames', cre._id)}
										size="small"
									/>
									<div className="flex items-center gap-2">
										<img
											src={cre.profilePicture}
											alt={cre.name}
											className="w-5 h-5 rounded-full"
										/>
										<Typography>{cre.nickname}</Typography>
									</div>
								</Box>
							))}
						</AccordionDetails>
					</Accordion>

					{/* Pages Filter */}
					<Accordion
						expanded={expanded === 'pages'}
						onChange={handleAccordionChange('pages')}
					>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="subtitle1">Pages</Typography>
						</AccordionSummary>
						<AccordionDetails>
							{pages.map((pageInfo, index) => (
								<Box key={index} display="flex" alignItems="center">
									<Checkbox
										checked={selectedFilters.pages.includes(pageInfo.pageId)}
										onChange={() =>
											handleCheckboxChange('pages', pageInfo.pageId)
										}
										size="small"
									/>
									<div className="flex items-center gap-2">
										<img
											src={pageInfo.pageProfilePicture}
											alt={pageInfo.pageName}
											className="w-5 h-5 rounded-full"
										/>
										<Typography>{pageInfo.pageName}</Typography>
									</div>
								</Box>
							))}
						</AccordionDetails>
					</Accordion>

					{/* Display selected filters as chips */}
					<Box className="flex flex-wrap gap-2 mt-2">
						{Object.entries(selectedFilters).map(([category, items]) =>
							items.map(item => (
								<Chip
									key={item}
									label={`${item} (${category})`}
									onDelete={() => handleDeleteChip(category, item)}
									color="primary"
									variant="outlined"
								/>
							))
						)}
					</Box>
					<Button
						variant="contained"
						color="primary"
						onClick={applyFilters}
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
