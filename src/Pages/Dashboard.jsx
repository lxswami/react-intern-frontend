import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("username") || "User";
    const email = localStorage.getItem("email") || "User_email";
    setUsername(name);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-50 bg-white shadow-lg w-64 p-4 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <div className="text-2xl font-bold text-blue-600">MyDashboard</div>
          <button onClick={toggleSidebar}>
            <FaTimes className="text-xl text-gray-700" />
          </button>
        </div>
        <div className="hidden md:block text-2xl font-bold text-blue-600 mb-8">
          MyDashboard
        </div>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/users")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 transition"
          >
            <FaUser className="text-xl" />
            <span className="text-sm font-medium">Users</span>
          </button>
          <SidebarItem icon={<FaChartBar />} label="Analytics" />
          <SidebarItem icon={<FaCog />} label="Settings" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 transition"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        {/* Top navbar */}
        <header className="flex items-center justify-between p-4 md:p-6 bg-white shadow-sm">
          <div className="md:hidden">
            <button onClick={toggleSidebar}>
              <FaBars className="text-2xl text-gray-700" />
            </button>
          </div>
          <h1 className="text-xl md:text-3xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <div className="bg-white p-2 px-4 rounded-full shadow cursor-pointer">
            <span className="relative group flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaUser className="text-xl text-gray-500" />
              <div>
                <span className="text-[18px] font-bold text-green-600">Hi,</span>{" "}
                {username}
                <span className="absolute top-[-30px] right-10 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {userEmail}
                </span>
              </div>
            </span>
          </div>
        </header>

        {/* Content body */}
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
            <div className="bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
              <img
                className="rounded-lg object-cover w-full h-60 sm:h-80"
                src="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Analytics"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }) => (
  <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 text-gray-700 transition">
    <span className="text-xl">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default Dashboard;
