import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';
import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, GOOGLE_API_KEY, firebaseConfig} from '../../API_KEYS'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialazing cloud firestore
var db = firebase.firestore();

export { firebase, db, IOS_CLIENT_ID, ANDROID_CLIENT_ID, GOOGLE_API_KEY };

