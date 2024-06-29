import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCjOfLcSM0IWlnU5VOxPvXL3WILexEKFUw",
    authDomain: "notes-keep-d245c.firebaseapp.com",
    projectId: "notes-keep-d245c",
    storageBucket: "notes-keep-d245c.appspot.com",
    messagingSenderId: "326184834532",
    appId: "1:326184834532:web:d8948738176705f6e5e3f1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };