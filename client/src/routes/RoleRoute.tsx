import GlobalLoader from "@/components/GlobalLoader";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

type Props = {
  allowedRole: string[];
};
const RoleRoute = ({ allowedRole }: Props) => {
  const { user, initializing } = useAuth();
  const { loading } = useLoading();

  const storedUser = localStorage.getItem("user");
  const resolvedUser = user || (storedUser ? JSON.parse(storedUser) : null);

  if (loading || initializing) {
    return <GlobalLoader />;
  }

  if (!resolvedUser) {
    return <Navigate to="/login" />;
  }

  if (!allowedRole.includes(resolvedUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
