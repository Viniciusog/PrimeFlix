import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Se você estiver usando autenticação
import 'firebase/compat/firestore'; // Se você estiver usando o Firestore
import * as admin from 'firebase-admin'
import 'dotenv/config';


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

const serviceAccountObj = {
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_x509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_x509_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN,
}

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccountObj))),
});

const adminAuth = admin.auth()

export { firebase, auth, firestore, adminAuth };