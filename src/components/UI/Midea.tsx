import { useState, useRef } from 'react';
import { Modal, IconButton } from '@mui/material';
import { getFileTypeFromURL } from '../../hooks/getFileTypeFromURL';
import { FaPlay, FaPause } from 'react-icons/fa';

function Media({ src, alt, className }) {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const mediaRef = useRef(null);

	const fileType = getFileTypeFromURL(src);

	const handleMediaClick = () => {
		if (fileType === 'image') {
			setIsFullScreen(true);
		}
	};

	const handleClose = () => {
		setIsFullScreen(false);
	};

	const togglePlayPause = () => {
		if (fileType === 'video' || fileType === 'audio') {
			if (isPlaying) {
				mediaRef.current.pause();
			} else {
				mediaRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<>
			{fileType === 'image' && (
				<img
					src={src}
					alt={alt}
					onClick={handleMediaClick}
					className={`cursor-pointer object-cover ${className}`}
					style={{
						transition: 'transform 0.2s',
						transform: isFullScreen ? 'scale(1.05)' : 'scale(1)',
					}}
				/>
			)}

			{fileType === 'video' && (
				<div className="relative">
					<video
						src={src}
						ref={mediaRef}
						className={`object-cover ${className}`}
						controls={false}
					/>
					<IconButton
						onClick={togglePlayPause}
						className="absolute top-2 left-2 bg-white p-1 rounded-full"
					>
						{isPlaying ? <FaPause /> : <FaPlay />}
					</IconButton>
				</div>
			)}

			{fileType === 'audio' && (
				<div className="flex items-center space-x-2">
					<audio ref={mediaRef} src={src} className="hidden" />
					<IconButton
						onClick={togglePlayPause}
						className="bg-white p-2 rounded-full"
					>
						{isPlaying ? <FaPause /> : <FaPlay />}
					</IconButton>
					<span>{alt}</span>
				</div>
			)}

			{/* MUI Modal for fullscreen image */}
			{fileType === 'image' && (
				<Modal
					open={isFullScreen}
					onClose={handleClose}
					aria-labelledby="modal-image"
					aria-describedby="modal-image-fullscreen"
					className="flex items-center justify-center"
				>
					<div className="w-auto h-[90dvh] flex items-center justify-center">
						<img
							src={src}
							alt={alt}
							className="object-cover rounded-md h-full w-auto"
						/>
					</div>
				</Modal>
			)}
		</>
	);
}

export default Media;
