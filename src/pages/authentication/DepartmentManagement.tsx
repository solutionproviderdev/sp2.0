import React, { useState } from 'react';
import {
	Box,
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
	Modal,
	TextField,
	IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
	useCreateDepartmentMutation,
	useGetAllDepartmentsQuery,
} from '../../features/auth/department/departmentAPI';
import DepartmentCard from '../../components/departments/DepartmentCard';

// Department Management Component
const DepartmentManagement: React.FC = () => {
	const { data: departments, isLoading, error } = useGetAllDepartmentsQuery();
	const [createDepartment] = useCreateDepartmentMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [departmentName, setDepartmentName] = useState('');
	const [description, setDescription] = useState('');

	if (error) {
		console.error('Error fetching departments:', error);
	}

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleCreateDepartment = async () => {
		await createDepartment({
			departmentName,
			description,
			roles: [], // Default no roles when creating
		});
		setIsModalOpen(false);
	};

	if (isLoading) {
		return <Typography>Loading departments...</Typography>;
	}

	return (
		<Box className="overflow-hidden p-2">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				mb={3}
			>
				<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
					Departments
				</Typography>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleOpenModal}
				>
					Create
				</Button>
			</Box>

			{/* Department Cards Grid */}
			<Grid container spacing={3}>
				{departments?.map(department => (
					<Grid item xs={12} sm={6} md={4} key={department._id}>
						<DepartmentCard department={department} />
					</Grid>
				))}
			</Grid>

			{/* Create Department Modal */}
			<Modal open={isModalOpen} onClose={handleCloseModal}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography variant="h6" gutterBottom>
						Create New Department
					</Typography>
					<TextField
						label="Department Name"
						fullWidth
						value={departmentName}
						onChange={e => setDepartmentName(e.target.value)}
						margin="normal"
					/>
					<TextField
						label="Description"
						fullWidth
						value={description}
						onChange={e => setDescription(e.target.value)}
						margin="normal"
					/>
					<Box mt={2} display="flex" justifyContent="flex-end">
						<Button onClick={handleCloseModal} sx={{ mr: 2 }}>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={handleCreateDepartment}
						>
							Create
						</Button>
					</Box>
				</Box>
			</Modal>
		</Box>
	);
};

export default DepartmentManagement;
