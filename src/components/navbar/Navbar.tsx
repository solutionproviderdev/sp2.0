import React, { useEffect } from 'react';
import logo from '../../images/logoWhite.png';
import {
	FaHome,
	FaRocketchat,
	FaUsers,
	FaRegClock,
	FaSearch,
	FaBell,
} from 'react-icons/fa';
import NavItem from './NavItem';
import ProgressBar from './ProhressBar';
import { useLocation } from 'react-router-dom';
// import { FaUsersLine } from 'react-icons/fa6';
import { GrSchedule } from 'react-icons/gr';
import { FaCheckToSlot, FaUsersLine } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';
import useGetPerformance from '../../hooks/useGetPerformance';

interface NavbarProps {
	className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
	const location = useLocation();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { user } = useSelector((state: any) => state.auth);

	// const { overallPerformancePercentage } = useGetPerformance();

	return (
		<div
			className={`${className} bg-blue-600 text-white h-16 flex items-center justify-between px-4`}
		>
			<div className="flex items-center h-16 space-x-4 ">
				<img src={logo} alt="Logo" className="w-40 h-full object-cover" />
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

				{user.type === 'Admin' && (
					<NavItem
						to="lead-management"
						active={location.pathname.includes('lead-management')}
						icon={<FaUsers />}
					/>
				)}
				{user.type === 'Admin' && (
					<NavItem
						to="users"
						active={location.pathname.includes('users')}
						icon={<FaUsersLine />}
					/>
				)}

				<NavItem
					to="lead-followUp"
					active={location.pathname.includes('lead-followUp')}
					icon={<FaRegClock />}
				/>
				{/* <NavItem
					to="meetings"
					active={location.pathname.includes('meetings')}
					icon={<GrSchedule />}
				/> */}
				<NavItem
					to="meeting-slot"
					active={location.pathname.includes('meeting-slot')}
					icon={<FaCheckToSlot />}
				/>
			</div>
			<div className="flex items-center space-x-4">
				{/* <ProgressBar progress={overallPerformancePercentage} /> */}
				<NavItem disabled to="search" icon={<FaSearch />} />
				<NavItem disabled to="notifications" icon={<FaBell />} />
				<UserMenu />
				{/* <NavItem to={`users/${user._id}`} icon={<FaUserCircle />} /> */}
			</div>
		</div>
	);
};

export default Navbar;
