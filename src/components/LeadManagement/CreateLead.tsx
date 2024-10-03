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
            p: 4,
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