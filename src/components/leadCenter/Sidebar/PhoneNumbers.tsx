








// import React, { useState, useEffect } from 'react';
// import { Typography, TextField, IconButton, Button } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DoneIcon from '@mui/icons-material/Done';
// import { useGetSingleLeadQuery, useUpdateLeadsMutation } from '../../../features/conversation/conversationApi';

// interface PhoneNumbersProps {
//   conversation: { id: string } | null; // Assuming conversation contains an id
// }

// interface FormValues {
//   newNumber: string;
// }

// const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ conversation }) => {
//   // Local state to manage the phone numbers list
//   const [numbers, setNumbers] = useState<string[]>([]); // Store phone numbers as an array
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false);

//   // Fetch lead data including phone numbers
//   const { data, refetch } = useGetSingleLeadQuery(conversation ?? '');
//   const [updateLead, { isError, isSuccess }] = useUpdateLeadsMutation();
//   // React Hook Form
//   const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  
//   // Load the phone numbers from fetched lead data
//   useEffect(() => {
//     if (data?.phone) {
//       setNumbers(data.phone); // Initialize with the existing phone numbers from the lead data
//     }
//   }, [data]);
  
//   console.log("PhoneNumbers component",data.phone)
//   // Update backend with the modified phone numbers
//   const updateLeadData = async (newNumber: string[]) => {
//     if (conversation) {
//       const updatedNumbers = [...numbers, newNumber]; // Append the new number to the list

//       await updateLead({ id: conversation, phone: updatedNumbers }); // Send only the phone numbers in the body
//       refetch(); // Refresh the lead data after updating
//     }
//   };
//   // Add new number with form validation
//   const addNumber = (formData: FormValues) => {
//     const newNumber = formData.newNumber.trim();
//     if (newNumber !== '') {
//       setNumbers(updatedNumbers);
//       reset(); // Clear the input field
//       updateLeadData(newNumber); // Update backend after adding the number
//     }
//   };


//   // Save updated number
//   const handleSaveEdit = (index: number) => {
//     if (errors[`editNumber-${index}`]) return; // Prevent saving if there's a validation error
//     setEditIndex(null); // Exit edit mode
//     updateLeadData(numbers); // Update backend after saving the changes
//   };

//   // Remove a phone number
//   const handleRemoveNumber = (index: number) => {
//     const updatedNumbers = numbers.filter((_, i) => i !== index); // Remove the number by index
//     setNumbers(updatedNumbers);
//     updateLeadData(updatedNumbers); // Update backend after removal
//   };

//   return (
//     <div className="flex flex-col my-1">
//       <Typography variant="body2" sx={{ marginTop: 1 }}>
//         📞 Phone Numbers:
//       </Typography>

//       {numbers.slice(0, showAllNumbers ? undefined : 1).map((number, index) => (
//         <div key={index} className="flex items-center mb-2">
//           {editIndex === index ? (
//             <Controller
//               name={`editNumber-${index}`} // Dynamic field name for validation
//               control={control}
//               defaultValue={number}
//               rules={{
//                 required: 'Number is required',
//                 pattern: {
//                   value: /^[0-9]{10,15}$/, // Validate 10-15 digit numbers
//                   message: 'Invalid number format',
//                 },
//               }}
//               render={({ field }) => (
//                 <>
//                   <TextField
//                     {...field} // Let react-hook-form manage the value and onChange
//                     size="small"
//                     sx={{ flexGrow: 1, marginRight: 1 }}
//                     error={!!errors[`editNumber-${index}`]}
//                     helperText={errors[`editNumber-${index}`]?.message || ''}
//                   />
//                   <IconButton size="small" onClick={() => handleSaveEdit(index)}>
//                     <DoneIcon />
//                   </IconButton>
//                   <Button onClick={() => handleRemoveNumber(index)} size="small" color="error">
//                     Remove
//                   </Button>
//                 </>
//               )}
//             />
//           ) : (
//             <>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   flexGrow: 1,
//                   padding: '8px',
//                   borderLeft: 1,
//                   backgroundColor: '#e0f7fa',
//                   borderRadius: '5px',
//                   transition: 'background-color 0.3s ease',
//                 }}
//               >
//                 {number}
//               </Typography>

//               <IconButton
//                 size="small"
//                 sx={{
//                   padding: '6px',
//                   borderRadius: '5px',
//                   backgroundColor: '#e8f0fe',
//                   borderLeft: 1,
//                   color: '#0288d1',
//                   '&:hover': { color: '#01579b' },
//                 }}
//                 onClick={() => setEditIndex(index)}
//               >
//                 <EditIcon />
//               </IconButton>
//             </>
//           )}
//         </div>
//       ))}

//       {!showAllNumbers && numbers.length > 1 && (
//         <Button onClick={() => setShowAllNumbers(true)} size="small">
//           Show All
//         </Button>
//       )}
//       {showAllNumbers && (
//         <Button onClick={() => setShowAllNumbers(false)} size="small">
//           Show Less
//         </Button>
//       )}

//       {/* Add Phone Number Input with validation */}
//       <form onSubmit={handleSubmit(addNumber)} className="flex items-center mb-2">
//         <Controller
//           name="newNumber"
//           control={control}
//           rules={{
//             required: 'Number is required',
//             pattern: {
//               value: /^[0-9]{10,15}$/, // Validate 10-15 digit numbers
//               message: 'Invalid number format',
//             },
//           }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Add Number"
//               size="small"
//               sx={{ flexGrow: 1, marginRight: 1 }}
//               error={!!errors.newNumber}
//               helperText={errors.newNumber ? errors.newNumber.message : ''}
//             />
//           )}
//         />
//         <Button variant="outlined" size="medium" startIcon={<AddIcon />} type="submit">
//           Add
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default PhoneNumbers;





import React, { useState, useEffect } from 'react';
import { Typography, TextField, IconButton, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { useGetSingleLeadQuery, useUpdateLeadsMutation } from '../../../features/conversation/conversationApi';

interface PhoneNumbersProps {
  conversation: { id: string } | null; // Assuming conversation contains an id
}

interface FormValues {
  newNumber: string;
}

const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ conversation }) => {
  // Local state to manage the phone numbers list
  const [numbers, setNumbers] = useState<string[]>([]); // Store phone numbers as an array
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false);

  // Fetch lead data including phone numbers
  const { data, refetch } = useGetSingleLeadQuery(conversation ?? '');
  const [updateLead, { isError, isSuccess }] = useUpdateLeadsMutation();

  // React Hook Form
  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  
  // Load the phone numbers from fetched lead data
  useEffect(() => {
    if (data?.phone) {
      setNumbers(data.phone); // Initialize with the existing phone numbers from the lead data
    }
  }, [data]);

  // console.log("PhoneNumbers component", data?.phone, "error:", isError, "success:", isSuccess);

  // Update backend with the modified phone numbers
  const updateLeadData = async (updatedNumbers: string[]) => {
    if (conversation) {
      // Send the updated phone numbers to the backend
      await updateLead({ id: conversation.id, phone: updatedNumbers }); // Update only phone numbers
      refetch(); // Refresh the lead data after updating
    }
  };

  // Add new number with form validation
  const addNumber =async (formData: FormValues) => {
    const newNumber = formData.newNumber.trim();
    if (newNumber !== '') {
      const updatedNumbers = [...numbers, newNumber]; // Add the new number to the list
      reset(); // Clear the input field
      await updateLeadData(updatedNumbers); // Update backend after adding the number
      setNumbers(updatedNumbers);
    }
  };

  // Save updated number
  const handleSaveEdit = (index: number, updatedNumber: string) => {
    const updatedNumbers = numbers.map((number, i) => (i === index ? updatedNumber : number)); // Update the number
    setNumbers(updatedNumbers);
    setEditIndex(null); // Exit edit mode
    updateLeadData(updatedNumbers); // Update backend after saving the changes
  };

  // Remove a phone number
  const handleRemoveNumber = (index: number) => {
    const updatedNumbers = numbers.filter((_, i) => i !== index); // Remove the number by index
    setNumbers(updatedNumbers);
    updateLeadData(updatedNumbers); // Update backend after removal
  };

  return (
    <div className="flex flex-col my-1">
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        📞 Phone Numbers:
      </Typography>

      {numbers.slice(0, showAllNumbers ? undefined : 1).map((number, index) => (
        <div key={index} className="flex items-center mb-2">
          {editIndex === index ? (
            <Controller
              name={`editNumber-${index}`} // Dynamic field name for validation
              control={control}
              defaultValue={number}
              rules={{
                required: 'Number is required',
                pattern: {
                  value: /^[0-9]{10,15}$/, // Validate 10-15 digit numbers
                  message: 'Invalid number format',
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field} // Let react-hook-form manage the value and onChange
                    size="small"
                    sx={{ flexGrow: 1, marginRight: 1 }}
                    error={!!errors[`editNumber-${index}`]}
                    helperText={errors[`editNumber-${index}`]?.message || ''}
                  />
                  <IconButton size="small" onClick={() => handleSaveEdit(index, field.value)}>
                    <DoneIcon />
                  </IconButton>
                  <Button onClick={() => handleRemoveNumber(index)} size="small" color="error">
                    Remove
                  </Button>
                </>
              )}
            />
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  flexGrow: 1,
                  padding: '8px',
                  borderLeft: 1,
                  backgroundColor: '#e0f7fa',
                  borderRadius: '5px',
                  transition: 'background-color 0.3s ease',
                }}
              >
                {number}
              </Typography>

              <IconButton
                size="small"
                sx={{
                  padding: '6px',
                  borderRadius: '5px',
                  backgroundColor: '#e8f0fe',
                  borderLeft: 1,
                  color: '#0288d1',
                  '&:hover': { color: '#01579b' },
                }}
                onClick={() => setEditIndex(index)}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </div>
      ))}

      {!showAllNumbers && numbers.length > 1 && (
        <Button onClick={() => setShowAllNumbers(true)} size="small">
          Show All
        </Button>
      )}
      {showAllNumbers && (
        <Button onClick={() => setShowAllNumbers(false)} size="small">
          Show Less
        </Button>
      )}

      {/* Add Phone Number Input with validation */}
      <form onSubmit={handleSubmit(addNumber)} className="flex items-center mb-2">
        <Controller
          name="newNumber"
          control={control}
          rules={{
            required: 'Number is required',
            pattern: {
              value: /^[0-9]{10,15}$/, // Validate 10-15 digit numbers
              message: 'Invalid number format',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Add Number"
              size="small"
              sx={{ flexGrow: 1, marginRight: 1 }}
              error={!!errors.newNumber}
              helperText={errors.newNumber ? errors.newNumber.message : ''}
            />
          )}
        />
        <Button variant="outlined" size="medium" startIcon={<AddIcon />} type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default PhoneNumbers;
