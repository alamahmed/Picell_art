// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js';

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBd6AkAihAo7RTklxzNX9obP8FDruyJHCY",
    authDomain: "picell-8b622.firebaseapp.com",
    projectId: "picell-8b622",
    storageBucket: "picell-8b622.appspot.com",
    messagingSenderId: "949784715102",
    appId: "1:949784715102:web:ef1474f843cf30508e79cf",
    measurementId: "G-QJFR0KCNMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default async function toSave(imagedata){

    const docRef = await addDoc(collection(db, "test"), {
        DATA: imagedata
    });
}


