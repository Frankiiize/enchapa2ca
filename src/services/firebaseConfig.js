// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXBhp45Vxju7OAxy8pugLY4wEx253mcHg",
  authDomain: "enchapado-29a6f.firebaseapp.com",
  projectId: "enchapado-29a6f",
  storageBucket: "enchapado-29a6f.appspot.com",
  messagingSenderId: "1083909929084",
  appId: "1:1083909929084:web:6a98d8acdc7e5bc71671f9",
  measurementId: "G-DTNEB632E8"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const db = getFirestore(fireBaseApp);
const analytics = getAnalytics(fireBaseApp);
const storage = getStorage(fireBaseApp);



export  {fireBaseApp, db};