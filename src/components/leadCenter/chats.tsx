import React from 'react';

const Chats = ({ messages }) => {
	return (
		<div className="flex-1 p-4 overflow-y-auto">
			{messages.map(message => (
				<div
					key={message.id}
					className={`flex ${
						message.sentByUser ? 'justify-end' : 'justify-start'
					} mb-2`}
				>
					<div
						className={`max-w-xs p-2 rounded-lg ${
							message.sentByUser
								? 'bg-blue-500 text-white'
								: 'bg-gray-200 text-black'
						}`}
					>
						<p>{message.text}</p>
						<span className="text-xs text-gray-500">{message.time}</span>
					</div>
				</div>
			))}
		</div>
	);
};


export default Chats;
