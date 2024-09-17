
// import React from 'react';
// import { Tooltip } from '@mui/material';

// const Chats = ({ messages }) => {
//   return (
//     <div className="p-4 overflow-y-auto">
//       {messages.map((message) => (
//         <div
//           key={message._id} // Use _id as key from the message data
//           className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'} mb-2`}
//         >
//           <div
//             className={`max-w-xs p-2 rounded-lg ${message.sentByMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
//               }`}
//           >
//             <Tooltip title={new Date(message.date).toLocaleString()} arrow>
//               <span className="text-xs text-white border border-black p-1">
//                 <p>{message.content}</p>
//               </span>
//             </Tooltip>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Chats;





import React from 'react';
import { Tooltip, Box } from '@mui/material';

const Chats = ({ messages }) => {
  return (
    <div className="p-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message._id} // Use _id as key from the message data
          className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'} mb-2`}
        >
          {/* Tooltip wraps the message box */}
          <Tooltip
            title={new Date(message.date).toLocaleString()} // Display formatted date in tooltip
            placement="top" // Position tooltip above the message
            arrow // Adds an arrow pointing to the message
          >
            <div
              className={`max-w-xs p-2 rounded-lg ${
                message.sentByMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              <p>{message.content}</p> {/* Display the message content */}
            </div>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};

export default Chats;
