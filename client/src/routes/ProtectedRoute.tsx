import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user, initializing } = useAuth();

  const storedUser = localStorage.getItem("user");
  const resolvedUser = user || (storedUser ? JSON.parse(storedUser) : null);

  if (initializing) {
    return <Loader />;
  }

  if (!resolvedUser) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
