import React from 'react';
import {
	Grid,
	Card,
	CardContent,
	Box,
	Typography,
	Avatar,
	Chip,
	Button,
	Tooltip,
	IconButton,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';

const CardListView = ({ viewAsCard, data }) => {
	const navigate = useNavigate();

	return viewAsCard ? (
		<Grid container spacing={2}>
			{data.map(lead => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={lead._id}>
					<Card
						sx={{
							height: '100%',
							display: 'flex',
							flexDirection: 'column',
							bgcolor: 'background.paper',
						}}
					>
						<CardContent
							sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
						>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								mb={2}
							>
								<Chip
									label={lead?.status || 'Status'}
									color="primary"
									size="small"
									sx={{ minWidth: '80px', justifyContent: 'center' }}
								/>
								<Typography variant="caption" color="text.secondary">
									<CalendarIcon
										fontSize="small"
										sx={{ verticalAlign: 'middle', mr: 0.5 }}
									/>
									{new Date(lead?.createdAt).toLocaleString()}
								</Typography>
							</Box>
							<Box display="flex" alignItems="center" mb={2}>
								<Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
									{lead?.name ? lead?.name[0] : 'L'}
								</Avatar>
								<Typography variant="h6" component="h2">
									{lead?.name}
								</Typography>
							</Box>
							<Typography
								variant="body2"
								color="text.secondary"
								sx={{ mb: 2, flexGrow: 1 }}
							>
								<Box
									component="p"
									sx={{ display: 'flex', alignItems: 'center', m: 0, mb: 1 }}
								>
									<PhoneIcon fontSize="small" sx={{ mr: 1 }} />
									{lead?.phone?.length > 0 ? lead.phone[0] : 'N/A'}
								</Box>
								<Box
									component="p"
									sx={{ display: 'flex', alignItems: 'center', m: 0 }}
								>
									<HomeRoundedIcon fontSize="small" sx={{ mr: 1 }} />
									<Box
										component="span"
										sx={{
											display: '-webkit-box',
											WebkitLineClamp: 2,
											WebkitBoxOrient: 'vertical',
											overflow: 'hidden',
										}}
									>
										{lead.address
											? `${lead.address.division || ''}, ${
													lead.address.district || ''
											  }, ${lead.address.area || ''}`
											: 'N/A'}
									</Box>
								</Box>
							</Typography>
							<Box display="flex" justifyContent="space-between" mt={2}>
								{lead?.phone.length > 0 && (
									<Button
										variant="outlined"
										startIcon={<PhoneIcon />}
										sx={{ flex: 1, mr: 1 }}
									>
										Call
									</Button>
								)}

								<Button
									variant="contained"
									color="secondary"
									startIcon={<ChatIcon />}
									onClick={() => navigate(`/admin/lead-center/${lead?._id}`)}
									sx={{ flex: 1, ml: 1 }}
								>
									Chat
								</Button>
							</Box>
						</CardContent>
					</Card>
				</Grid>
			))}
		</Grid>
	) : (
		<TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
			<Table sx={{ minWidth: 650 }} aria-label="lead table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }}>Number</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(lead => (
						<TableRow
							key={lead._id}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								<Typography variant="subtitle2">
									{lead?.name ? lead.name : 'Unknown'}
								</Typography>
							</TableCell>
							<TableCell>
								<Chip
									label={lead?.status || 'Status'}
									color="primary"
									size="small"
								/>
							</TableCell>
							<TableCell>
								<Tooltip title={lead?.address || 'No message'} arrow>
									<Typography
										variant="body2"
										sx={{
											maxWidth: 200,
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										{lead.address
											? `${lead.address.division || ''}, ${
													lead.address.district || ''
											  }, ${lead.address.area || ''}`
											: 'Bangladesh, ✱✱✱✱✱✱✱'}
									</Typography>
								</Tooltip>
							</TableCell>
							<TableCell>
								{lead?.phone?.length > 0 ? lead.phone[0] : '01✱✱✱✱✱✱✱'}
							</TableCell>
							<TableCell>
								<Typography variant="body2" color="text.secondary">
									{new Date(lead?.createdAt).toLocaleString()}
								</Typography>
							</TableCell>
							<TableCell>
								<div style={{ display: 'flex', gap: '8px' }}>
									<Tooltip title="Call">
										<IconButton color="primary" size="small">
											<PhoneIcon fontSize="small" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Chat">
										<IconButton
											color="secondary"
											size="small"
											onClick={() => navigate(`/admin/lead-center/${lead._id}`)}
										>
											<ChatIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CardListView;
