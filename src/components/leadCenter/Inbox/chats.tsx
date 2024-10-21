import { Tooltip } from '@mui/material';
import Image from '../../UI/Image';
import { useEffect, useRef } from 'react';

// Define the types for the messages and file URLs
interface Message {
	_id: string;
	messageId: string;
	content: string;
	senderId: string;
	sentByMe: boolean;
	isAutomatedMessage: boolean;
	fileUrl: string[];
	isSticker: boolean;
	date: string; // Date is stored as string in the messages
}

interface ChatsProps {
	messages: Message[];
}

const Chats: React.FC<ChatsProps> = ({ messages }) => {
	const endOfMessagesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	const renderMessageContent = (msg: Message) => {
		const renderMultipleImages = (fileUrl: string) => (
			<Image
				key={fileUrl}
				src={fileUrl}
				alt="Attachment"
				className="w-40 h-40 object-cover rounded-md"
			/>
		);

		const renderSingleImage = (fileUrl: string) => (
			<Image
				key={fileUrl}
				src={fileUrl}
				alt="Attachment"
				className="w-[25%] h-auto object-cover rounded-md"
			/>
		);

		if (msg.fileUrl.length > 4) {
			return (
				<div className="grid grid-cols-3 gap-2">
					{msg.fileUrl.map(renderMultipleImages)}
				</div>
			);
		}

		if (msg.fileUrl.length > 1 && msg.fileUrl.length <= 4) {
			return (
				<div className="grid grid-cols-2 gap-2">
					{msg.fileUrl.map(renderMultipleImages)}
				</div>
			);
		}

		if (msg.fileUrl.length > 0) {
			return <>{msg.fileUrl.map(renderSingleImage)}</>;
		}

		// Automated message styling
		if (msg.isAutomatedMessage) {
			return (
				<div
					key={msg.date}
					className="text-xs text-gray-500 dark:text-gray-300 text-center"
				>
					{msg.content || '...'}
				</div>
			);
		}

		// Regular message styling
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
		<div className="px-2 py-1 space-y-2 h-full scrollbar-none bg-bright dark:bg-dark ">
			{messages.map((message, index) => (
				<div
					key={message._id}
					className={`flex ${
						message.isAutomatedMessage
							? 'justify-center' // Center align for automated messages
							: message.sentByMe
							? 'justify-end' // Right align for sent messages
							: 'justify-start' // Left align for received messages
					} mb-2`}
				>
					<Tooltip
						title={new Date(message.date).toLocaleString()}
						placement="top"
						arrow
					>
						{renderMessageContent(message)}
					</Tooltip>
					<div ref={endOfMessagesRef} />
				</div>
			))}
		</div>
	);
};

export default Chats;
