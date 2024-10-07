import React from 'react';
import { Link } from 'react-router-dom';

const NavItem: React.FC<{ icon: React.ReactNode; to: string; active?: boolean }> = ({
	icon,
	to,
	active,
}) => {


	return (
		<div
			className={`text-lg cursor-pointer p-2 rounded-full ${
				active ? 'bg-blue-700 text-white' : 'hover:bg-blue-500 text-white'
			}`}
		>
			<Link to={to}>{icon}</Link>
		</div>
	);
};

export default NavItem;
