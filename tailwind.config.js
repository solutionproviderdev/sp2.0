/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				background: {
					light: '#f1f5f9', // Lighter background for light mode
					dark: '#121212', // Darker background for dark mode
				},
				surface: {
					light: '#ffffff', // White surface for light mode
					dark: '#1e1e1e', // Darker surface for dark mode
				},
				primary: {
					light: '#2563eb', // Blue primary color for light mode
					dark: '#2563eb', // Same blue primary color for dark mode
				},
				textPrimary: {
					light: '#111827', // Dark text for light mode
					dark: '#e5e7eb', // Light text for dark mode
				},
				border: {
					light: '#d1d5db', // Light border for light mode
					dark: '#374151', // Darker border for dark mode
				},
				shadow: {
					light: 'rgba(0, 0, 0, 0.1)', // Light shadow for light mode
					dark: 'rgba(0, 0, 0, 0.7)', // Darker shadow for dark mode
				},
			},
			boxShadow: {
				light:
					'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
				dark: '0 1px 3px 0 rgba(0, 0, 0, 0.7), 0 1px 2px -1px rgba(0, 0, 0, 0.7)',
			},
			borderRadius: {
				small: '0.375rem',
				default: '0.5rem',
				full: '9999px',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
