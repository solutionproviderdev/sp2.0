import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const AdminLayout: React.FC = () => {
  return (
		<div className="h-screen overflow-hidden">
			{/* Admin navigation */}
			<Navbar />
			<Outlet />
		</div>
	);
};

export default AdminLayout;
