import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Se você estiver usando autenticação
import 'firebase/compat/firestore'; // Se você estiver usando o Firestore
import * as admin from 'firebase-admin'


const firebaseConfig = {
    apiKey: "AIzaSyD0I10ow9MHKkHAaetQApfDWOSi63oE3Z4",
    authDomain: "testebd-b7b1e.firebaseapp.com",
    projectId: "testebd-b7b1e",
    storageBucket: "testebd-b7b1e.appspot.com",
    messagingSenderId: "26973538966",
    appId: "1:26973538966:web:a01538ba763954b4a6d0b7"
};

const app = firebase.initializeApp(firebaseConfig);

// Opcional: Inicialize outros serviços do Firebase, como autenticação, Firestore, etc.
const auth = firebase.auth();

const firestore = firebase.firestore();

// -------- Admin ----------

const serviceAccount = require('./testebd-b7b1e-firebase-adminsdk-k6rgk-77a52f8b47.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const adminAuth = admin.auth()

export { firebase, auth, firestore, adminAuth };