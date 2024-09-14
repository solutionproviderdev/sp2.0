

// SearchInput.jsx
import React, { useState } from 'react';
import { TextField } from '@mui/material';

const SearchInput = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    onSearchChange(value); // Call the parent's function to handle search logic
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      value={searchText}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
