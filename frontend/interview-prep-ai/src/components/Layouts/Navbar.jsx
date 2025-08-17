import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import ProfileInfoCard from "../Cards/ProfileInfoCard";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 xl:px-20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-start text-center sm:text-left cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black">
            Brain
          </h1>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600">
            Boost
          </h1>
          <span className="text-black font-bold text-lg -mb-3">AI</span>
        </div>

        {/* Center Navigation */}
        <nav className="flex items-center justify-center gap-6 text-lg font-semibold mt-2 sm:mt-0">
          <button
            onClick={() => navigate("/")}
            className={`relative transition-colors duration-300 after:content-[''] after:block after:w-full after:h-[2px] after:bg-cyan-600 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
              isActive("/")
                ? "text-cyan-600 after:scale-x-100"
                : "text-gray-700 after:scale-x-0"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`relative transition-colors duration-300 after:content-[''] after:block after:w-full after:h-[2px] after:bg-cyan-600 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
              isActive("/dashboard")
                ? "text-cyan-600 after:scale-x-100"
                : "text-gray-700 after:scale-x-0"
            }`}
          >
            Dashboard
          </button>
        </nav>

        {/* Right side Auth/Profile */}
        <div className="mt-2 sm:mt-0">
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              className="px-4 sm:px-6 py-2 bg-black text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 shadow-md"
              onClick={() => navigate("/signin")}
            >
              Login / SignUp
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
