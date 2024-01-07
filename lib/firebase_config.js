// Import the functions you need from the SDKs you need
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import config from '@/config';
const firebaseConfig = {
  apiKey:"AIzaSyDx-7ZqXwhtG-t7y7HLZMVnvg28IRelCKg",
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

