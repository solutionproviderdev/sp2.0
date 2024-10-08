import { Modal, Box, Typography } from '@mui/material';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface CongratulationsModalProps {
	open: boolean;
}

export default function CongratulationsModal({
	open,
}: CongratulationsModalProps) {
	const { width, height } = useWindowSize(); // For full-screen confetti

	return (
		<>
			{open && <Confetti width={width} height={height} />}
			<Modal open={open}>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						borderRadius: 2,
						boxShadow: 24,
						p: 4,
						textAlign: 'center',
					}}
				>
					{/* Confetti animation */}
					<Typography variant="h4" color="primary" sx={{ mb: 2 }}>
						🎉 Congratulations! 🎉
					</Typography>
					<Typography variant="body1" color="secondary">
						You have completed all your follow-ups!
					</Typography>
				</Box>
			</Modal>
		</>
	);
}
