import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC432LBgCgOt8iNkd25BbWH8V6Bn92IcSg",
  authDomain: "docappoint-c44bd.firebaseapp.com",
  projectId: "docappoint-c44bd",
  storageBucket: "docappoint-c44bd.firebasestorage.app",
  messagingSenderId: "661582197292",
  appId: "1:661582197292:web:c59abcc3016a4a7d385789"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
