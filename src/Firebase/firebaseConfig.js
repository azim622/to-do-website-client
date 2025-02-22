// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe67EV-nUPxarw9GhXrbEcAnJ3bGaoD-E",
  authDomain: "to-do-website-b24d0.firebaseapp.com",
  projectId: "to-do-website-b24d0",
  storageBucket: "to-do-website-b24d0.firebasestorage.app",
  messagingSenderId: "961642216323",
  appId: "1:961642216323:web:9b7fda476cb738704a94b6",
  measurementId: "G-CEXJZ4W55R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;