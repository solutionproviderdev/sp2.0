// import { TextField, InputAdornment, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';

// const SearchInput = ({ onSearchChange, onSearchClick }) => {
//   const [searchValue, setSearchValue] = useState('');

//   // Function to handle input changes
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setSearchValue(value);

//     // Call the parent's onSearchChange function
//     onSearchChange(value);
//   };

//   // Function to handle search button click
//   const handleSearchButtonClick = () => {
//     // Call the parent's onSearchClick function
//     onSearchClick(searchValue);
//   };

//   return (
//     <TextField
//       value={searchValue}
//       onChange={handleInputChange}
//       placeholder="Search here..."
//       variant="outlined"
//       fullWidth
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton onClick={handleSearchButtonClick}>
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
