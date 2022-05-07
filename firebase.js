// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, getDocs, collection, setDoc, doc, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBd6AkAihAo7RTklxzNX9obP8FDruyJHCY",
  authDomain: "picell-8b622.firebaseapp.com",
  databaseURL: "https://picell-8b622-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "picell-8b622",
  storageBucket: "picell-8b622.appspot.com",
  messagingSenderId: "949784715102",
  appId: "1:949784715102:web:ef1474f843cf30508e79cf",
  measurementId: "G-QJFR0KCNMZ"
};

let save_btn = document.getElementById("save");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//To Read DATA From Firebase Database
let Canvas_DATA = {};
async function readData(){
  
  // const docRef = collection(db, "arts");
  // const docSnap = await getDocs(docRef);
  
  // try {
  //   docSnap.forEach((doc) => {
  //       Canvas_DATA.key = doc.data();
  //   });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
        
}
        
const docRef = collection(db, "arts");
const docSnap = await getDocs(docRef);

try {
  docSnap.forEach((doc) => {
    Canvas_DATA.key = doc.data();
    
  });
} catch (e) {
  alert("Error adding document: ", e);
}
const unsub = onSnapshot(doc(db, "arts", "Canvas1"), (doc) => {
    Canvas_DATA.key = doc.data();
});

// console.log(Canvas_DATA.key.DATA);
        
        
//Function to write data on firebase database
async function Save(imagedata){
  
  const docRef = collection(db, "arts");
  await setDoc(doc(docRef, "Canvas1"), {
    DATA: imagedata
  });
  
}
  
async function updateDATA(imagedata){
  
  const docRef = doc(db, "arts", "Canvas1");

  await updateDoc(docRef, {
    DATA: imagedata
  });

}

async function snapshot(){

}
export { Save, Canvas_DATA, updateDATA };

