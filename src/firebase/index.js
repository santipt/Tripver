import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

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

export { firebase };