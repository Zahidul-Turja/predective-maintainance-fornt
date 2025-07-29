// src/pages/Security/MFASetup.jsx

import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import {
  multiFactor,
  PhoneAuthProvider,
  RecaptchaVerifier,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const MFASetup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("Recaptcha verified", response);
          },
        },
        auth
      );
    }
  }, [navigate]);

  const sendVerificationCode = async () => {
    try {
      const mfaSession = await multiFactor(auth.currentUser).getSession();

      const phoneInfoOptions = {
        phoneNumber,
        session: mfaSession,
      };

      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const id = await phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        window.recaptchaVerifier
      );
      setVerificationId(id);
    } catch (error) {
      console.error("Error sending verification code", error.message);
    }
  };

  const verifyAndEnroll = async () => {
    try {
      const cred = PhoneAuthProvider.credential(verificationId, code);
      const multiFactorAssertion = PhoneAuthProvider.credential(cred);
      await multiFactor(auth.currentUser).enroll(multiFactorAssertion, "Phone 2FA");

      alert("2FA Setup Complete!");
      navigate("/dashboard"); // or wherever appropriate
    } catch (error) {
      console.error("Error enrolling 2FA", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Set Up 2FA</h2>
      <input
        type="tel"
        placeholder="+1234567890"
        className="w-full border p-2 mb-2 rounded"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button
        onClick={sendVerificationCode}
        className="bg-blue-500 text-white w-full p-2 rounded mb-4"
      >
        Send Verification Code
      </button>

      {verificationId && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border p-2 mb-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={verifyAndEnroll}
            className="bg-green-600 text-white w-full p-2 rounded"
          >
            Verify & Enroll
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default MFASetup;
