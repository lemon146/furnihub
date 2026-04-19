import GlobalLoader from "@/components/GlobalLoader";
import { useAuth } from "@/context/AuthContext";
import { useLoading } from "@/context/LoadingContext";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
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

  return <Outlet />;
};
export default ProtectedRoute;
