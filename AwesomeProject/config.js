import { initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZTX1e1PrFSHmZj9GeXKXSB7qZnWxx-OE",
  authDomain: "testproject-66402.firebaseapp.com",
  projectId: "testproject-66402",
  storageBucket: "testproject-66402.appspot.com",
  messagingSenderId: "95671488298",
  appId: "1:95671488298:web:d6ee14028f122df22e5853",
  measurementId: "G-KJTJ7G9253"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);