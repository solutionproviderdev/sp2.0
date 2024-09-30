import React, { useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    Modal,
    Typography,
} from '@mui/material';
import NumberModal from './statusModal/NumberModal'; // Import the NumberModal component

const CreStatus = () => {
    const [status, setStatus] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isNumberModalOpen, setNumberModalOpen] = useState(false);

    // Function to handle status change
    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
        
        if (newStatus === 'Number Collected') {
            setNumberModalOpen(true); // Open number collection modal
        } else {
            setModalOpen(true); // Show the modal when a status is selected
        }
    };

    // Function to handle closing of the confirmation modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Function to handle phone number submission
    const handlePhoneNumberSubmit = (phoneNumber) => {
        console.log('Phone number submitted:', phoneNumber);
        console.log('Status updated:', 'Number Collected');

        // Here you would make an API call to update the phone number and status in the backend
        // Example:
        // await updateLead({ status: 'Number Collected', phoneNumber });

        setNumberModalOpen(false);
        setModalOpen(true);
    };

    return (
        <Box>
            <FormControl>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    className='w-32 h-10'
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="No-response">No-response</MenuItem>
                    <MenuItem value="Message Reschedule">Message Reschedule</MenuItem>
                    <MenuItem value="Number Collected">Number Collected</MenuItem>
                    <MenuItem value="Call Reschedule">Call Reschedule</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Close">Close</MenuItem>
                    <MenuItem value="Meeting Fixed">Meeting Fixed</MenuItem>
                    <MenuItem value="Need Support">Need Support</MenuItem>
                </Select>
            </FormControl>

            {/* Modal for generic status confirmation */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="status-modal-title"
                aria-describedby="status-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="status-modal-title" variant="h6" component="h2">
                        Status Updated
                    </Typography>
                    <Typography id="status-modal-description" sx={{ mt: 2 }}>
                        You have selected: {status}
                    </Typography>
                    <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* NumberModal component for collecting phone number */}
            <NumberModal
                isOpen={isNumberModalOpen}
                onClose={() => setNumberModalOpen(false)}
                onSubmit={handlePhoneNumberSubmit}
            />
        </Box>
    );
};

export default CreStatus;
