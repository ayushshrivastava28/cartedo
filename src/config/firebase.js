import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC0dPKcUIxuNSerU_8Tl-MQy6HoTxISLmY",
    authDomain: "cartedo-3c35a.firebaseapp.com",
    projectId: "cartedo-3c35a",
    storageBucket: "cartedo-3c35a.appspot.com",
    messagingSenderId: "599057726094",
    appId: "1:599057726094:web:082a2c71816b2576efe7df",
    measurementId: "G-PSCMHMS9CY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;