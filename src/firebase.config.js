

    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjI9mGzROeAZIzNIHy8npzaQf-8HWzQM8",
  authDomain: "house-market-place-f958c.firebaseapp.com",
  projectId: "house-market-place-f958c",
  storageBucket: "house-market-place-f958c.appspot.com",
  messagingSenderId: "148060464591",
  appId: "1:148060464591:web:7649b9f4bcb64046e91eba"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()









