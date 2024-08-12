// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3WxZBaNJoZA2p7oe6ihTJCFOE6Y0U_7Q",
    authDomain: "dropshipping-98eb5.firebaseapp.com",
    projectId: "dropshipping-98eb5",
    storageBucket: "dropshipping-98eb5.appspot.com",
    messagingSenderId: "904925867242",
    appId: "1:904925867242:web:af0abda866826e92f8fb93",
    measurementId: "G-BVZR8HY1SR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, storage, ref, set, storageRef, uploadString, getDownloadURL };
