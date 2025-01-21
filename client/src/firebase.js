// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-b47f7.firebaseapp.com",
  projectId: "real-estate-b47f7",
  storageBucket: "real-estate-b47f7.firebasestorage.app",
  messagingSenderId: "978270608475",
  appId: "1:978270608475:web:62feb52bae360a4ad5f37e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);