import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVaKxL8KRmNxs9Z2fRhWCedkIKuLIcAZ0",
  authDomain: "mytweet-933f5.firebaseapp.com",
  databaseURL:
    "https://mytweet-933f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mytweet-933f5",
  storageBucket: "mytweet-933f5.appspot.com",
  messagingSenderId: "82860535469",
  appId: "1:82860535469:web:1baee652acf0836512e024",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
