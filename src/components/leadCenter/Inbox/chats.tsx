import { Tooltip } from '@mui/material';
import Image from '../../UI/Image';
import { useEffect, useRef } from 'react';

const Chats = ({ messages }) => {
	console.log(messages);

	const endOfMessagesRef = useRef(null);

	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const renderMessageContent = msg => {
		const renderMultipleImages = fileUrl => (
			<Image
				key={fileUrl}
				src={fileUrl}
				alt="Attachment"
				className="w-40 h-40 object-cover rounded-md mr-2"
			/>
		);

		const renderSingleImage = fileUrl => (
			<Image
				key={fileUrl}
				src={fileUrl}
				alt="Attachment"
				className="w-[30%] h-auto object-cover rounded-md mr-2"
			/>
		);

		if (msg.fileUrl?.length > 0) {
			if (msg.fileUrl.length > 1) {
				return <>{msg.fileUrl.map(renderMultipleImages)}</>;
			}

			return <>{msg.fileUrl.map(renderSingleImage)}</>;
		}

		return (
			<div
				key={msg.date}
				className={`rounded-md px-2 py-1 max-w-[80%] text-base overflow-hidden ${
					msg.sentByMe
						? 'bg-blue-500 text-white'
						: 'bg-dark-tremor-brand-faint/20 dark:bg-white text-dark'
				}`}
			>
				{msg.content || '...'}
			</div>
		);
	};

	return (
		<div className="px-2 py-1 space-y-2 h-full overflow-y-scroll scrollbar-thin bg-bright dark:bg-dark scrollbar-thumb-gray-200 dark:scrollbar-thumb-dark scrollbar-track-gray-100 dark:scrollbar-track-bdark">
			{messages.map((message, index) => (
				<div
					key={message._id}
					// ref={index === messages.length - 1 ? endOfMessagesRef : null}
					className={`flex ${
						message.sentByMe ? 'justify-end' : 'justify-start'
					} mb-2`}
				>
					<Tooltip
						title={new Date(message.date).toLocaleString()}
						placement="top"
						arrow
					>
						{renderMessageContent(message)}
					</Tooltip>
				</div>
			))}
			<div className="" ref={endOfMessagesRef}></div>
		</div>
	);
};

export default Chats;
 