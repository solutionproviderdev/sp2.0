
import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Box, Button, Typography, InputAdornment } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { FaCircleInfo } from 'react-icons/fa6';
import Chats from './chats';
import NoMessagesImage from '../../../assets/nomessageimg.jpg';
import Sidebar from '../Sidebar/Sidebar';
import { useGetConversationMessagesQuery, useSentMessageMutation } from '../../../features/conversation/conversationApi';
import SendIcon from '@mui/icons-material/Send';

interface Conversation {
  _id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  status?: string;
}

interface InboxProps {
  conversation: Conversation | null;
}

const Inbox: React.FC<InboxProps> = ({ conversation }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const { data, error, isLoading } = useGetConversationMessagesQuery(conversation?._id);
  const [sendMessage] = useSentMessageMutation();

  useEffect(() => {
    if (data && data.messages) {
      setMessages(data.messages);
    }
  }, [data]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && conversation?._id) {
      try {
        await sendMessage({
          id: conversation._id,
          message: {
            messageType: "text",
            content: {
              text: newMessage
            }
          }
        }).unwrap();
        
        // Clear the input field after sending
        setNewMessage('');
        
        // Optionally, you can refetch the messages or update the local state
        // to include the new message immediately
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    }
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

        <TextField
          label="send message"
          size="small"
          fullWidth
          className='!mr-4'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ marginBottom: 1, backgroundColor: '#fff', borderRadius: '5px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  aria-label="send comment"
                  onClick={handleSendMessage}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Inbox;