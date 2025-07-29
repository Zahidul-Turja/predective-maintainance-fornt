import {
    PhoneAuthProvider,
    multiFactor,
    PhoneMultiFactorGenerator
  } from "firebase/auth";
  import { auth } from "../firebase/firebase";
  
  export const setupMFA = async (phoneNumber, appVerifier) => {
    const user = auth.currentUser;
    if (!user) throw new Error("No authenticated user");
  
    const mfaSession = await multiFactor(user).getSession();
  
    const phoneInfoOptions = {
      phoneNumber,
      session: mfaSession
    };
  
    const phoneAuthProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);
  
    const verificationCode = prompt("Enter the OTP sent to your phone:");
    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
    const assertion = PhoneMultiFactorGenerator.assertion(cred);
  
    await multiFactor(user).enroll(assertion, "Phone number");
    alert("2FA setup complete!");
  };
  