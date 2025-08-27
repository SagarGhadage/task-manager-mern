import React, { useContext, useState } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import {
  LightMode,
  DarkMode,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContex.jsx";
import TaskExport from "../tasks/TaskExport.jsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="flex relative z-100 justify-between px-6 py-4 bg-gray-100 shadow dark:bg-gray-800">
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors duration-300 dark:hover:text-[#ffb600]"
      >
        Task Manager
      </Link>

      <div className="flex items-center gap-6">
        {user?.email && (
          <Link
            to="/tasks"
            className="text-gray-800 hidden md:flex text-xl dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
          >
            View Tasks
          </Link>
        )}
        {user?.email && (
          <Link
            to="/tasks/import"
            className="text-gray-800 hidden md:flex text-xl dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
          >
            Import Tasks
          </Link>
        )}
        {user?.id && (
          <Link className="text-gray-800 hidden md:flex text-xl dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]">
            <TaskExport link />
          </Link>
        )}
        {user?.email && (
          <Link
            to="/tasks/create"
            className="text-gray-800 hidden md:flex text-xl dark:text-gray-100 hover:text-blue-500  hover:scale-110 dark:hover:text-[#ffb600]"
          >
            Create Task
          </Link>
        )}

        {!user?.email && (
          <div className="flex w-[auto] hidden md:flex md:flex-row gap-6">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 hover:scale-105 hover:scale-110 dark:hover:text-[#ffb600]"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 hover:scale-110 dark:hover:text-[#ffb600]"
            >
              Register
            </button>
          </div>
        )}
        {user?.email && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 hidden md:flex text-white bg-red-500 rounded hover:bg-red-600 hover:scale-110"
          >
            Logout
          </button>
        )}

        {user?.email && (
          <span
            className="text-xl font-medium flex items-center gap-2 text-gray-800 dark:text-gray-100 
          hover:text-blue-500 "
          >
            <span className="hidden md:flex hover:scale-105 dark:hover:text-[#ffb600]">
              {user?.name || "User ABC"}
            </span>
            {/* {user?.name || "User ABC"} */}
            <AccountCircle className="text-4xl hover:scale-110 hover:scale-110 dark:hover:text-[#ffb600]" />
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="p-2 text-gray-800  hidden md:flex bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-119 hover:bg-[#ffb600]"
        >
          {theme === "light" ? (
            <DarkMode className="text-4xl hover:scale-121 hover:bg-[#ffb600]" />
          ) : (
            <LightMode className="text-6xl hover:scale-120 hover:text-[#ffb600]" />
          )}
        </button>
        {/* Manu  Icon */}
        <button
          className="block md:hidden p-2 text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-100 hover:bg-yellow-300 dark:hover:bg-gray-600 hover:scale-119 dark:hover:text-[#ffb600]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col absolute z-10 rounded-lg bg-[#f5f5f5b8]  shadow-xl p-6 top-20 right-5 dark:bg-[#1f2937b5] items-center justify-center md:hidden">
          {user?.email && (
            <div className="flex flex-col items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                <AccountCircle className="text-3xl" />
                <span className="text-lg font-medium">{user.email}</span>
              </Link>
              <Link
                to="/tasks"
                className="text-gray-800 text-xl w-full text-center dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                View Tasks
              </Link>
              <Link
                to="/tasks/import"
                className="text-gray-800 text-xl w-full text-center dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                Import Tasks
              </Link>
              <Link
                // to="/tasks/import"
                className="text-gray-800 text-xl w-full text-center dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                <TaskExport link />
              </Link>
              <Link
                // to="/tasks/import"
                className="text-gray-800 text-xl w-full text-center dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                <TaskExport fileType={'csv'} link/>
              </Link>
              <Link
                to="/tasks/create"
                className="text-gray-800 text-xl w-full text-center dark:text-gray-100 hover:text-blue-500 hover:scale-110 dark:hover:text-[#ffb600]"
              >
                Create Task
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 w-full py-2 text-white bg-red-500 rounded hover:bg-red-600 hover:scale-110"
              >
                Logout
              </button>
            </div>
          )}
          {!user?.email && (
            <div className="flex w-full flex-col items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600 hover:scale-110"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 w-full text-white bg-green-500 rounded hover:bg-green-600 hover:scale-110"
              >
                Register
              </button>
            </div>
          )}
          <button
            className="p-2 mt-3 text-gray-800 w-full bg-gray-200 rounded-full dark:bg-gray-700 dark:text-yellow-100 hover:bg-gray-300 dark:hover:bg-gray-800 hover:scale-110 dark:hover:text-[#ffb600]"
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <DarkMode className="text-4xl hover:text-[#ffb600]" />
            ) : (
              <LightMode className="text-6xl hover:text-[#ffb600] " />
            )}{" "}
            Switch To {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      )}
    </nav>
  );
}
