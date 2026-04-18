import GlobalLoader from "@/components/GlobalLoader";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import React from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, initializing } = useAuth();
  const { loading } = useLoading();
  if (loading || initializing) {
    return <GlobalLoader />;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
