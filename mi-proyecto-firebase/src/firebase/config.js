// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHLudZ68yuRNa1BuflHxT-BtYy_5mxmxA",
  authDomain: "edya-b552c.firebaseapp.com",
  projectId: "edya-b552c",
  storageBucket: "edya-b552c.firebasestorage.app",
  messagingSenderId: "720244017139",
  appId: "1:720244017139:web:4edeac27cdb3502c263486",
  measurementId: "G-TMWEXBN8HT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const analytics = getAnalytics(app);