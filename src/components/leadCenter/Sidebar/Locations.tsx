
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

const Locations: React.FC = () => {
  // Local state to manage locations list
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState<string>(''); // To hold the new location input
  const [editLocationIndex, setEditLocationIndex] = useState<number | null>(null); // Track the index being edited
  const [showAllLocations, setShowAllLocations] = useState<boolean>(false); // Control display of all locations

  // Add a new location to the list
  const addLocation = () => {
    if (newLocation.trim() !== '') {
      const updatedLocations = [...locations, newLocation]; // Append the new location
      setLocations(updatedLocations);
      setNewLocation(''); // Reset the input field
    }
  };

  // Edit a location in the list
  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = locations.map((location, i) => (i === index ? value : location));
    setLocations(updatedLocations); // Update the list
  };

  // Save the updated location
  const handleSaveLocation = () => {
    setEditLocationIndex(null); // Exit edit mode
  };

  // Remove a location
  const handleRemoveLocation = (index: number) => {
    const updatedLocations = locations.filter((_, i) => i !== index); // Remove location by index
    setLocations(updatedLocations);
  };

  return (
    <Box sx={{ marginTop: 1 }}>
      <Typography variant="body2">🗺️ Locations:</Typography>

      {/* Display Locations */}
      {(showAllLocations ? locations : locations.slice(0, 1)).map((location, index) => (
        <div key={index} className="flex items-center mb-2">
          {editLocationIndex === index ? (
            <>
              <TextField
                value={location}
                onChange={(e) => handleLocationChange(index, e.target.value)}
                size="small"
                sx={{ flexGrow: 1, marginRight: 1 }}
              />
              <IconButton size="small" onClick={handleSaveLocation}>
                <DoneIcon />
              </IconButton>
              <Button onClick={() => handleRemoveLocation(index)} size="small" color="error">
                Remove
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  flexGrow: 1,
                  padding: '8px',
                  backgroundColor: '#e0f7fa',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {location}
              </Typography>
              <IconButton
                size="small"
                sx={{
                  color: '#0288d1',
                  '&:hover': { color: '#01579b' },
                }}
                onClick={() => setEditLocationIndex(index)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </div>
      ))}

      {/* Show/Hide All Locations Button */}
      {!showAllLocations && locations.length > 1 && (
        <Button onClick={() => setShowAllLocations(true)} size="small">
          Show All
        </Button>
      )}
      {showAllLocations && (
        <Button onClick={() => setShowAllLocations(false)} size="small">
          Show Less
        </Button>
      )}

      {/* Add Location Input */}
      <div className="flex items-center mb-2">
        <TextField
          label="Add Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} onClick={addLocation}>
          Add
        </Button>
      </div>
    </Box>
  );
};

export default Locations;
