import React from 'react';
import { Box, Typography, List } from '@mui/material';
import { Comment } from '../../../features/conversation/conversationApi';
import CommentItem from '../../follow-up/CommentItem';
import AddComment from './AddComment';

interface CommentsProps {
	comments: Comment[] | undefined;
	leadId: string | undefined;
}

const AllComments: React.FC<CommentsProps> = ({ comments, leadId }) => {
	return (
		<Box
			sx={{
				backgroundColor: '#f9f9f9',
			}}
			className="flex flex-col"
		>
			<Typography variant="h6" sx={{ marginBottom: 1, textAlign: 'center' }}>
				All Comments
			</Typography>

			{/* Display comments */}
			<div className="flex-1 overflow-y-scroll scrollbar-none min-h-[72vh] max-h-[72vh]">
				<List>
					{comments?.map((comment, index) => (
						<CommentItem key={comment?._id} comment={comment} />
					))}
				</List>
			</div>

			{/* Add Comment Input */}
			{leadId && <AddComment leadId={leadId} />}
		</Box>
	);
};

export default AllComments;
