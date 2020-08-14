import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_API_KEY,
  authDomain: "to-do-ed0c4.firebaseapp.com",
  databaseURL: "https://to-do-ed0c4.firebaseio.com",
  projectId: "to-do-ed0c4",
  storageBucket: "to-do-ed0c4.appspot.com",
  messagingSenderId: "947424543252",
  appId: "1:947424543252:web:eb98140db1f6396fd25d01",
};
// Initialize Firebase
const Fire = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export default Fire;
