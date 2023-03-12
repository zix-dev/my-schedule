// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB3qp-6qT9w7livegzBeWSeY59gt1MokJA",
  authDomain: "myschedule-zix.firebaseapp.com",
  projectId: "myschedule-zix",
  storageBucket: "myschedule-zix.appspot.com",
  messagingSenderId: "1037015647403",
  appId: "1:1037015647403:web:30cb7e888e4244534463ee",
  measurementId: "G-P3VDME66JH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
