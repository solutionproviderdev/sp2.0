import React from 'react';
import { FaHome, FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { Outlet, Link, useLocation } from 'react-router-dom';

// NavItem component defined within this file
const NavItem: React.FC<{
	to: string;
	icon: React.ReactNode;
	label: string;
	active: boolean;
}> = ({ to, icon, label, active }) => {
	return (
		<Link
			to={to}
			className={`flex items-center p-3 text-sm rounded-md transition-colors duration-200 hover:bg-blue-200 ${
				active ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
			}`}
		>
			{icon}
			<span className="ml-4">{label}</span>
		</Link>
	);
};

const Navbar: React.FC = () => {
	const location = useLocation();

	return (
		<div className="flex overflow-hidden max-h-[calc(100vh-64px)]">
			{/* Sidebar */}
			<div
				className="bg-white shadow-lg text-gray-700 p-4 h-[calc(100vh-64px)]"
				style={{
					width: '240px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				{/* Logo */}
				<div className="space-y-2">
					{/* Navigation Items */}
					<NavItem
						to="all-users"
						active={location.pathname.includes('/dashboard')}
						icon={<FaHome />}
						label="All Users"
					/>
				</div>

				{/* Progress Bar and Footer Icons */}
				<div className="flex flex-col items-start space-y-2">
					<NavItem
						to="/search"
						active={location.pathname.includes('/search')}
						icon={<FaSearch />}
						label="Search"
					/>
					<NavItem
						to="/notifications"
						active={location.pathname.includes('/notifications')}
						icon={<FaBell />}
						label="Notifications"
					/>
					<NavItem
						to="/profile"
						active={location.pathname.includes('/profile')}
						icon={<FaUserCircle />}
						label="Profile"
					/>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-y-scroll scrollbar-none">
				<Outlet />
			</div>
		</div>
	);
};

export default Navbar;
