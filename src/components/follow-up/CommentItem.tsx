import React from 'react';
import {
	Box,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
} from '@mui/material';
import { Comment } from '../../features/conversation/conversationApi';
import moment from 'moment';

interface CommentItemProps {
	comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	// Format the comment date using moment for better readability
	const formattedDate = moment(comment.date).fromNow();

	return (
		<ListItem
			sx={{
				p: 1, // Add padding for better spacing
				mb: 1, // Add margin below each comment for separation
				alignItems: 'flex-start', // Align items to the start for better layout
			}}
		>
			<ListItemAvatar>
				{/* Display the avatar for the user who made the comment */}
				<Avatar
					alt={comment.commentBy.nameAsPerNID}
					src={comment.commentBy.profilePicture}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						{/* Display the main comment text in bold */}
						<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
							{comment.comment}
						</Typography>
						{/* Display the formatted date next to the comment */}
						<Typography variant="caption" sx={{ color: 'gray', ml: 2 }}>
							{formattedDate}
						</Typography>
					</Box>
				}
				secondary={
					comment?.images?.length > 0 && (
						<Box
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
								mt: 1, // Add margin top for spacing
							}}
						>
							{comment.images.map((image, i) => (
								<img
									key={i}
									src={image}
									alt={`Image ${i + 1}`}
									style={{
										width: '50px',
										height: '50px',
										marginRight: '5px', // Add margin between images
										borderRadius: '4px', // Slightly round the image corners
										objectFit: 'cover', // Ensure the image covers the area without distortion
									}}
								/>
							))}
						</Box>
					)
				}
				sx={{ mt: 1 }} // Add margin top for spacing
			/>
		</ListItem>
	);
};

export default CommentItem;
