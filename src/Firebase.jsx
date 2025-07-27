import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAT0F4aj5lSOalNqE7bdAIoif-vs3lsx3E",
  authDomain: "teacher-student-app-9d477.firebaseapp.com",
  databaseURL: "https://teacher-student-app-9d477-default-rtdb.firebaseio.com",
  projectId: "teacher-student-app-9d477",
  storageBucket: "teacher-student-app-9d477.firebasestorage.app",
  messagingSenderId: "1024938068526",
  appId: "1:1024938068526:web:c2292a341535115cefadbf",
  measurementId: "G-22Z5SG07R5"
};

 // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);