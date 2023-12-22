import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBIKcUlUTW9eHG66Ruoq4x29rzcLcgn9G8",
  authDomain: "shoppingcart-ts.firebaseapp.com",
  projectId: "shoppingcart-ts",
  storageBucket: "shoppingcart-ts.appspot.com",
  messagingSenderId: "677758102697",
  appId: "1:677758102697:web:d179109ae2072724978db8",
  measurementId: "G-98B8XLMFLB"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();