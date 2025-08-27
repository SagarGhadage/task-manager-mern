import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../api/api";
import { useAuth } from "../../../context/AuthContex";
import { useSnackbar } from "notistack";
import useWindowSize from "../../../utils/useWindowSize";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const winSize = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (loginForm?.username?.length < 2) {
        enqueueSnackbar("Name shud be at least 2 characters", {
          variant: "error",
        });
        return;
      }
      if (loginForm?.password?.length < 6) {
        enqueueSnackbar("Password shud be at least 6 characters", {
          variant: "error",
        });
        return;
      }
      const result = await loginApi({
        email: loginForm.username,
        password: loginForm.password,
      });
      localStorage.setItem("token", result?.tokens?.access?.token);
      localStorage.setItem("user", JSON.stringify(result?.user));
      login();
      enqueueSnackbar("Login successful!", { variant: "success" });
      navigate("/tasks/create");
      // window.location.reload();
    } catch (e) {
      console.error(e);
      enqueueSnackbar(`Login Failed: ${e.response?e?.response?.data?.message:e?.message}`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`flex p-4 items-${
        winSize.width < 768 ? "baseline" : "center"
      } justify-center min-h-[90vh] bg-gray-100 dark:bg-gray-900`}
    >
      <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 h-fit">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Login
        </h2>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginForm.username}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/Register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
