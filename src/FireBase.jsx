// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzR_69FgG3a7RbWWqhqDTgt8e6RVvJbBA",
  authDomain: "vb-app-21f1b.firebaseapp.com",
  projectId: "vb-app-21f1b",
  storageBucket: "vb-app-21f1b.appspot.com",
  messagingSenderId: "851099481412",
  appId: "1:851099481412:web:61992cdd71d8302f981311",
  measurementId: "G-F4P0HBQTRP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
