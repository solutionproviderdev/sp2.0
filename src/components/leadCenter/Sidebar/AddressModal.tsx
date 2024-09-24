import React, { useState, useEffect } from 'react';
import {
	Modal,
	TextField,
	Button,
	Box,
	Autocomplete,
	CircularProgress,
	Snackbar,
	Alert,
} from '@mui/material';
import {
	useGetDivisionsQuery,
	useGetDistrictsByDivisionQuery,
	useGetAreasByDistrictQuery,
	useSearchLocationQuery,
} from '../../../features/map/mapapi'; // Import your map API hooks
import { useUpdateLeadsMutation } from '../../../features/conversation/conversationApi';

interface AddressModalProps {
	open: boolean;
	handleClose: () => void;
	leadId: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
	open,
	handleClose,
	leadId,
}) => {
	const [division, setDivision] = useState<string | null>(null); // Division object
	const [district, setDistrict] = useState<string | null>(null); // District object
	const [area, setArea] = useState<string | null>(null); // Area object
	const [specificAddress, setSpecificAddress] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>(''); // Search query
	const [selectedSearchResult, setSelectedSearchResult] = useState<any>(null); // Selected search result

	const [updateLeads, { isLoading: isUpdating }] = useUpdateLeadsMutation();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
		'success'
	);

	// Fetch divisions, districts, and areas from the API
	const { data: divisions, isLoading: divisionsLoading } =
		useGetDivisionsQuery();
	const {
		data: districts,
		isLoading: districtsLoading,
		refetch: refetchDistricts,
	} = useGetDistrictsByDivisionQuery(division, { skip: !division });
	const {
		data: areas,
		isLoading: areasLoading,
		refetch: refetchAreas,
	} = useGetAreasByDistrictQuery(district, { skip: !district });

	// Fetch search results
	const { data: searchResults, refetch: searchLocations } =
		useSearchLocationQuery(searchQuery, {
			skip: !searchQuery,
		});

	// Auto-select division, district, and area based on the selected search result
	useEffect(() => {
		if (selectedSearchResult) {
			setDivision(selectedSearchResult.divisionId);
			setDistrict(selectedSearchResult.districtId);
			setArea(selectedSearchResult._id); // Area is usually the final ID
		}
	}, [selectedSearchResult]);

	// Update districts when division is selected
	useEffect(() => {
		if (division) {
			refetchDistricts();
		}
	}, [division, refetchDistricts]);

	// Update areas when district is selected
	useEffect(() => {
		if (district) {
			refetchAreas();
		}
	}, [district, refetchAreas]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			// Find the selected division, district, and area names based on the IDs
			const selectedDivision =
				divisions?.find(div => div._id === division)?.division || '';
			const selectedDistrict =
				districts?.find(dist => dist._id === district)?.name || '';
			const selectedArea = areas?.find(ar => ar._id === area)?.name || '';

			// Build the address data object with names
			const addressData = {
				division: selectedDivision,
				district: selectedDistrict,
				area: selectedArea,
				address: specificAddress,
			};

			// Make the update request
			await updateLeads({
				id: leadId, // Pass lead ID to update the lead's address
				data: { address: addressData },
			}).unwrap();

			// If successful, show success message
			setSnackbarSeverity('success');
			setSnackbarMessage('Address updated successfully!');
			setSnackbarOpen(true);
			handleClose(); // Close modal after successful submit
		} catch (error) {
			console.log(error);
			// If an error occurs, show error message
			setSnackbarSeverity('error');
			setSnackbarMessage('Failed to update address. Please try again.');
			setSnackbarOpen(true);
		}
	};

	// Close Snackbar
	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	return (
		<>
			<Modal open={open} onClose={handleClose}>
				<Box className="bg-white p-4 w-96 mx-auto my-20 rounded-md">
					<h2 className="text-center mb-4">Add / Update Address</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Search Input */}
						<Autocomplete
							options={searchResults || []}
							getOptionLabel={option => option.path} // Show the full path in search
							onInputChange={(event, newInputValue) =>
								setSearchQuery(newInputValue)
							}
							onChange={(event, newValue) => setSelectedSearchResult(newValue)}
							renderInput={params => (
								<TextField
									{...params}
									label="Search"
									variant="outlined"
									placeholder="Search Division/District/Area..."
									className="mb-4"
								/>
							)}
						/>

						{/* Division Autocomplete */}
						<Autocomplete
							options={divisions || []}
							getOptionLabel={option => option.division}
							value={divisions?.find(div => div._id === division) || null}
							onChange={(event, newValue) => setDivision(newValue?._id || null)}
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
												{divisionsLoading ? (
													<CircularProgress size={20} />
												) : null}
												{params.InputProps.endAdornment}
											</React.Fragment>
										),
									}}
								/>
							)}
						/>

						{/* District Autocomplete */}
						<Autocomplete
							options={districts || []}
							getOptionLabel={option => option.name}
							value={districts?.find(dist => dist._id === district) || null}
							onChange={(event, newValue) => setDistrict(newValue?._id || null)}
							loading={districtsLoading}
							disabled={!division}
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
												{districtsLoading ? (
													<CircularProgress size={20} />
												) : null}
												{params.InputProps.endAdornment}
											</React.Fragment>
										),
									}}
								/>
							)}
						/>

						{/* Area Autocomplete */}
						<Autocomplete
							options={areas || []}
							getOptionLabel={option => option.name}
							value={areas?.find(ar => ar._id === area) || null}
							onChange={(event, newValue) => setArea(newValue?._id || null)}
							loading={areasLoading}
							disabled={!district}
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

						{/* Submit Button */}
						<Button
							variant="contained"
							fullWidth
							type="submit"
							disabled={isUpdating}
						>
							{isUpdating ? 'Updating...' : 'Submit'}
						</Button>
					</form>
				</Box>
			</Modal>

			{/* Snackbar for success/error messages */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
					sx={{ width: '100%' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</>
	);
};

export default AddressModal;
