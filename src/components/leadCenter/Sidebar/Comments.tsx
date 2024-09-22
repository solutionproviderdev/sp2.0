import React, { useState } from 'react';
import { Box, Typography, List, ListItem, TextField, IconButton, InputAdornment, Button, Divider, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAddCommentMutation } from '../../../features/conversation/conversationApi';

const Comments: React.FC = ({conversation}) => {
  console.log('comment----------',conversation)
  const [addComment, { isError, isSuccess }] = useAddCommentMutation()
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
  const [comments, setComments] = useState<string[]>([]);

  

  const [selectedFile, setSelectedFile] = useState();
  const [newComment, setNewComment] = useState<string>('');
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const comment={
    comment: newComment,
    images: [selectedFile]
  }
  console.log('comment seleted file', comment)
  // Add new comment
  const commentHandler = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      addComment({id:conversation,comments:comment})
      setNewComment(''); // Clear the input field
    }
  };


  return (
    <Box sx={{ marginTop: 2, padding: 2, border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" sx={{ marginBottom: 1, display: 'flex', alignItems: 'center' }}>
        💬 Comments
      </Typography>
      <List>
        {(showAllComments ? comments : comments.slice(0, 1)).map((comment, index) => (
          <ListItem key={index} sx={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
            <EmojiEmotionsIcon sx={{ color: '#fbc02d', marginRight: 1 }} />
            <Box>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: '#e0f7fa',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  wordWrap: 'break-word',
                  boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {comment}
              </Typography>
            </Box>
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
                onChange={commentHandler}
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
                  onChange={(event) => setSelectedFile(event.target.files)}
                  multiple
                />
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>

          ),
        }}
      />
    </Box>
  );
};




export default Comments;
