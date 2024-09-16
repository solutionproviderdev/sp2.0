// import React from 'react';

// const Chats = ({ messages }) => {
// 	return (
// 		<div className="p-4 overflow-y-auto">
		
// 			{messages.map(message => (
// 				<div
// 					key={message.id}
// 					className={`flex ${
// 						message.sentByUser ? 'justify-end' : 'justify-start'
// 					} mb-2`}
// 				>
// 					<div
// 						className={`max-w-xs p-2 rounded-lg ${
// 							message.sentByUser
// 								? 'bg-blue-500 text-white'
// 								: 'bg-gray-200 text-black'
// 						}`}
// 					>
// 						<p>{message.text}</p>
// 						<span className="text-xs text-gray-500">{message.time}</span>
// 					</div>
// 				</div>
// 			))}
// 		</div>
// 	);
// };


// export default Chats;






import React from 'react';

const Chats = ({ messages }) => {
	console.log('chat page theke messages',messages)
  return (
    <div className="p-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message._id} // Use _id as key from the message data
          className={`flex ${message.sentByMe ? 'justify-end' : 'justify-start'} mb-2`}
        >
          <div
            className={`max-w-xs p-2 rounded-lg ${
              message.sentByMe ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            <p>{message.content}</p> {/* Display the message content */}
            <span className="text-xs text-gray-500">
              {new Date(message.date).toLocaleString()} {/* Format the message date */}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
