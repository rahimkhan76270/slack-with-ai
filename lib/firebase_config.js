// Import the functions you need from the SDKs you need
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx-7ZqXwhtG-t7y7HLZMVnvg28IRelCKg",
  authDomain: "slack-with-ai.firebaseapp.com",
  projectId: "slack-with-ai",
  storageBucket: "slack-with-ai.appspot.com",
  messagingSenderId: "363912147946",
  appId: "1:363912147946:web:bf480a4e023788e5a9f893",
  measurementId: "G-9PK5HPZG6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const initfirebase=()=>{
  return app;
}