import React from 'react';
import logo from '../../images/logoWhite.png';
import {
	FaHome,
	FaRocketchat,
	FaUsers,
	FaRegClock,
	FaSearch,
	FaBell,
	FaUserCircle,
} from 'react-icons/fa';
import NavItem from './NavItem';
import ProgressBar from './ProhressBar';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
	className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
	const location = useLocation();

	return (
		<div
			className={`${className} bg-blue-600 text-white h-16 flex items-center justify-between px-4`}
		>
			<div className="flex items-center space-x-4">
				<img src={logo} alt="Logo" className="w-40 h-auto object-cover" />
				<NavItem
					to="dashboard"
					active={location.pathname.includes('dashboard')}
					icon={<FaHome />}
				/>
				<NavItem
					to="lead-center"
					active={location.pathname.includes('lead-center')}
					icon={<FaRocketchat />}
				/>
				<NavItem
					to="lead-management"
					active={location.pathname.includes('lead-management')}
					icon={<FaUsers />}
				/>
				<NavItem
					to="lead-followUp"
					active={location.pathname.includes('lead-followUp')}
					icon={<FaRegClock />}
				/>
			</div>
			<div className="flex items-center space-x-4">
				<ProgressBar progress={72} />
				<NavItem to="search" icon={<FaSearch />} />
				<NavItem to="notifications" icon={<FaBell />} />
				<NavItem to="profile" icon={<FaUserCircle />} />
			</div>
		</div>
	);
};

export default Navbar;
