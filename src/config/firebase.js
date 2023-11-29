import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3Y58rZ2at70pJ3lI6MEXgsDy-yJYp2Dk",
  authDomain: "secret-santa-backend-261019.firebaseapp.com",
  projectId: "secret-santa-backend-261019",
  storageBucket: "secret-santa-backend-261019.appspot.com",
  messagingSenderId: "336263516003",
  appId: "1:336263516003:web:4c9de193a8ef35802c8d56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };