import React from "react";
import { Link } from "react-router-dom";

const NavItem: React.FC<{ icon: React.ReactNode; to: string }> = ({
  icon,
  to,
}) => {
  return (
    <div className="text-lg cursor-pointer hover:bg-blue-500 p-2 rounded-full">
      <Link to={`${to}`}>{icon}</Link>
    </div>
  );
};

export default NavItem;
