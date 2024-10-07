import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

const AdminLayout: React.FC = () => {
	return (
		<div className="h-screen overflow-y-scroll scrollbar-thin">
			{/* Admin navigation */}
			<Navbar className="fixed top-0 z-50 w-full" />
			{/* Main content area */}
			<div className="mt-16 scrollbar-none">
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
