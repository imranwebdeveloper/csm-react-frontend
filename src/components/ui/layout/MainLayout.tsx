import { Outlet } from "react-router";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
