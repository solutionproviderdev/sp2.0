import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LoggedOutRoute: React.FC = () => {
  const auth = useAuth();
  return !auth ? <Outlet /> : <Navigate to="/admin/dashboard" />;
};

export default LoggedOutRoute;
