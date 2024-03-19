// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtRqUvnSO9kG27Ug-Mxkg3ub4h0BLLKlk",
  authDomain: "aiqtrading-64469.firebaseapp.com",
  projectId: "aiqtrading-64469",
  storageBucket: "aiqtrading-64469.appspot.com",
  messagingSenderId: "705849581369",
  appId: "1:705849581369:web:916748566afc608fe812e8",
  measurementId: "G-322LTYQ3VG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//
// Initialise Firebase Firestore Storage
export const db = getFirestore(app)
// Need to export the variable so that we can use later in the App

export const auth = getAuth(app);
// the EXPORT command is used so that we can export the variable auth so that we can reuse it in other components.
 