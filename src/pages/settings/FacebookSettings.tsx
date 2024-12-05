import React, { useState } from 'react';
import {
	Box,
	Typography,
	Button,
	TextField,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Avatar,
	Snackbar,
	Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
	useGetFacebookPagesQuery,
	useAddFacebookPageMutation,
	useDeleteFacebookPageMutation,
} from '../../features/settings/facebook/facebookApi ';


const FacebookSettings: React.FC = () => {
	const { data: facebookPages, isLoading } = useGetFacebookPagesQuery();
	const [addFacebookPage, { isLoading: isAdding }] =
		useAddFacebookPageMutation();
	const [deleteFacebookPage, { isLoading: isDeleting }] =
		useDeleteFacebookPageMutation();

	const [showAddPageField, setShowAddPageField] = useState(false);
	const [newPageToken, setNewPageToken] = useState('');
	const [toast, setToast] = useState({
		open: false,
		message: '',
		severity: 'success',
	});

	const handleToastClose = () => setToast({ ...toast, open: false });

	const handleAddPage = async () => {
		if (newPageToken.trim() === '') {
			setToast({
				open: true,
				message: 'Please provide a valid page access token.',
				severity: 'error',
			});
			return;
		}
		try {
			await addFacebookPage({ pageAccessToken: newPageToken }).unwrap();
			setNewPageToken('');
			setShowAddPageField(false);
			setToast({
				open: true,
				message: 'Page added successfully!',
				severity: 'success',
			});
		} catch (error) {
			console.error('Error adding page:', error);
			setToast({
				open: true,
				message: 'Failed to add page. Please try again.',
				severity: 'error',
			});
		}
	};

	const handleDeletePage = async (pageId: string) => {
		try {
			await deleteFacebookPage({ pageId }).unwrap();
			setToast({
				open: true,
				message: 'Page deleted successfully!',
				severity: 'success',
			});
		} catch (error) {
			console.error('Error deleting page:', error);
			setToast({
				open: true,
				message: 'Failed to delete page. Please try again.',
				severity: 'error',
			});
		}
	};

	return (
		<Box sx={{ padding: 4 }}>
			<Typography variant="h5" fontWeight="bold" mb={4}>
				Facebook Settings
			</Typography>

			{/* Add New Page Button and Field */}
			<Box mb={4}>
				{!showAddPageField ? (
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={() => setShowAddPageField(true)}
					>
						Add New Page
					</Button>
				) : (
					<Box>
						<Box display="flex" alignItems="center" gap={2} mb={2}>
							<TextField
								label="Page Access Token"
								variant="outlined"
								size="small"
								fullWidth
								value={newPageToken}
								onChange={e => setNewPageToken(e.target.value)}
							/>
							<Button
								variant="contained"
								color="primary"
								onClick={handleAddPage}
								disabled={isAdding}
							>
								{isAdding ? 'Adding...' : 'Add Page'}
							</Button>
							<IconButton onClick={() => setShowAddPageField(false)}>
								<CloseIcon />
							</IconButton>
						</Box>
					</Box>
				)}
			</Box>

			{/* Display Pages Section */}
			<Box>
				<Typography variant="h6" mb={2}>
					Connected Pages
				</Typography>
				{isLoading ? (
					<Typography>Loading pages...</Typography>
				) : (
					<List>
						{facebookPages?.pages.map(page => (
							<ListItem key={page.pageId} alignItems="center">
								<Avatar
									src={page.picture}
									alt={page.name}
									sx={{ width: 50, height: 50, marginRight: 2 }}
								/>
								<ListItemText
									primary={page.name}
									secondary={`Page ID: ${page.pageId}`}
								/>
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										aria-label="delete"
										color="error"
										onClick={() => handleDeletePage(page.pageId)}
										disabled={isDeleting}
									>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItem>
						))}
					</List>
				)}
			</Box>

			{/* Snackbar for Toast Messages */}
			<Snackbar
				open={toast.open}
				autoHideDuration={6000}
				onClose={handleToastClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					onClose={handleToastClose}
					severity={toast.severity as any}
					variant="filled"
				>
					{toast.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default FacebookSettings;
