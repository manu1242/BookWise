
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNG5SzlYuCVOO8ArvmQzmLMCj5ug5sFc0",
  authDomain: "login-4425e.firebaseapp.com",
  projectId: "login-4425e",
  storageBucket: "login-4425e.appspot.com",
  messagingSenderId: "932637728354",
  appId: "1:932637728354:web:4ee43f2e4ca57c4a853b3b",
  measurementId: "G-TVVK6C5MC9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
