import GlobalLoader from "@/components/GlobalLoader";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRole: string[];
};
const RoleRoute = ({ allowedRole }: Props) => {
  const { user, initializing } = useAuth();
  const { loading } = useLoading();
  if (loading || initializing) {
    return <GlobalLoader />;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  if (!allowedRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleRoute;
