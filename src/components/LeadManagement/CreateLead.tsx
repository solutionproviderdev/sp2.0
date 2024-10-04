
import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Grid,
    InputAdornment,
} from '@mui/material';
import { MicNone, Image, Close } from '@mui/icons-material';
import { useCreateLeadWithNumberMutation } from '../../features/conversation/conversationApi';
 
export default function CreateLead() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [source, setSource] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [createLeadWithNumber] = useCreateLeadWithNumberMutation();

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            //   console.log('image---',image)
        }
    };

    const handleVoiceRecording = () => {
        setIsRecording(!isRecording);
        // console.log("recording----",isRecording)
    };

    const handleSubmit = async () => {
        const leadData = {
            name,
            phone,
            source,
            comment,
            image: image ? image.name : null,
        };
        try {
            const response=await createLeadWithNumber({ leadData });
            setName('');
            setPhone('');
            setSource('');
            setComment('');
            setImage(null);
            handleCloseModal();
            console.log('Lead created response', response);
        } catch (error) {
            console.error('Failed to create lead:', error);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ height: '32px' }}>
                + Create
            </Button>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        padding: 4,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Create New Lead
                    </Typography>

                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Source</InputLabel>
                                    <Select
                                        value={source}
                                        label="Source"
                                        onChange={(e) => setSource(e.target.value)}
                                    >
                                        <MenuItem value="reference">Reference</MenuItem>
                                        <MenuItem value="Phone">Phone</MenuItem>
                                        <MenuItem value="website">website</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    margin="normal"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Box>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        ref={fileInputRef}
                                                        onChange={handleImageUpload}
                                                    />
                                                    <IconButton onClick={() => fileInputRef.current?.click()} size="small">
                                                        <Image fontSize="small" />
                                                    </IconButton>
                                                    <IconButton onClick={handleVoiceRecording} size="small" color={isRecording ? "secondary" : "default"}>
                                                        <MicNone fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {image && (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Typography variant="body2" sx={{ mr: 1 }}>
                                    {image.name}
                                </Typography>
                                <IconButton size="small" onClick={() => setImage(null)}>
                                    <Close fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            sx={{ mt: 3, width: '100%' }}
                        >
                            Create Lead
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </>
    );
}