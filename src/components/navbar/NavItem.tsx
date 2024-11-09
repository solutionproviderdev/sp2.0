import React from 'react';
import { Link } from 'react-router-dom';

const NavItem: React.FC<{ icon: React.ReactNode; to: string; active?: boolean; disabled?: boolean }> = ({
	icon,
	to,
	active,
	disabled,
}) => {


	return (
		<div
			className={`text-lg cursor-pointer p-2 rounded-full ${
				active ? 'bg-blue-700 text-white' : 'hover:bg-blue-500 text-white'
			}`}
		>
			{disabled ? (
				<div className="flex items-center justify-center">
					<div className="w-4 h-4 rounded-full bg-gray-300"></div>
				</div>
			) : (
				<Link to={to}>{icon}</Link>
			)}
		</div>
	);
};

export default NavItem;
