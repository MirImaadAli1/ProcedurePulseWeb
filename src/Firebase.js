// firebaseClient.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkM4cIs8g67RsGSdzd1-OUeRz4Rp0bhRo',
  authDomain: 'procedurepulse.firebaseapp.com',
  projectId: 'procedurepulse',
  storageBucket: 'procedurepulse.appspot.com',
  messagingSenderId: '960361363125',
  appId: '1:960361363125:web:15594e4bba31719490f0fc',
  measurementId: 'G-6CH2G7PFH9',
};

let firebaseInitialized = false;
let app, db, storage, auth;

export const initializeFirebase = () => {
  if (!firebaseInitialized) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);
    firebaseInitialized = true;
  }
  return { app, db, storage, auth };
};

export { app, db, storage, auth }; // Optionally export these for cases where you need direct access
