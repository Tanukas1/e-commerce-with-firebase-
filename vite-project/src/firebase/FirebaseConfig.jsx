// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaMnCfndv31jvioiHFIlG0HWqq8EQfFpw",
  authDomain: "myfirstecommerce-eaf7c.firebaseapp.com",
  projectId: "myfirstecommerce-eaf7c",
  storageBucket: "myfirstecommerce-eaf7c.appspot.com",
  messagingSenderId: "1035918334418",
  appId: "1:1035918334418:web:7c0e1c1eba756aade5d00b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const fireDB = getFirestore(app);
const auth = getAuth(app);

export{fireDB, auth};