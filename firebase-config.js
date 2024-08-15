// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA93i8ti9ToScMxrYEhrfEs-LCGlg5PadM",
  authDomain: "base-de-datos-7c044.firebaseapp.com",
  databaseURL: "https://base-de-datos-7c044-default-rtdb.firebaseio.com",
  projectId: "base-de-datos-7c044",
  storageBucket: "base-de-datos-7c044.appspot.com",
  messagingSenderId: "492201117643",
  appId: "1:492201117643:web:5306795b35be34bc70984e",
  measurementId: "G-GGL68K97V1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
