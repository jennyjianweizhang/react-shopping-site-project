// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm-jh84YOP977_5pMchsQv8UC6l_QVRE4",
  authDomain: "reactproject-9283a.firebaseapp.com",
  projectId: "reactproject-9283a",
  storageBucket: "reactproject-9283a.appspot.com",
  messagingSenderId: "383162259061",
  appId: "1:383162259061:web:f7b66b4cb61a76c5180a3c",
  measurementId: "G-S6L0BSRLMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app