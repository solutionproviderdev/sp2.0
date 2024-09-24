import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
	Box,
	Drawer,
	Typography,
	TextField,
	Button,
	IconButton,
	Divider,
	List,
	ListItem,
	InputAdornment,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';

import Requirements from './Requirements';
import { useGetSingleLeadQuery } from '../../../features/conversation/conversationApi';
import Reminders from './Reminders';
import PhoneNumbers from './PhoneNumbers';
import Locations from './Locations';
import CallLogs from './CallLogs';
import Comments from './Comments';
import AddressCard from './Locations';

interface Conversation {
	id: number;
	name: string;
	lastMessage: string;
	lastMessageTime: string;
	status?: string;
}
interface SidebarProps {
	conversation: Conversation | null;
	isOpen: boolean;
	onClose: () => void;
}

interface FormValues {
	newNumber: string;
	newReminder: string;
	newLocation: string;
}

const Sidebar: React.FC<SidebarProps> = ({ conversation, isOpen, onClose }) => {
	// if(conversation?._id === null){
	//   <div>loading...</div>
	// }
	// console.log('from sidebar to get the conversation', conversation)
	const [numbers, setNumbers] = useState<string[]>([
		'01957795943',
		'01234629732',
	]);

	const [editIndex, setEditIndex] = useState<number | null>(null);

	const [showAllComments, setShowAllComments] = useState<boolean>(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: { newNumber: '', newReminder: '', newLocation: '' },
	});

	const { data, error, isLoading, refetch } = useGetSingleLeadQuery(
		conversation?._id ?? ''
	);

	console.log(data);

	const addNumber = (data: FormValues) => {
		const trimmedNumber = data.newNumber.trim();
		if (trimmedNumber !== '') {
			setNumbers([...numbers, trimmedNumber]);
		}
		reset({ newNumber: '' });
	};

	const handleSaveEdit = () => {
		if (editIndex !== null && numbers[editIndex].trim() === '') {
			setNumbers(numbers.filter((_, i) => i !== editIndex));
		}
		setEditIndex(null);
	};

	const handleSidebarClick = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	//   const { data, error, isLoading, isFetching, refetch } = useGetSingleLeadQuery(conversation?._id);
	//   console.log('singlelead found hare ',data,error, isLoading, isFetching,conversation?._id)

	return (
		<Drawer anchor="right" open={isOpen} onClose={onClose}>
			<Box
				sx={{
					width: 400,
					padding: 2,
				}}
				role="presentation"
				onClick={handleSidebarClick}
			>
				{/* Lead Information */}
				<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
					{data?.name}
				</Typography>

				{/* Numbers Section */}
				<PhoneNumbers leadId={conversation?._id} phoneNumbers={data?.phone} />
				<Divider />


				{/* location sactions */}
				<AddressCard leadId={conversation?._id} address={data?.address} />

				<Divider />
				{/* requirement part is hare  */}
				<Requirements conversation={conversation?._id} />

				<Divider />

				{/* Follow-up Section */}
				<Reminders leadId={conversation?._id} leadReminders={data?.reminder} refetch={refetch} />

				<Divider />

				{/* Call Logs */}  
				<CallLogs callLogsId={conversation?._id} leadCallLogs={data?.callLogs} refetch={refetch} />

				<Divider />

				{/* Comments Section */}
				<Comments conversation={conversation?._id} />

			 
			</Box>
		</Drawer>
	);
};

export default Sidebar;
