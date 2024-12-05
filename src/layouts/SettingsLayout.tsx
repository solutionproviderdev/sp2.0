import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const SettingsNavItem: React.FC<{
	to: string;
	label: string;
	active: boolean;
}> = ({ to, label, active }) => {
	return (
		<Link
			to={to}
			className={`block p-3 text-sm rounded-md transition-colors duration-200 ${
				active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
			}`}
		>
			{label}
		</Link>
	);
};

const SettingsLayout: React.FC = () => {
	const location = useLocation();

	return (
		<div className="flex max-h-[calc(100vh-64px)]">
			{/* Sidebar */}
			<div
				className="bg-white shadow-lg text-gray-700 p-4 h-[calc(100vh-64px)]"
				style={{
					width: '240px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
				}}
			>
				{/* Navigation Items */}
				<h3 className="text-lg font-semibold mb-4">Settings</h3>
				<div className="space-y-2">
					<SettingsNavItem
						to="profile"
						active={location.pathname.includes('/settings/profile')}
						label="Profile Settings"
					/>
					<SettingsNavItem
						to="lead-settings"
						active={location.pathname.includes('/settings/lead-settings')}
						label="Lead Settings"
					/>
					<SettingsNavItem
						to="facebook"
						active={location.pathname.includes('/settings/facebook')}
						label="Facebook Settings"
					/>
				</div>
			</div>
            
			{/* Main Content */}
			<div className="flex-1 overflow-y-auto p-4 bg-gray-50">
				<Outlet />
			</div>
		</div>
	);
};

export default SettingsLayout;
