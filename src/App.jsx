import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import PrivateRoute from "./Pages/PrivateRoute ";


// Lazy load pages
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const Contact = lazy(() => import("./Pages/Contact"));
const UsersTable = lazy(() => import("./Pages/userTable"));
const UserFullDetails = lazy(() => import("./Pages/UserFullDetail"));

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Save last visited route when going offline
  useEffect(() => {
    if (!isOnline) {
      localStorage.setItem("lastVisitedPath", location.pathname);
    }
  }, [isOnline, location.pathname]);

  // Redirect to last visited path when back online
  useEffect(() => {
    if (isOnline) {
      const last = localStorage.getItem("lastVisitedPath");
      if (last && last !== location.pathname) {
        navigate(last);
        localStorage.removeItem("lastVisitedPath");
      }
    }
  }, [isOnline]);

  // If offline, show full-page message
  if (!isOnline) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4 bg-white">
        <h1 className="text-3xl font-bold text-red-600 mb-4">🚫 You are offline</h1>
        <p className="text-gray-700 text-lg">Check your internet connection to continue using the app.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid">
          Loading...
        </div>
      </div>
    }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersTable />} />
          <Route path="/users/:id" element={<UserFullDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
