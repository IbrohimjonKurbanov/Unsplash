import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDswF422iql3JalQw38PupWBKyeJcWCcVU",
  authDomain: "ik-splash.firebaseapp.com",
  projectId: "ik-splash",
  storageBucket: "ik-splash.firebasestorage.app",
  messagingSenderId: "1028398688658",
  appId: "1:1028398688658:web:ce04743af3b1c524dd794b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
