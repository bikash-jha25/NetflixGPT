// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcjaXOSbjJ5hIdxpQHBX9U3277LEcy1Xs",
  authDomain: "netflix-3717b.firebaseapp.com",
  projectId: "netflix-3717b",
  storageBucket: "netflix-3717b.firebasestorage.app",
  messagingSenderId: "523852240078",
  appId: "1:523852240078:web:46bdf0193f34f764362c9f",
  measurementId: "G-45CFYLZDBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics is optional and can throw in unsupported browser/runtime setups.
isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  })
  .catch(() => {});

//get the auth at central place so dont have to call again and again
export const auth = getAuth();
