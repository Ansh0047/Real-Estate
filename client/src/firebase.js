// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-a12e0.firebaseapp.com",
  projectId: "real-estate-a12e0",
  storageBucket: "real-estate-a12e0.firebasestorage.app",
  messagingSenderId: "641848838878",
  appId: "1:641848838878:web:f4fcf88a934ef15e27504f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);