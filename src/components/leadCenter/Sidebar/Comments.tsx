import React, { useState } from 'react';
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	TextField,
	IconButton,
	InputAdornment,
	Button,
	styled,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ClearIcon from '@mui/icons-material/Clear';
import moment from 'moment';
import {
	useAddCommentMutation,
	useGetCommentsQuery,
} from '../../../features/conversation/conversationApi';

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

const Comments = ({ leadId }) => {
	const [addComment] = useAddCommentMutation();
	const { data: allComments, isLoading } = useGetCommentsQuery(leadId);

	const [newComment, setNewComment] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [showFileIndicator, setShowFileIndicator] = useState(false);
	const [showAllComments, setShowAllComments] = useState(false);

	const commentHandler = () => {
		if (newComment.trim() !== '') {
			const newCommentObj = {
				comment: newComment,
				images: selectedFile ? [selectedFile.name] : [],
				date: new Date().toISOString(),
			};
			addComment({ id: leadId, comment: newCommentObj });
			setNewComment('');
			setSelectedFile(null);
			setShowFileIndicator(false);
		}
	};

	const handleFileChange = e => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedFile(e.target.files[0]);
			setShowFileIndicator(true);
		}
	};

	const handleFileDeselect = () => {
		setSelectedFile(null);
		setShowFileIndicator(false);
	};

	return (
		<Box sx={{ p: 2 }}>
			<Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
				Comments
			</Typography>

			{isLoading ? (
				<Typography variant="body2">Loading comments...</Typography>
			) : (
				<List>
					{(showAllComments
						? allComments?.comments
						: allComments?.comments.slice(0, 1)
					).map((comment, index) => (
						<ListItem key={index} sx={{ p: 1, mb: 1 }}>
							<ListItemAvatar>
								<Avatar
									alt={comment.commentBy.nameAsPerNID}
									src={comment.commentBy.profilePicture}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									<Box
										sx={{ display: 'flex', justifyContent: 'space-between' }}
									>
										<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
											{comment.comment}
										</Typography>
										<Typography variant="caption" sx={{ color: 'gray', ml: 2 }}>
											{moment(comment.date).fromNow()}
										</Typography>
									</Box>
								}
								secondary={
									comment?.images?.length > 0 && (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
											{comment.images.map((image, i) => (
												<img
													key={i}
													src={image}
													alt={`Image ${i + 1}`}
													style={{
														width: '50px',
														height: '50px',
														marginRight: '5px',
													}}
												/>
											))}
										</Box>
									)
								}
							/>
						</ListItem>
					))}
				</List>
			)}

			{allComments?.comments.length > 1 && (
				<Box sx={{ mt: 1, textAlign: 'right' }}>
					<Button
						variant="text"
						onClick={() => setShowAllComments(!showAllComments)}
						sx={{ color: '#0288d1' }}
					>
						{showAllComments ? 'Show Less' : 'Show All'}
					</Button>
				</Box>
			)}

			<Box sx={{ mt: 2 }}>
				<TextField
					label="Add a comment"
					value={newComment}
					onChange={e => setNewComment(e.target.value)}
					fullWidth
					multiline
					rows={3}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={commentHandler} color="primary">
									<SendIcon />
								</IconButton>
							</InputAdornment>
						),
						startAdornment: (
							<InputAdornment position="start">
								<IconButton component="label">
									<VisuallyHiddenInput
										type="file"
										onChange={handleFileChange}
									/>
									<AttachFileIcon
										sx={{ color: selectedFile ? '#0288d1' : '#999' }}
									/>
									{showFileIndicator && (
										<ClearIcon
											sx={{ color: '#999', ml: 0.5 }}
											onClick={handleFileDeselect}
										/>
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Box>
		</Box>
	);
};

export default Comments;
