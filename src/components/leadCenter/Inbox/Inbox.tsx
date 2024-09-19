
import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box, Button, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FaCircleInfo } from 'react-icons/fa6';
import Chats from './chats';
import NoMessagesImage from '../../../assets/nomessageimg.jpg';
import Sidebar from '../Sidebar/Sidebar';
import { useGetConversationMessagesQuery } from '../../../features/conversation/conversationApi';

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  status?: string;
}

interface InboxProps {
  conversation: Conversation | null;
}

const Inbox: React.FC<InboxProps> = ({ conversation }) => {

  console.log('inbox theke coversation id with messages',conversation)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // State to control sidebar visibility
  const [messages, setMessages] = useState([]);
  
  const { data, error, isLoading } = useGetConversationMessagesQuery(conversation?._id);
  

//   Fetch messages when the conversation changes
  useEffect(() => {
    if (data && data.messages) {
		setMessages(data.messages);
      // console.log('inbox messages got',data);
    }
  }, [data]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex justify-between">
        <div className="font-bold">{conversation?.name}</div>

        <div className="text-sm text-gray-600 gap-1 flex items-center">
          <select className="border border-gray-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="unread">Unread</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="active">Active</option>
            <option value="Canceled">Canceled</option>
          </select>

          {/* Button to toggle sidebar */}
          <Button onClick={toggleSidebar} sx={{ marginLeft: 1 }}>
            <FaCircleInfo className="h-6 w-6" />
            <Sidebar conversation={conversation} isOpen={isSidebarOpen} onClose={toggleSidebar} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <Box
        sx={{
          flex: '1',
          overflowY: 'auto',
          mb: 0,
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3b82f6',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#e5e7eb',
          },
        }}
      >
        {messages.length > 0 ? (
          <Chats messages={messages} />
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={NoMessagesImage}
              alt="No messages here"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </Box>

      {/* Input Box */}
      <div className="mb-20 pt-2 bg-white border-t flex items-center">
        <IconButton className="text-gray-500">
          <CameraAltIcon className="text-gray-800" />
        </IconButton>

        <IconButton>
          <EmojiEmotionsRoundedIcon className="text-orange-400" />
        </IconButton>

        <IconButton>
          <AttachFileRoundedIcon className="text-gray-700" />
        </IconButton>

        <TextField label="Type a message..." className="w-full" />

        <IconButton>
          <SendRoundedIcon className="text-blue-500" />
        </IconButton>
      </div>
    </div>
  );
};

export default Inbox;
