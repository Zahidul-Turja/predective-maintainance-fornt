// src/firebase/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2IkNamweMbC8tn-ti6X7Oc8rpK5piFFM",
    authDomain: "predictive-maintenance13.firebaseapp.com",
    projectId: "predictive-maintenance13",
    storageBucket: "predictive-maintenance13.firebasestorage.app",
    messagingSenderId: "959391096884",
    appId: "1:959391096884:web:f40cf7aa4a47110b8d6a61"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export {firebaseApp, auth, googleProvider };