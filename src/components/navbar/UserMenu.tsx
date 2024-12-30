import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

export default function UserMenu() {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const { user } = useSelector((state: any) => state.auth);
	const dispatch = useDispatch();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		dispatch(logoutUser());
		console.log('Logged out!'); // Replace with your logout logic
		handleClose();
	};

	return (
		<div>
			{/* Icon Button */}
			<IconButton
				id="basic-button"
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				className="text-lg cursor-pointer p-2 rounded-full hover:bg-blue-500 text-white"
			>
				<FaRegUserCircle size={20} className="text-white" />
			</IconButton>

			{/* Dropdown Menu */}
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				className="text-white"
			>
				<MenuItem
					onClick={() => {
						handleClose();
						navigate(`users/${user._id}`);
					}}
					className="hover:bg-blue-500 text-black px-4 py-2 flex items-center gap-2"
				>
					<FaUser size={16} /> Profile
				</MenuItem>

				{user.type === 'Admin' && (
					<MenuItem
						onClick={() => {
							handleClose();
							navigate('settings/profile');
						}}
						className="hover:bg-blue-500 text-black px-4 py-2 flex items-center gap-2"
					>
						<FaCog size={16} /> My Account
					</MenuItem>
				)}

				<MenuItem
					onClick={handleLogout}
					className="hover:bg-blue-500 text-black px-4 py-2 flex items-center gap-2"
				>
					<FaSignOutAlt size={16} /> Logout
				</MenuItem>
			</Menu>
		</div>
	);
}
