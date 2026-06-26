import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowedRole: string[];
};
const RoleRoute = ({ allowedRole }: Props) => {
  const { user, initializing } = useAuth();

  const storedUser = localStorage.getItem("user");
  const resolvedUser = user || (storedUser ? JSON.parse(storedUser) : null);

  if (initializing) {
    return <Loader />;
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
