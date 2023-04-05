import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA4MFNQ88hfLiw8w_DNkqXj-C1zHEAYYYw',
  authDomain: 'rn-socialapp-920f5.firebaseapp.com',
  projectId: 'rn-socialapp-920f5',
  storageBucket: 'rn-socialapp-920f5.appspot.com',
  messagingSenderId: '690189905637',
  appId: '1:690189905637:web:575ac6a108d70c3f2dae0c',
  measurementId: 'G-3XW5806210',
};

export default firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export { auth };
