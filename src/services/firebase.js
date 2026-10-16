import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC6Impb6pGgRFXEUr5wUu5Lmeub7F5R314",
  authDomain: "lifelink1-bcd99.firebaseapp.com",
  projectId: "lifelink1-bcd99",
  storageBucket: "lifelink1-bcd99.firebasestorage.app",
  messagingSenderId: "437389267347",
  appId: "1:437389267347:web:5752bf71f7e68998179866"
};

const isConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "your-firebase-api-key-here" &&
  firebaseConfig.apiKey.trim() !== "" &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId.trim() !== ""
);

let app = null;
let auth = null;
let db = null;

if (isConfigured) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.info("LifeLink connected to Cloud Firestore & Firebase Auth successfully.");
  } catch (error) {
    console.warn("Firebase initialization notice: using resilient local storage layer.", error);
  }
} else {
  console.info("LifeLink running in Zero-Config Demo Mode with reactive local state layer.");
}

export { app, auth, db, isConfigured };
