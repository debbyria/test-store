// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAHBnP4Z_5qB9Tch0duYu2G2XVeTQQ3GM",
  authDomain: "test-store-9b473.firebaseapp.com",
  projectId: "test-store-9b473",
  storageBucket: "test-store-9b473.appspot.com",
  messagingSenderId: "655009041853",
  appId: "1:655009041853:web:91f98fd3d91d1c97f756d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// const storage = firebase.storage()
const db = getFirestore(app);

export {
  auth,
  // storage, 
  db
}