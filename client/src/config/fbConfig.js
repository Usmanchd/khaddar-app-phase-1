import * as firebase from "firebase/app";
import "firebase/storage";

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCAtj10_br_plkVZz6Q_gtLN-kTB29KDrI",
  authDomain: "khaddarapp-5268c.firebaseapp.com",
  databaseURL: "https://khaddarapp-5268c.firebaseio.com",
  projectId: "khaddarapp-5268c",
  storageBucket: "khaddarapp-5268c.appspot.com",
  messagingSenderId: "427605488971",
  appId: "1:427605488971:web:7f34d6e8c740be7bfc24ce",
  measurementId: "G-VMQJ1J37CM",
};
firebase.initializeApp(config);

export default firebase;
