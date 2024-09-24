import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Image({ src, alt, className }) {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleImageClick = () => {
		setIsFullScreen(true);
	};

	const handleClose = () => {
		setIsFullScreen(false);
	};

	return (
		<>
			<img
				src={src}
				alt={alt}
				onClick={handleImageClick}
				className={`cursor-pointer object-cover ${className}`}
				style={{
					transition: 'transform 0.2s',
					transform: isFullScreen ? 'scale(1.05)' : 'scale(1)',
				}} // Simple hover scale effect
			/>

			{/* MUI Modal for fullscreen image */}
			<Modal
				open={isFullScreen}
				onClose={handleClose}
				aria-labelledby="modal-image"
				aria-describedby="modal-image-fullscreen"
				className="flex items-center justify-center"
			>
				<div className='w-auto h-[90dvh] flex items-center justify-center'>
					{/* Displaying the image */}
					<img
						src={src}
						alt={alt}
						className="object-cover rounded-md h-full w-auto"
					/>
				</div>
			</Modal>
		</>
	);
}

export default Image;
