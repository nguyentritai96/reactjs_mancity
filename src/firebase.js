import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


const firebaseConfig = {
  // use database and storage
  apiKey: "AIzaSyBtYxF9niPGxRi-89Zb0C7q9d7iXH0vni0",
  authDomain: "man-city-a0967.firebaseapp.com",
  databaseURL: "https://man-city-a0967.firebaseio.com",
  projectId: "man-city-a0967",
  storageBucket: "gs://man-city-a0967.appspot.com/",
  messagingSenderId: "1073898757631",
  appId: "1:1073898757631:web:4c38506545b251a9e75bca"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database(); // connect database
const firebaseMatches = firebaseDB.ref('matches'); // truy vấn đến dữ liệu
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');


export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers
}