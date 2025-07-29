import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  LogIn,
  Home,
  Info,
  BookText,
  Eye,
  ChevronDown,
} from "lucide-react";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const navLinkClass = (path) =>
    `flex items-center gap-1 px-2 py-1 rounded hover:text-blue-600 ${
      location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700"
    }`;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Predictive<span className="text-gray-800">Maintenance</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className={navLinkClass("/")}>
            <Home size={18} /> Home
          </Link>
          <Link to="/about" className={navLinkClass("/about")}>
            <Info size={18} /> About
          </Link>
          <Link to="/manual-input" className={navLinkClass("/manual-input")}>
            <BookText size={18} /> Manual Input
          </Link>
          <Link to="/insights" className={navLinkClass("/insights")}>
            <Eye size={18} /> Insights
          </Link>
          

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:text-blue-600 text-gray-700"
              >
                <User size={18} />
                {user.displayName || user.email.split("@")[0]}
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-md py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4 space-y-2 text-gray-700">
          <Link to="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>
            <Home size={18} /> Home
          </Link>
          <Link to="/about" className={navLinkClass("/about")} onClick={() => setMenuOpen(false)}>
            <Info size={18} /> About
          </Link>
          <Link to="/manual-input" className={navLinkClass("/manual-input")} onClick={() => setMenuOpen(false)}>
            <BookText size={18} /> Manual Input
          </Link>
          <Link to="/insights" className={navLinkClass("/insights")} onClick={() => setMenuOpen(false)}>
            <Eye size={18} /> Insights
          </Link>
          

          {user ? (
            <>
              <Link to="/profile" className={navLinkClass("/profile")} onClick={() => setMenuOpen(false)}>
                <User size={18} /> Profile
              </Link>
              <Link to="/settings" className={navLinkClass("/settings")} onClick={() => setMenuOpen(false)}>
                <Settings size={18} /> Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
