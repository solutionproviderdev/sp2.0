

// import React, { useState } from 'react';
// import { TextField } from '@mui/material';

// const SearchInput = ({ onSearchChange }) => {
//   const [searchText, setSearchText] = useState('');

//   const handleChange = (event) => {
//     const value = event.target.value;
//     setSearchText(value);
//     onSearchChange(value); // Call the parent's function to handle search logic
//   };

//   return (
//     <TextField
//       variant="outlined"
//       placeholder="Search..."
//       fullWidth
//       value={searchText}
//       onChange={handleChange}
//     />
//   );
// };

// export default SearchInput;





import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ onSearchChange }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    onSearchChange(value); // Call the parent's function to handle search logic
  };

  const handleSearchClick = () => {
    onSearchChange(searchText); // Trigger search when the button is clicked
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      fullWidth
      value={searchText}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearchClick} edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
