import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import pick from "../../../utils/pick";
import { registerApi } from "../../../api/api.js";
import { useAuth } from "../../../context/AuthContex.jsx";
import useWindowSize from "../../../utils/useWindowSize.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const winSize = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();

  const [registerForm, setRegisterForm] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (formData) => {
    if (validateInput(formData)) {
      try {
        setLoading(true);
        const newFormData = pick(formData, ["name", "email", "password"]);
        const data = await registerApi(newFormData);
        if (data?.code) {
          enqueueSnackbar(data?.response?.data?.message, { variant: "error" });
        }
        if (data?.tokens) {
          enqueueSnackbar("Registered successfully", { variant: "success" });
          localStorage.setItem("token", data?.tokens?.access?.token);
          localStorage.setItem("user", JSON.stringify(data?.user));
          setUser(data?.user);
          navigate("/tasks");
          window.location.reload();
        }
      } catch (err) {
        if (err.response && err.response.data) {
          enqueueSnackbar(err?.response?.data?.message || "Backend error", {
            variant: "error",
          });
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const validateInput = (data) => {
    if (data?.name === "") {
      enqueueSnackbar("Name is a required field", { variant: "warning" });
      return false;
    }
    if (data.email === "") {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    }
    if (data.password === "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    if (data.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    return true;
  };

  return (
    <div
      className={`flex p-4 ${
        winSize.width < 768 ? "items-start" : "items-center"
      } justify-center min-h-[88vh] bg-gray-100 dark:bg-gray-900`}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Register
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              value={registerForm.name}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={registerForm.email}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
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
              placeholder="Enter a password with minimum 6 characters"
              value={registerForm.password}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerForm.confirmPassword}
              onChange={handleRegForm}
              className="w-full px-3 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={() => register(registerForm)}
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
