import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  getMultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/multi-factor-auth-required") {
        await handle2FA(error);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handle2FA = async (error) => {
    const resolver = getMultiFactorResolver(auth, error);
    const phoneInfoOptions = {
      multiFactorHint: resolver.hints[0],
      session: resolver.session,
    };
    const phoneAuthProvider = new PhoneAuthProvider(auth);

    const verificationId = await phoneAuthProvider.verifyPhoneNumber(
      phoneInfoOptions,
      window.recaptchaVerifier
    );

    const code = prompt("Enter the 2FA verification code:");
    const cred = PhoneAuthProvider.credential(verificationId, code);
    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

    try {
      await resolver.resolveSignIn(multiFactorAssertion);
      toast.success("2FA Verified. Logged in!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("2FA failed: " + err.message);
    }
  };

  const handleSendPasswordReset = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, forgotEmail);
      toast.success("Password reset email sent! Check your inbox.");
      setForgotEmail("");
      setShowForgotPassword(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {showForgotPassword ? "Reset Your Password" : "Login to Your Account"}
        </h2>

        {!showForgotPassword ? (
          <>
            <form onSubmit={handleEmailLogin}>
              <input
                type="email"
                className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full p-3 mb-1 border rounded focus:outline-none focus:ring-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-right text-sm mb-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-600 hover:underline focus:outline-none"
                >
                  Forgot password?
                </button>
              </p>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <div className="my-4 text-center text-gray-500">or</div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border py-3 rounded hover:bg-gray-100"
            >
              <FcGoogle size={24} />
              Login with Google
            </button>

            <p className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </>
        ) : (
          <form onSubmit={handleSendPasswordReset}>
            <input
              type="email"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2"
              placeholder="Enter your email address"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              autoFocus
            />
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-gray-600 hover:underline focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
