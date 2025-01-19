import React, { useState, useEffect } from 'react';
import {
	Box,
	TextField,
	Autocomplete,
	CircularProgress,
	Button,
	IconButton,
	Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
	useGetDivisionsQuery,
	useGetDistrictsByDivisionQuery,
	useGetAreasByDistrictQuery,
	useSearchLocationQuery,
} from '../../../../../features/map/mapapi';
import { Lead } from '../../../../../features/lead/leadAPI';

interface AddressStepProps {
	lead?: Lead;
	onChange: (updatedAddress: {
		division: string;
		district: string;
		area: string;
		address: string;
	}) => void;
	defaultAddress?: {
		division: string;
		district: string;
		area: string;
		address: string;
	};
}

const AddressStep: React.FC<AddressStepProps> = ({
	lead,
	onChange,
	defaultAddress,
}) => {
	const [isEditing, setIsEditing] = useState(defaultAddress?.address ? false : true);
	const [division, setDivision] = useState<{
		_id: string;
		division: string | null;
	}>({
		division: lead?.address?.division || null,
		_id: '',
	});
	const [district, setDistrict] = useState<{
		_id: string;
		name: string | null;
	}>({
		_id: '',
		name: lead?.address?.district || null,
	});

	const [area, setArea] = useState<{ _id: string; name: string | null }>({
		_id: '',
		name: lead?.address?.area || null,
	});
	const [specificAddress, setSpecificAddress] = useState<string>(
		lead?.address?.address || ''
	);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedSearchResult, setSelectedSearchResult] = useState<any>(null);

	// Fetch divisions, districts, and areas from the API
	const { data: divisions, isLoading: divisionsLoading } =
		useGetDivisionsQuery();
	const {
		data: districts,
		isLoading: districtsLoading,
		refetch: refetchDistricts,
	} = useGetDistrictsByDivisionQuery(division._id, { skip: !division._id });
	const {
		data: areas,
		isLoading: areasLoading,
		refetch: refetchAreas,
	} = useGetAreasByDistrictQuery(district._id, { skip: !district._id });

	// Fetch search results based on query
	const { data: searchResults, refetch: refetchSearchResults } =
		useSearchLocationQuery(searchQuery, {
			skip: !searchQuery,
		});

	// Auto-fetch districts when division changes or when defaultAddress is set
	useEffect(() => {
		if (division._id) {
			refetchDistricts();
		}
	}, [division._id, refetchDistricts]);

	// Auto-fetch areas when district changes or when defaultAddress is set
	useEffect(() => {
		if (district._id) {
			refetchAreas();
		}
	}, [district._id, refetchAreas]);

	// Auto-select division, district, and area based on the selected search result
	useEffect(() => {
		if (selectedSearchResult) {
			// Extract names from the path string
			const pathParts = selectedSearchResult.path
				.split('>')
				.map(part => part.trim());

			// Ensure that we have the required number of parts for each level
			const [divisionName, districtName, areaName] = pathParts;

			setDivision({
				_id: selectedSearchResult.divisionId,
				division: divisionName || '', // Set the division name from path
			});
			setDistrict({
				_id: selectedSearchResult.districtId,
				name: districtName || '', // Set the district name from path
			});
			setArea({
				_id: selectedSearchResult._id,
				name: areaName || '', // Set the area name from path
			});
		}
	}, [selectedSearchResult]);

	// Handle any change to the address fields and propagate it up
	useEffect(() => {
		onChange({
			division: division.division || '',
			district: district.name || '',
			area: area.name || '',
			address: specificAddress,
		});
	}, [division, district, area, specificAddress]);

	// Toggle edit mode
	const toggleEdit = () => {
		setIsEditing(prev => !prev);
	};

	return (
		<Box className="space-y-4">
			{/* Display default address and Edit button */}
			{!isEditing && defaultAddress && (
				<Box>
					<Typography variant="h6">Current Address</Typography>
					<Typography variant="body1">
						{`${defaultAddress.division}, ${defaultAddress.district}, ${defaultAddress.area}, ${defaultAddress.address}`}
					</Typography>
					<IconButton onClick={toggleEdit} color="primary">
						<EditIcon />
					</IconButton>
				</Box>
			)}

			{/* Display editable form if editing is enabled */}
			{isEditing && (
				<>
					{/* Search and Select Input */}
					<Autocomplete
						options={searchResults || []}
						getOptionLabel={option => option.path}
						onInputChange={(event, newInputValue) => {
							setSearchQuery(newInputValue);
							refetchSearchResults(); // Trigger search results refresh
						}}
						onChange={(event, newValue) => setSelectedSearchResult(newValue)}
						renderInput={params => (
							<TextField
								{...params}
								label="Search Division/District/Area"
								variant="outlined"
								placeholder="Search for an address..."
							/>
						)}
					/>

					{/* Division Selection */}
					<Autocomplete
						options={divisions || []}
						getOptionLabel={option => option.division}
						value={divisions?.find(div => div._id === division._id) || null}
						onChange={(event, newValue) => {
							setDivision(newValue || { _id: '', division: null });
						}}
						loading={divisionsLoading}
						renderInput={params => (
							<TextField
								{...params}
								label="Select Division"
								variant="outlined"
								required
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{divisionsLoading ? <CircularProgress size={20} /> : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>

					{/* District Selection */}
					<Autocomplete
						options={districts || []}
						getOptionLabel={option => option.name}
						value={districts?.find(dist => dist._id === district._id) || null}
						onChange={(event, newValue) => {
							setDistrict(newValue || { _id: '', name: null });
						}}
						loading={districtsLoading}
						disabled={!division._id}
						renderInput={params => (
							<TextField
								{...params}
								label="Select District"
								variant="outlined"
								required
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{districtsLoading ? <CircularProgress size={20} /> : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>

					{/* Area Selection */}
					<Autocomplete
						options={areas || []}
						getOptionLabel={option => option.name}
						value={areas?.find(ar => ar._id === area._id) || null}
						onChange={(event, newValue) => {
							setArea(newValue || { _id: '', name: null });
						}}
						loading={areasLoading}
						disabled={!district._id}
						renderInput={params => (
							<TextField
								{...params}
								label="Select Area"
								variant="outlined"
								required
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{areasLoading ? <CircularProgress size={20} /> : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>

					{/* Specific Address Input */}
					<TextField
						fullWidth
						label="Specific Address"
						variant="outlined"
						value={specificAddress}
						onChange={e => setSpecificAddress(e.target.value)}
						required
					/>

					{/* Save and Cancel Buttons */}
					<Box className="flex justify-end mt-4 space-x-2">
						<Button onClick={() => setIsEditing(false)} color="secondary">
							Cancel
						</Button>
						<Button
							onClick={() => setIsEditing(false)}
							variant="contained"
							color="primary"
						>
							Save
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
};

export default AddressStep;
