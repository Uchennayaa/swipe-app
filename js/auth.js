// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfFfOHvpg1WOq_ijAPQo0opiIwhIMeZhI",
  authDomain: "swipe-b987e.firebaseapp.com",
  projectId: "swipe-b987e",
  storageBucket: "swipe-b987e.appspot.com",
  messagingSenderId: "912939353712",
  appId: "1:912939353712:web:25933ccf0070e4509616b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Register function with error handling
export function registerUser(email, password) {
  if (!email || !password) {
    return Promise.reject(new Error("Email and password are required."));
  }

  return createUserWithEmailAndPassword(auth, email, password);
}

// Login function with error handling
export function loginUser(email, password) {
  if (!email || !password) {
    return Promise.reject(new Error("Email and password are required."));
  }

  return signInWithEmailAndPassword(auth, email, password);
}

// Logout function
export function logoutUser() {
  return signOut(auth);
}

// Export auth if needed
export { auth };
