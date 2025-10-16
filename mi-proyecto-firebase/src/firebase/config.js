// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

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
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const firebaseStorage = getStorage(app);
const realtimeDb = getDatabase(app);
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword, signInWithPopup, googleProvider, signOut, firebaseStorage, db, realtimeDb };