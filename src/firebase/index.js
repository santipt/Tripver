import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4Nocc5WBnFMGtfRWlP6tU-jzpyDdtvMg",
    authDomain: "loginreactnative-5e2ae.firebaseapp.com",
    projectId: "loginreactnative-5e2ae",
    storageBucket: "loginreactnative-5e2ae.appspot.com",
    messagingSenderId: "981235195781",
    appId: "1:981235195781:web:b1e735b3cbe8f726faaeec"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };