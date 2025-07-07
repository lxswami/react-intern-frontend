import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaEnvelope, FaSignOutAlt, FaBars, FaTimes, } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const LoggingIn = !!localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to={"/dashboard"}>
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            <span className="text-green-500">M</span>y
            <span className="text-amber-500">A</span>uth
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-gray-700">
          <NavItem icon={<FaHome />} label="Home" to="/" />
          <NavItem icon={<FaInfoCircle />} label="About" to="/about" />
          <NavItem icon={<FaEnvelope />} label="Contact Us" to="/contact" />
          {LoggingIn && <NavItem icon={<FaHome />} label="Dashboard" to="/dashboard" />}
        </nav>

        {/* Auth Buttons - Desktop Only */}
        <div className="hidden md:flex items-center space-x-3">
          {LoggingIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm cursor-pointer text-white bg-red-500 font-medium rounded-full hover:bg-red-600 transition flex items-center"
            >
              <FaSignOutAlt className="mr-1" />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-blue-600 font-medium border border-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm text-white bg-blue-600 font-medium rounded-full hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger icon - Mobile Only */}
        <button
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 space-y-4 z-40">
          <NavItem icon={<FaHome />} label="Home" to="/" onClick={toggleMenu} />
          <NavItem icon={<FaInfoCircle />} label="About" to="/about" onClick={toggleMenu} />
          <NavItem icon={<FaEnvelope />} label="Contact Us" to="/contact" onClick={toggleMenu} />
          {LoggingIn && (
            <NavItem icon={<FaHome />} label="Dashboard" to="/dashboard" onClick={toggleMenu} />
          )}

          {/* Mobile Auth Buttons */}
          {LoggingIn ? (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-white bg-red-500 rounded-full hover:bg-red-600 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={toggleMenu}
                className="w-full text-center px-4 py-2 text-sm text-blue-600 font-medium border border-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="w-full text-center px-4 py-2 text-sm text-white bg-blue-600 font-medium rounded-full hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

const NavItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition"
  >
    {icon}
    {label}
  </Link>
);

export default Header;
