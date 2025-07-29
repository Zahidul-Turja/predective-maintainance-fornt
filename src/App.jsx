// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ManualInput from "./pages/ManualInput/ManualInput";
import Insights from "./pages/Insights/Insights";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VerifyPhone from "./pages/VerifyPhone/VerifyPhone";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Settings from "./pages/Settings/Settings";
import Profile from "./pages/Profile/Profile";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import SubmitReview from "./components/SubmitReview/SubmitReview";

const App = () => {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-phone" element={<VerifyPhone />} />
        <Route path="/about" element={<About />} />
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route
          path="/manual-input"
          element={
            <ProtectedRoute>
              <ManualInput />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route path="/settings" element={<ProtectedRoute>
          <Settings />
        </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
