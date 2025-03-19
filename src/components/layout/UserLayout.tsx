import Navbar from "../shared/Navbar";
import { Outlet } from "react-router";

const UserLayout = () => {
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
