// Import the functions you need from the SDKs you need
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "slack-with-ai.firebaseapp.com",
  projectId: "slack-with-ai",
  storageBucket: "slack-with-ai.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId:process.env.FIREBASE_MEASUREMENT_ID,
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const initfirebase=()=>{
  return app;
}

