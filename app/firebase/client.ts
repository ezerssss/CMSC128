import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "laba-da.firebaseapp.com",
  projectId: "laba-da",
  storageBucket: "laba-da.appspot.com",
  messagingSenderId: "236119568303",
  appId: "1:236119568303:web:3430a922cba58582db095a",
  measurementId: "G-2B22MR7VDV",
};

const clientApp = initializeApp(firebaseConfig);

export default clientApp;
