import React, { useContext, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContex";

export default function ProtectedRoute({ children }) {
  //   const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  // console.log(user);

  return user?.email ? <>{children}</> : <Navigate to="/login" />; 
}
