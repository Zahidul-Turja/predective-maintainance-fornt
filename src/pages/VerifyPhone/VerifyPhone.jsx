// src/pages/VerifyPhone/VerifyPhone.jsx

import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyPhone = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Setup reCAPTCHA
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          // Reset if expired
        },
      },
      auth
    );
    window.recaptchaVerifier.render();
  }, []);

  const handleSendCode = async () => {
    setMessage("");
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setMessage("Verification code sent. Enter it below.");
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  const handleVerifyCode = async () => {
    setMessage("");
    try {
      await confirmationResult.confirm(code);
      setMessage("Phone number verified successfully!");
      navigate("/"); // Redirect after verification
    } catch (error) {
      console.error(error);
      setMessage("Invalid verification code.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Verify Phone</h2>
        {message && (
          <p className="text-center mb-4 text-sm text-blue-600">{message}</p>
        )}

        {!confirmationResult ? (
          <>
            <input
              type="tel"
              placeholder="Phone Number e.g. +15555550123"
              className="w-full border px-3 py-2 rounded mb-4"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div id="recaptcha-container" className="mb-4" />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={handleSendCode}
            >
              Send Code
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter verification code"
              className="w-full border px-3 py-2 rounded mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              onClick={handleVerifyCode}
            >
              Verify Code
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPhone;
