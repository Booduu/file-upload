import firebase from 'firebase/app';
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADf9PjJEs9ExwEXM6xwvb2iWY4E6o30UA",
    authDomain: "upload-db9bd.firebaseapp.com",
    databaseURL: "https://upload-db9bd.firebaseio.com",
    projectId: "upload-db9bd",
    storageBucket: "upload-db9bd.appspot.com",
    messagingSenderId: "354225422448",
    appId: "1:354225422448:web:3f09ea03d9dc9aad2574b5",
    measurementId: "G-77DX4VPD6K"
  };


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default}
