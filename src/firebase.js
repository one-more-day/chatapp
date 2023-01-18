import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpBgS76b7yZ263nAjTGi7UOUFz0YFcgTA",
  authDomain: "chat-7b95a.firebaseapp.com",
  projectId: "chat-7b95a",
  storageBucket: "chat-7b95a.appspot.com",
  messagingSenderId: "660701804869",
  appId: "1:660701804869:web:a6701e93cac56e313f262c",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
