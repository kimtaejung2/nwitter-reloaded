import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMNhs3c5iBjCcS-77hi3l-9-TWhwYDKqI",
  authDomain: "nwitter-reloaded-61999.firebaseapp.com",
  projectId: "nwitter-reloaded-61999",
  storageBucket: "nwitter-reloaded-61999.firebasestorage.app",
  messagingSenderId: "261016866059",
  appId: "1:261016866059:web:7bd9c6f1b19c93146ca60e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
