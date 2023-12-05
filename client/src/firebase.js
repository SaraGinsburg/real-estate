// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'real-estate-ac2f6.firebaseapp.com',
  projectId: 'real-estate-ac2f6',
  storageBucket: 'real-estate-ac2f6.appspot.com',
  messagingSenderId: '833506644672',
  appId: '1:833506644672:web:d4ca1a08f2c90e2aca9325',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
