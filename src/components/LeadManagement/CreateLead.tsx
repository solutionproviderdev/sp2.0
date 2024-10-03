import React, { useState } from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Paper
} from '@mui/material';
import { useCreateLeadWithNumberMutation } from '../../features/conversation/conversationApi';
  

const CreateLead = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [createLeadWithNumber] = useCreateLeadWithNumberMutation(); 

    // Toggle modal open/close
    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    // Function to handle form submission
    const handleSubmit = async () => {
        const leadData = {
            name,
            phone,
        };
 
        try {
            // Call the mutation to create lead
            await createLeadWithNumber({leadData})

            // Reset form and close modal
            setName('');
            setPhone('');
            handleCloseModal();
            console.log('Lead created successfully',leadData);
        } catch (error) {
            console.error('Failed to create lead:', error);
        }
    };

    return (
        <>
            {/* Button to open the modal */}
            <Button variant="contained" color="primary" className='h-8' onClick={handleOpenModal}>
                + Create
            </Button>

            {/* Modal for lead creation */}
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        padding: 4,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Create New Lead
                    </Typography>
                    
                    {/* Form inputs */}
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            margin="normal"
                        />

                        {/* Submit button */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mt: 2 }}
                        >
                            Save Lead
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
};

export default CreateLead;
