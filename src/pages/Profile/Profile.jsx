import React, { useEffect, useState } from "react";
import { auth, firebaseApp } from "../../firebase/firebase";
import { multiFactor } from "firebase/auth";
import ProfileCard from "./ProfileCard";
import { PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [mfaFactors, setMfaFactors] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    if (currentUser) {
      const enrolledFactors = multiFactor(currentUser).enrolledFactors;
      setMfaFactors(enrolledFactors);
    }
  }, []);

  const setupPhoneMFA = async () => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
        size: "invisible",
      }, firebaseApp);
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
      const verificationCode = prompt("Enter the verification code sent to your phone:");
      const credential = phoneProvider.credential(verificationId, verificationCode);

      const user = auth.currentUser;
      await user.multiFactor.enroll(credential, "Phone");
      alert("Phone number MFA enrolled successfully!");
      setPhoneNumber("");
    } catch (error) {
      alert(error.message);
    }
  };

  const removeMFA = async (factorId) => {
    try {
      const user = auth.currentUser;
      await user.multiFactor.unenroll(factorId);
      setMfaFactors(mfaFactors.filter((factor) => factor.factorId !== factorId));
      alert("MFA factor removed successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      {user && <ProfileCard user={user} mfaFactors={mfaFactors} removeMFA={removeMFA} />}
      
      {/* MFA Enrollment Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Enroll MFA</h3>
        <div>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="border p-2 rounded mb-4 w-full"
          />
          <button
            onClick={setupPhoneMFA}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enroll Phone Number
          </button>
        </div>
      </div>

      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Profile;
