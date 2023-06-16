import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAPYSiYrnvaLWgTe-c0brb6Qa9n-j3IxVY",
    authDomain: "mockup-shop.firebaseapp.com",
    projectId: "mockup-shop",
    storageBucket: "mockup-shop.appspot.com",
    messagingSenderId: "996858918992",
    appId: "1:996858918992:web:3cc29bef28933f0ac2b955",
    measurementId: "G-RLW8M1YBVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }