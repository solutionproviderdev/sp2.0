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
	const formattedDate = moment(comment.date).format('DD-MMM, YYYY hh:mm A');

	return (
		<ListItem
			sx={{
				marginBottom: 1, // Add margin below each comment for separation
				alignItems: 'flex-start', // Align items to the start for better layout
			}}
		>
			<ListItemAvatar>
				{/* Display the avatar for the user who made the comment */}
				<Avatar
					alt="Profile Picture"
					src="https://example.com/profile_pic.jpg"
				/>
			</ListItemAvatar>
			<ListItemText
				primary={
					// Display the main comment text in bold with a specific color
					<Typography
						variant="body1"
						sx={{ fontWeight: 'bold', color: '#0288d1' }}
					>
						{comment.comment}
					</Typography>
				}
				secondary={
					<>
						{/* Display the formatted date below the comment */}
						<Typography
							variant="caption"
							display="block"
							sx={{ color: 'gray', marginTop: 1 }}
						>
							{formattedDate}
						</Typography>
						{/* If the comment has images, display them below the comment text */}
						{comment?.images?.length > 0 && (
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									alignItems: 'center',
									marginTop: 1,
									gap: 1, // Add gap between images for better spacing
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
											borderRadius: '4px', // Slightly round the image corners
											objectFit: 'cover', // Ensure the image covers the area without distortion
											boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for better emphasis
										}}
									/>
								))}
							</Box>
						)}
					</>
				}
			/>
		</ListItem>
	);
};

export default CommentItem;
