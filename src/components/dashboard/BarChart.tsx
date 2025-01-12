import React from 'react';

interface DatasetItem {
	label: string;
	value: number;
}

interface CustomBarChartProps {
	dataset: DatasetItem[];
	barColor: string;
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({
	dataset,
	barColor,
}) => {
	const width = 400;
	const height = 250;
	const margin = { top: 30, right: 20, bottom: 30, left: 40 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const maxValue = Math.max(...dataset.map(item => item.value));
	const gridInterval = maxValue / 5;
	const barWidth = (innerWidth - 20) / dataset.length; // Adjust spacing

	return (
		<svg width={width} height={height}>
			{/* Grid Lines */}
			{Array.from({ length: 5 }, (_, i) => (
				<line
					key={i}
					x1={margin.left}
					y1={height - margin.bottom - i * (innerHeight / 5)}
					x2={width - margin.right}
					y2={height - margin.bottom - i * (innerHeight / 5)}
					stroke="#ddd"
				/>
			))}

			{/* Grid Line Labels */}
			{Array.from({ length: 5 }, (_, i) => (
				<text
					key={i}
					x={margin.left - 10}
					y={height - margin.bottom - i * (innerHeight / 5)}
					textAnchor="end"
					fill="#555"
					fontSize="10"
				>
					{(i + 1) * gridInterval}.0
				</text>
			))}

			{/* Y-axis line */}
			<line
				x1={margin.left}
				y1={margin.top}
				x2={margin.left}
				y2={height - margin.bottom}
				stroke="#ccc"
			/>

			{/* Bars */}
			{dataset.map((item, index) => (
				<g
					key={index}
					transform={`translate(${margin.left + index * (barWidth + 10)}, ${
						height - margin.bottom
					})`}
				>
					<rect
						width={barWidth}
						height={(item.value / maxValue) * innerHeight}
						fill={barColor}
						rx={3}
						ry={3}
						stroke="#fff"
						strokeWidth={1}
						style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))' }}
					/>
					<text
						x={barWidth / 2}
						y={-(item.value / maxValue) * innerHeight - 5}
						textAnchor="middle"
						fill="#555"
						fontSize="10"
					>
						{item.value.toFixed(1)}
					</text>
				</g>
			))}

			{/* X-axis Labels */}
			{dataset.map((item, index) => (
				<text
					key={index}
					x={margin.left + index * (barWidth + 10) + barWidth / 2}
					y={height - margin.bottom + 20}
					textAnchor="middle"
					fill="#555"
					fontSize="10"
				>
					{item.label}
				</text>
			))}

			{/* Axis Title */}
			<text
				x={margin.left / 2 - 10}
				y={innerHeight / 2}
				transform="rotate(-90)"
				textAnchor="middle"
				fill="#555"
				fontSize="12"
			>
				Visitors
			</text>

			{/* Chart Title */}
			<text
				x={width / 2}
				y={margin.top / 2}
				textAnchor="middle"
				fill="#555"
				fontSize="14"
			>
				Browser Usage
			</text>
		</svg>
	);
};

export default CustomBarChart;
