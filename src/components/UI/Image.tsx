import { useState } from 'react';
import { Modal } from '@mui/material';
import ReactPlayer from 'react-player'; // Import React Player
import { getFileTypeFromURL } from '../../hooks/getFileTypeFromURL';

function Image({
	src,
	alt,
	className,
}: {
	src: string;
	alt: string;
	className?: string;
}) {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const fileType = getFileTypeFromURL(src);

	const handleMediaClick = () => {
		if (fileType === 'video' || fileType === 'audio') {
			setIsPlaying(!isPlaying);
		} else {
			setIsFullScreen(true);
		}
	};

	const handleClose = () => {
		setIsFullScreen(false);
		setIsPlaying(false);
	};

	const renderMedia = () => {
		switch (fileType) {
			case 'image':
				return (
					<img
						src={src}
						alt={alt}
						onClick={handleMediaClick}
						className={`cursor-pointer object-cover ${className} w-1/5`}
						style={{
							transition: 'transform 0.2s',
							transform: isFullScreen ? 'scale(1.05)' : 'scale(1)',
						}}
					/>
				);
			case 'video':
				return (
					<div className="relative w-1/5">
						<ReactPlayer
							url={src}
							playing={isPlaying}
							controls={true} // Show default controls
							width="100%"
							height="100%"
							onClick={handleMediaClick}
							className={`cursor-pointer object-cover ${className}`}
						/>
					</div>
				);
			case 'audio':
				return (
					<div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md w-1/5">
						<ReactPlayer
							url={src}
							playing={isPlaying}
							controls={true} // Show default controls
							width="100%"
							height="40px"
							onClick={handleMediaClick}
							className="cursor-pointer"
						/>
					</div>
				);
			default:
				return <p>Unsupported file type</p>;
		}
	};

	return (
		<>
			{renderMedia()}

			{/* MUI Modal for fullscreen media */}
			<Modal
				open={isFullScreen}
				onClose={handleClose}
				aria-labelledby="modal-media"
				aria-describedby="modal-media-fullscreen"
				className="flex items-center justify-center"
			>
				<div className="w-auto h-[90dvh] flex items-center justify-center">
					{fileType === 'image' && (
						<img
							src={src}
							alt={alt}
							className="object-cover rounded-md h-full w-auto"
						/>
					)}
					{fileType === 'video' && (
						<ReactPlayer
							url={src}
							playing={isPlaying}
							controls={true}
							width="100%"
							height="100%"
							className="object-cover rounded-md h-full w-auto"
						/>
					)}
					{fileType === 'audio' && (
						<ReactPlayer
							url={src}
							playing={isPlaying}
							controls={true}
							width="100%"
							height="40px"
							className="w-full"
						/>
					)}
				</div>
			</Modal>
		</>
	);
}

export default Image;
