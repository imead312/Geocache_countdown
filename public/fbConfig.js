// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXZ3dMFPq0ns3ksi-6Q-Ycw_SLILvyj1g",
  authDomain: "imead-dev.firebaseapp.com",
  projectId: "imead-dev",
  storageBucket: "imead-dev.appspot.com",
  messagingSenderId: "171107527972",
  appId: "1:171107527972:web:06f7a98204280cf4b717b1",
  measurementId: "G-KHESD9MTLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);