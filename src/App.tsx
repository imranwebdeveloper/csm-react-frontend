import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import QueryProvider from "./context/QueryClientProvider";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import UserDetails from "./pages/UserDetails";
import UserLayout from "./components/layout/UserLayout";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <ToastContainer />
      <QueryProvider>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/users/:id" element={<UserDetails />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route element={<UserLayout />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryProvider>
    </>
  );
}

export default App;
