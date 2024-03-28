// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Storage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxmKidCR764h1SgSWQRruhDUi3Ys9LlIg",
  authDomain: "bukconnect-c3d4e.firebaseapp.com",
  projectId: "bukconnect-c3d4e",
  storageBucket: "bukconnect-c3d4e.appspot.com",
  messagingSenderId: "289583124509",
  appId: "1:289583124509:web:6c6a64d0926070844d36f4",
  measurementId: "G-2436N4NR5S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Export Firestore as 'db', auth for authentication, and storage for storage access
export { db, auth, storage };
