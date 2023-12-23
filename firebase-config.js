import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMJ6io_IuQ_QKkFBLN_6PRa0owO4l2FXA",
  authDomain: "waveslens.firebaseapp.com",
  databaseURL: "https://waveslens-default-rtdb.firebaseio.com",
  projectId: "waveslens",
  storageBucket: "waveslens.appspot.com",
  messagingSenderId: "226348188440",
  appId: "1:226348188440:web:039bf1d6da6df18bec146d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
