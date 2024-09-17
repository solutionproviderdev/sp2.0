// src/components/Locations.tsx
import React from 'react';
import { Typography, TextField, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

interface LocationsProps {
  locations: string[];
  showAllLocations: boolean;
  setShowAllLocations: React.Dispatch<React.SetStateAction<boolean>>;
  newLocation: string;
  setNewLocation: React.Dispatch<React.SetStateAction<string>>;
  addLocation: () => void;
  handleLocationChange: (index: number, value: string) => void;
  handleEditLocation: (index: number) => void;
  handleSaveLocation: () => void;
  editIndex: number | null;
}

const Locations: React.FC<LocationsProps> = ({
  locations,
  showAllLocations,
  setShowAllLocations,
  newLocation,
  setNewLocation,
  addLocation,
  handleLocationChange,
  handleEditLocation,
  handleSaveLocation,
  editIndex
}) => {
  return (
    <div className="flex flex-col my-2">
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        🗺️ Locations:
      </Typography>
      {(showAllLocations ? locations : locations.slice(0, 1)).map((location, index) => (
        <div key={index} className="flex items-center mb-2">
          {editIndex === index ? (
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
            </>
          ) : (
            <>
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {location}
              </Typography>
              <IconButton size="small" onClick={() => handleEditLocation(index)}>
                <EditIcon />
              </IconButton>
            </>
          )}
        </div>
      ))}
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
      <div className="flex items-center mb-2">
        <TextField
          label="Add Location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, marginRight: 1 }}
        />
        <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={addLocation}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default Locations;
