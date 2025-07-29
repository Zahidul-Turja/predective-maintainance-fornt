import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";

const GoogleSignIn = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Signed in as:", result.user);
    } catch (error) {
      console.error("Google Sign-In error:", error.message);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
      Sign In with Google
    </button>
  );
};

export default GoogleSignIn;
