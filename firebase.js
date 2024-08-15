// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBnFUWDIUfxf47fVQ9ICbKNPN7np1fiLAg",
  authDomain: "foodxpress-4ab68.firebaseapp.com",
  databaseURL: "https://foodxpress-4ab68-default-rtdb.europe-west1.firebasedatabase.app", // Updated URL
  projectId: "foodxpress-4ab68",
  storageBucket: "foodxpress-4ab68.appspot.com",
  messagingSenderId: "331931066871",
  appId: "1:331931066871:android:484820338418ced9290ef2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
