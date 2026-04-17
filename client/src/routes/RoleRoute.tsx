import GlobalLoader from "@/components/GlobalLoader";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRole: string[];
};
const RoleRoute = ({ allowedRole }: Props) => {
  const { user } = useAuth();
  const { loading } = useLoading();
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (loading) {
    return <GlobalLoader />;
  }

  if (!allowedRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleRoute;
