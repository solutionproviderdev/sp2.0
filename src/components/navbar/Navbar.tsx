import React from "react";
import logo from "../../images/logoWhite.png";
import {
  FaHome,
  FaRegStar,
  FaShareAlt,
  FaFolderOpen,
  FaTags,
  FaExternalLinkAlt,
  FaTrashAlt,
  FaCogs,
  FaBell,
  FaSearch,
  FaUserCircle,
  FaRocketchat,
  FaUsers,
} from "react-icons/fa";
import NavItem from "./NavItem";
import ProgressBar from "./ProhressBar";

const Navbar: React.FC = () => {
  return (
		<div className="bg-blue-600 text-white h-16 flex items-center justify-between px-4">
			<div className="flex items-center space-x-4">
				<img src={logo} alt="Logo" className="w-40 h-auto object-cover" />
				<NavItem to="dashboard" icon={<FaHome />} />
				<NavItem to="lead-center" icon={<FaRocketchat />} />
				<NavItem to="lead-management" icon={<FaUsers />} />
				{/* <NavItem to="" icon={<FaShareAlt />} />
				<NavItem to="" icon={<FaFolderOpen />} />
				<NavItem to="" icon={<FaTags />} />
				<NavItem to="" icon={<FaExternalLinkAlt />} />
				<NavItem to="" icon={<FaTrashAlt />} />
				<NavItem to="" icon={<FaCogs />} /> */}
			</div>
			<div className="flex items-center space-x-4">
				<ProgressBar progress={72} />
				<NavItem to="" icon={<FaSearch />} />
				<NavItem to="" icon={<FaBell />} />
				<NavItem to="" icon={<FaUserCircle />} />
			</div>
		</div>
	);
};

export default Navbar;
