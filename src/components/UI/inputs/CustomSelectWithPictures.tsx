import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  IconButton,
  InputAdornment,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface CustomSelectWithPicturesProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  options: { value: string; label: string; profilePicture?: string }[];
  fullWidth?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  disabled?: boolean;
  clearable?: boolean;
}

const CustomSelectWithPictures: React.FC<CustomSelectWithPicturesProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  fullWidth = true,
  required = false,
  size = 'small',
  disabled = false,
  clearable = false,
}) => {
  // Function to clear the selection
  const handleClear = () => {
    const event = {
      target: { value: '' }, // Set the value to an empty string
    };
    onChange(event as React.ChangeEvent<{ value: unknown }>);
  };

  return (
    <Grid item xs={12} md={6}>
      <FormControl fullWidth={fullWidth} required={required} size={size}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          name={name}
          value={value}
          onChange={(event) => onChange(event as React.ChangeEvent<{ value: unknown }>)}
          disabled={disabled}
          endAdornment={
            clearable && value ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={handleClear}
                  aria-label={`Clear ${label}`}
                  style={{ marginRight: 8 }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ) : null
          }
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <ListItem disableGutters>
                {option.profilePicture && (
                  <ListItemAvatar>
                    <Avatar
                      src={option.profilePicture}
                      alt={option.label}
                      style={{ width: 24, height: 24 }}
                    />
                  </ListItemAvatar>
                )}
                <ListItemText primary={option.label} />
              </ListItem>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default CustomSelectWithPictures;
