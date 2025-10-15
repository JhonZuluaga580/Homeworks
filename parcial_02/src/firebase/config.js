// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH9dH3Bqqk_QMR00AfiKRpi0J3M5J3Uzg",
  authDomain: "uao-social-86c6a.firebaseapp.com",
  projectId: "uao-social-86c6a",
  storageBucket: "uao-social-86c6a.firebasestorage.app",
  messagingSenderId: "939956834225",
  appId: "1:939956834225:web:bb7624fd17040eac667790",
  measurementId: "G-B3JXCPNBWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);