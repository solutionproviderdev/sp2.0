// src/components/Comments.tsx
import React from 'react';
import { Box, Typography, List, ListItem, TextField, IconButton, InputAdornment, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface CommentsProps {
  comments: string[];
  newComment: string;
  setNewComment: (comment: string) => void;
  showAllComments: boolean;
  setShowAllComments: (showAll: boolean) => void;
  addComment: () => void;
}




const Comments: React.FC<CommentsProps> = ({
  comments,
  newComment,
  setNewComment,
  showAllComments,
  setShowAllComments,
  addComment,
}) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="body2">All Comments:</Typography>
      <List>
        {(showAllComments ? comments : comments.slice(0, 1)).map((comment, index) => (
          <ListItem key={index}>
            <Typography variant="body2">{comment}</Typography>
          </ListItem>
        ))}
      </List>
      {!showAllComments && comments.length > 1 && (
        <Button onClick={() => setShowAllComments(true)} size="small">
          Show All
        </Button>
      )}
      {showAllComments && (
        <Button onClick={() => setShowAllComments(false)} size="small">
          Show Less
        </Button>
      )}
      <TextField
        label="Add a comment"
        size="small"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        sx={{ marginTop: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={addComment}
                color="primary"
                aria-label="send comment"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Comments;
