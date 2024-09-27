
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, IconButton, InputAdornment, Button, Divider, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import { useAddCommentMutation } from '../../../features/conversation/conversationApi';

const Comments: React.FC = ({ conversation }) => {
  const [addComment, { isError, isSuccess }] = useAddCommentMutation();
  // console.log('comment----------', isError, isSuccess);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  // Local state to manage comments and input
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileIndicator, setShowFileIndicator] = useState(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  // Define comment interface for data consistency
  interface Comment {
    comment: string;
    images: string[];
    timestamp: string; // Add timestamp for time display (you can remove this if you don't want to show time)
  }

  // Generate a timestamp for new comments (you can remove this if you don't want to show time)
  // ... (implementation can be removed)

  // Add new comment
  const commentHandler = () => {
    if (newComment.trim() !== '') {
      const newCommentObj: Comment = {
        comment: newComment,
        images: selectedFile ? [selectedFile.name] : [],
       };
      setComments([...comments, newCommentObj]);
      addComment({ id: conversation, comments: newCommentObj });
      setNewComment(''); // Clear the input field
      setSelectedFile(null);
      setShowFileIndicator(false); // Hide file indicator after adding
    }
  };

  // Handle file selection and deselection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setShowFileIndicator(true);
 

   };

  const handleFileDeselect = (e) => {
     setSelectedFile(null);
    setShowFileIndicator(false);
 

   };

  return (
    <Box sx={{ marginTop: 2, padding: 2, border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" sx={{ marginBottom: 1, display: 'flex', alignItems: 'center' }}>
         Comments
      </Typography>

      <List>
        {(showAllComments ? comments : comments.slice(0, 1)).map((comment, index) => (
          <ListItem key={index} sx={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src="https://example.com/profile_pic.jpg" /> {/* Replace with your avatar logic */}
            </ListItemAvatar>
            <ListItemText
              primary={comment.comment}
              secondary={
                <>
                  {/* You can remove the following section if you don't want to show time */}
                  <Typography variant="caption" display="block">
                    {comment.timestamp}
                  </Typography>
                  {/* ------ */}
                  {comment.images.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                      {comment.images.map((image, i) => (
                        <img key={i} src={image} alt={`Image ${i + 1}`} style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                      ))}
                    </Box>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Show/Hide buttons */}
      {comments.length > 1 && (
        <>
          <Divider sx={{ my: 1 }} />
          {!showAllComments ? (
            <Button onClick={() => setShowAllComments(true)} size="small" sx={{ color: '#0288d1' }}>
              Show All
            </Button>
          ) : (
            <Button onClick={() => setShowAllComments(false)} size="small" sx={{ color: '#0288d1' }}>
              Show Less
            </Button>
          )}
        </>
      )}

      {/* Add Comment Input */}
      <TextField
        label="Add a comment"
        size="small"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ marginTop: 1, backgroundColor: '#fff', borderRadius: '5px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={commentHandler}
                color="primary"
                aria-label="send comment"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                component="label"
              >
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileChange}
                  multiple
                />
                <AttachFileIcon className={ selectedFile === null ? 'text-gray-500' : 'text-red-600' } />
                {showFileIndicator && (
                  <ClearIcon className="text-gray-800 ml-2" onClick={handleFileDeselect} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Comments;