
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY, 
  authDomain: "interviewiq-18f51.firebaseapp.com",
  projectId: "interviewiq-18f51",
  storageBucket: "interviewiq-18f51.firebasestorage.app",
  messagingSenderId: "747761979369",
  appId: "1:747761979369:web:c4e31cca19539cdedac578"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };