import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const NumberModal = ({ isOpen, onClose, onSubmit }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = () => {
        onSubmit(phoneNumber);
        onClose(); // Close modal after submission
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="number-modal-title"
            aria-describedby="number-modal-description"
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
                    width: '300px'
                }}
            >
                <Typography id="number-modal-title" variant="h6" component="h2">
                    Collect Phone Number
                </Typography>
                <TextField
                    label="Phone Number"
                    fullWidth
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default NumberModal;
