// src/pages/Settings/Settings.jsx
import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  PhoneAuthProvider,
  multiFactor,
  PhoneMultiFactorGenerator,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

const Settings = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [mfaEnrolled, setMfaEnrolled] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    const checkMfaStatus = () => {
      const enrolledFactors = multiFactor(auth.currentUser).enrolledFactors;
      setMfaEnrolled(enrolledFactors.length > 0);
    };
    if (auth.currentUser) checkMfaStatus();
  }, [auth.currentUser]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );
    }
  };

  const handleEnrollMfa = async () => {
    try {
      setupRecaptcha();
      const recaptchaVerifier = window.recaptchaVerifier;
      const session = await multiFactor(auth.currentUser).getSession();

      const phoneAuthProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        {
          phoneNumber,
          session,
        },
        recaptchaVerifier
      );
      setVerificationId(verificationId);
      alert("Verification code sent to phone");
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Error during enrollment");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
      const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
      await multiFactor(auth.currentUser).enroll(multiFactorAssertion, "My Phone");
      alert("MFA enrollment successful");
      setMfaEnrolled(true);
    } catch (err) {
      console.error("Verification error:", err);
      alert("Invalid code or error verifying");
    }
  };

  const handleUnenroll = async () => {
    const enrolledFactors = multiFactor(auth.currentUser).enrolledFactors;
    if (enrolledFactors.length > 0) {
      await multiFactor(auth.currentUser).unenroll(enrolledFactors[0].uid);
      alert("MFA disabled");
      setMfaEnrolled(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
      <div id="recaptcha-container"></div>

      {!mfaEnrolled ? (
        <>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border mb-2 rounded"
          />
          <button
            onClick={handleEnrollMfa}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Verification Code
          </button>
          {verificationId && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border mb-2 rounded"
              />
              <button
                onClick={handleVerifyCode}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Verify and Enroll
              </button>
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleUnenroll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Disable Multi-Factor Authentication
        </button>
      )}
    </div>
  );
};

export default Settings;
