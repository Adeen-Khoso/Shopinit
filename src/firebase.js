import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACEkoo7e_DO_rdEIr69Xzm0fBVDw6ZbuA",
  authDomain: "shopinit-development-1d5bd.firebaseapp.com",
  projectId: "shopinit-development-1d5bd",
  storageBucket: "shopinit-development-1d5bd.appspot.com",
  messagingSenderId: "1017428423139",
  appId: "1:1017428423139:web:2f816b4a999f3df5ac30d6",
  measurementId: "G-0F8H74EE1E",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
