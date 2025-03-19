import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default AuthLayout;
