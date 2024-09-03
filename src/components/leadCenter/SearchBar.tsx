// import React, { useState } from 'react';
// import { TextField, InputAdornment, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchInput = () => {
//   const [searchValue, setSearchValue] = useState('');

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchValue(value);

//     // Log the search value
//     console.log('Current search value:', value);
//   };

//   // Function to handle search button click (optional)
//   const handleSearchClick = () => {
//     console.log('Search triggered for:', searchValue);
//   };

//   return (
//     <TextField
//       value={searchValue}
//       onChange={handleInputChange} // Logs value on every change
//       placeholder="Search here..."
//       variant="outlined"
//       fullWidth
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton onClick={handleSearchClick}>
//               <SearchIcon />
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//       sx={{
//         '& .MuiOutlinedInput-root': {
//           borderRadius: '50px', // Rounded corners for input
//           backgroundColor: '#f1f3f4', // Light gray background
//           paddingRight: '10px', // Padding inside the input
//         },
//         '& .MuiOutlinedInput-notchedOutline': {
//           border: 'none', // Remove the border for a clean look
//         },
//       }}
//     />
//   );
// };

// export default SearchInput;




import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const SearchInput = ({ onSearchChange, onSearchClick }) => {
  const [searchValue, setSearchValue] = useState('');

  // Function to handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Call the parent's onSearchChange function
    onSearchChange(value);
  };

  // Function to handle search button click
  const handleSearchButtonClick = () => {
    // Call the parent's onSearchClick function
    onSearchClick(searchValue);
  };

  return (
    <TextField
      value={searchValue}
      onChange={handleInputChange}
      placeholder="Search here..."
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleSearchButtonClick}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '50px', // Rounded corners for input
          backgroundColor: '#f1f3f4', // Light gray background
          paddingRight: '10px', // Padding inside the input
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none', // Remove the border for a clean look
        },
      }}
    />
  );
};

export default SearchInput;
