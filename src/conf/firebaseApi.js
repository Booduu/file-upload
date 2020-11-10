import firebase from 'firebase/app';
import "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "<apikey>",
    authDomain: "upload-db9bd.firebaseapp.com",
    databaseURL: "https://upload-db9bd.firebaseio.com",
    projectId: "upload-db9bd",
    storageBucket: "upload-db9bd.appspot.com",
    messagingSenderId: "354225422448",
    appId: "<apiid>",
    measurementId: "<measurementId>"
  };


firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default}
