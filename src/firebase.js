import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArI0hA5zZz1S8PK1A_GLqKP1qpxkIrjHM",
  authDomain: "assignment-1p3.firebaseapp.com",
  projectId: "assignment-1p3",
  storageBucket: "assignment-1p3.firebasestorage.app",
  messagingSenderId: "315870122112",
  appId: "1:315870122112:web:d5fcde4cd91f0657b71665",
  measurementId: "G-VK4HP0W92X"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);