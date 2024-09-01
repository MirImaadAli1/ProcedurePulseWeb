// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBkM4cIs8g67RsGSdzd1-OUeRz4Rp0bhRo',
  authDomain: 'procedurepulse.firebaseapp.com',
  projectId: 'procedurepulse',
  storageBucket: 'procedurepulse.appspot.com',
  messagingSenderId: '960361363125',
  appId: '1:960361363125:web:15594e4bba31719490f0fc',
  measurementId: 'G-6CH2G7PFH9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, db, storage };