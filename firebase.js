// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, getDocs, collection, doc, where, updateDoc, query, documentId } from 'https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js';

var mykey = config.MY_KEY;
var domain = config.Domain;
var url = config.URL;
var storage = config.storage;
var senderId = config.senderID;
var secretkey = config.SECRET_KEY;
var measurementId = config.KEY_2;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: mykey,
  authDomain: domain,
  databaseURL: url,
  projectId: "picell-8b622",
  storageBucket: storage,
  messagingSenderId: senderId,
  appId: secretkey,
  measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//To Read DATA From Firebase Database
async function getAllData(callback){
  let data = [], id = [], i = 0;
  const docRef = collection(db, "arts");
  const docSnap = await getDocs(docRef);
  
  try {
    docSnap.forEach((doc) => {
      data[i] = doc.data();
      id[i] = doc.id;
      i++;
    });
  } catch (e) {
    console.log("Error adding document: ", e);
  }
  callback(data, id);
}

async function getDataById(id, callback){


  const q = query(collection(db, "arts"), where(documentId(), "==", id));
  let data;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data = doc.data();
  });
  callback(data)

}
        
        
//Function to write data on firebase database
async function updateData(imagedata, id, screenShot){
  
  const docRef = doc(db, "arts", id);

  await updateDoc(docRef, {
    data: imagedata,
    img: screenShot
  });

}

export { updateData, getAllData, getDataById };


