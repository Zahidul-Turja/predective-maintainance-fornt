// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.warn("Please log in to access this page");
    }
  }, [user, loading]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
