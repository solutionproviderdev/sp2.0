import React from 'react';
import { Box, Typography } from '@mui/material';

interface ProgressBarProps {
	label: string;
	value: number;
	base: number;
	showPercentage?: boolean;
	fullHeight?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
	label,
	value,
	base,
	showPercentage = false,
	fullHeight = false,
}) => {
	const getHeight = (value / base) * 100;

	return (
		<div className="flex flex-col items-center w-16 mx-1 h-full">
			<div
				className={`${
					fullHeight ? 'h-32' : 'h-20'
				} w-3 bg-gray-300 rounded-md overflow-hidden flex flex-col-reverse`}
			>
				<div
					style={{ height: `${getHeight}%` }}
					className="bg-blue-600 w-full rounded-md"
				></div>
			</div>
			<Typography variant="caption" className="text-center mt-1 text-gray-500">
				{label}
			</Typography>
			{showPercentage && (
				<Typography variant="caption" color="textSecondary">
					{Math.round(getHeight)}%
				</Typography>
			)}
		</div>
	);
};

export default ProgressBar;
