import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-MT-oErvYDXnkKVMdi90xpr7y4sgpV-0",
  authDomain: "qr-bus-pass.firebaseapp.com",
  databaseURL: "https://qr-bus-pass-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "qr-bus-pass",
  storageBucket: "qr-bus-pass.appspot.com",
  messagingSenderId: "783729673765",
  appId: "1:783729673765:web:aa34c4a679957285c561cc",
  measurementId: "G-HX9BJ4G145"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = app.auth();
const db = app.firestore();

export { auth, db };

