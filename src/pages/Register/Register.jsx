// src/pages/Register/Register.jsx

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const getDaysInMonth = (year, monthIndex) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1900; y--) years.push(y);

  useEffect(() => {
    setPasswordMatch(form.password === form.confirmPassword);
  }, [form.password, form.confirmPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (formError) setFormError("");
  };

  const isDOBValid = () => {
    const { dobDay, dobMonth, dobYear } = form;
    if (!dobDay || !dobMonth || !dobYear) return false;
    const maxDay = getDaysInMonth(Number(dobYear), Number(dobMonth));
    return Number(dobDay) <= maxDay;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!passwordMatch) {
      setFormError("Passwords do not match.");
      return;
    }

    if (!isDOBValid()) {
      setFormError("Please select a valid Date of Birth.");
      return;
    }

    setIsSubmitting(true);

    try {
      const dobString = `${form.dobYear}-${String(Number(form.dobMonth) + 1).padStart(2, "0")}-${String(form.dobDay).padStart(2, "0")}`;

      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await updateProfile(user, {
        displayName: `${form.firstName} ${form.lastName}`,
      });

      await sendEmailVerification(user);
      alert("Verification email sent! Please verify before logging in.");
      navigate("/home");
    } catch (error) {
      setFormError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 to-emerald-200 flex items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-10 sm:p-12"
      >
        <h1 className="text-4xl font-extrabold text-center text-emerald-700 mb-8">
          Create Your Account
        </h1>

        {formError && (
          <div className="mb-6 text-center text-red-700 bg-red-100 p-3 rounded-lg shadow">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-emerald-800 font-semibold mb-2" htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First-Name"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full border border-emerald-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-emerald-800 font-semibold mb-2" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last-Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full border border-emerald-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-emerald-800 font-semibold mb-2">Date of Birth</label>
            <div className="flex gap-3">
              <select
                name="dobDay"
                value={form.dobDay}
                onChange={handleChange}
                required
                className="flex-1 border border-emerald-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                name="dobMonth"
                value={form.dobMonth}
                onChange={handleChange}
                required
                className="flex-1 border border-emerald-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Month</option>
                {months.map((m, i) => (
                  <option key={m} value={i}>{m}</option>
                ))}
              </select>

              <select
                name="dobYear"
                value={form.dobYear}
                onChange={handleChange}
                required
                className="flex-1 border border-emerald-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-emerald-800 font-semibold mb-2" htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full border border-emerald-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="preferNot">Prefer not to say</option>
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-emerald-800 font-semibold mb-2" htmlFor="phone">Phone Number (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 234 567 8900"
              value={form.phone}
              onChange={handleChange}
              pattern="^\+?\d{10,15}$"
              className="w-full border border-emerald-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-emerald-800 font-semibold mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-emerald-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-emerald-800 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full border border-emerald-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-emerald-800 font-semibold mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                passwordMatch
                  ? "border-emerald-300 focus:ring-emerald-500"
                  : "border-red-500 focus:ring-red-500"
              }`}
            />
            {!passwordMatch && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match.</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.gender || !isDOBValid() || !passwordMatch}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
              isSubmitting || !passwordMatch
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-md"
            }`}
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-emerald-700 text-sm">
          Already have an account?{" "}
          <a href="/login" className="font-semibold underline hover:text-emerald-900">
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
