import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

// Clients ids for google sign in
const IOS_CLIENT_ID = "258735134861-ofh5l2autr27ds68hukkp823l44un220.apps.googleusercontent.com";
const ANDROID_CLIENT_ID= "258735134861-apeesi2b2tneaqmkocr0f24hfknnk7i2.apps.googleusercontent.com"
const GOOGLE_API_KEY = 'AIzaSyC_iGZnODFXnCUCOF_gRwja3-kmHnF-PAY';

var firebaseConfig = {
  apiKey: "AIzaSyANwjqxLqpNAQK6PcxrNNfoZk-fC8T3-K8",
  authDomain: "tripver-d5fa9.firebaseapp.com",
  projectId: "tripver-d5fa9",
  storageBucket: "tripver-d5fa9.appspot.com",
  messagingSenderId: "1028452737839",
  appId: "1:1028452737839:web:832eab197c063de8da77da",
  measurementId: "G-WHZJEGD5CB"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialazing cloud firestore
var db = firebase.firestore();

export { firebase, db, IOS_CLIENT_ID, ANDROID_CLIENT_ID, GOOGLE_API_KEY };

