import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <Outlet />
    </div>
  );
};

export default LoginLayout;
