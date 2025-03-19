import { useAuth } from "@/hooks/useAuth";
import Navbar from "../shared/Navbar";
import { Navigate, Outlet } from "react-router";

const UserLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
