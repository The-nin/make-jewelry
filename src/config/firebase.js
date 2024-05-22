// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZzzMNLSdx7mdumqXT3su2qHbpvuzwtug",
  authDomain: "make-jewelry-28704.firebaseapp.com",
  projectId: "make-jewelry-28704",
  storageBucket: "make-jewelry-28704.appspot.com",
  messagingSenderId: "408884818589",
  appId: "1:408884818589:web:5f5090b49c364982ce1a74",
  measurementId: "G-ELTBKWV5T2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()

export {auth}