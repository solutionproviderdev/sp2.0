import React from 'react';
import { Box, Button } from '@mui/material';

interface FollowUpButtonsProps {
	onStop: () => void;
	onDone: () => void;
}

const FollowUpButtons: React.FC<FollowUpButtonsProps> = ({
	onStop,
	onDone,
}) => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
			<Button
				variant="contained"
				onClick={onStop}
				sx={{
					backgroundColor: 'red',
					color: 'white',
					fontSize: '1.5rem',
					padding: '16px 32px',
					'&:hover': {
						backgroundColor: 'darkred',
					},
				}}
			>
				Stop
			</Button>
			<Button
				variant="contained"
				onClick={onDone}
				sx={{
					backgroundColor: 'green',
					color: 'white',
					fontSize: '1.5rem',
					padding: '16px 32px',
					'&:hover': {
						backgroundColor: 'darkgreen',
					},
				}}
			>
				Done
			</Button>
		</Box>
	);
};

export default FollowUpButtons;
