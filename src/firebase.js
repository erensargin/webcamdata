import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1nMPZTuEExyIKhiEpdcmBMbRH1aCpfMA",
  authDomain: "emotional-analysis-f310d.firebaseapp.com",
  databaseURL: "https://emotional-analysis-f310d.firebaseio.com",
  projectId: "emotional-analysis-f310d",
  storageBucket: "emotional-analysis-f310d.appspot.com",
  messagingSenderId: "487765921209",
  appId: "1:487765921209:web:21dc3e6bec0af1d9ea3a68",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const storage = firebase.storage();

export { db, storage };
