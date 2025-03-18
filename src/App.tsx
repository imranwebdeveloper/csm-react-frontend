import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import QueryProvider from "./context/QueryClientProvider";
import MainLayout from "./components/ui/layout/MainLayout";
import AuthLayout from "./components/ui/layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import UserDetails from "./pages/UserDetails";

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

            {/* <Route path="about" element={<About />} />

      

        <Route path="concerts">
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} />
        </Route> */}
          </Routes>
        </AuthProvider>
      </QueryProvider>
    </>
  );
}

export default App;
