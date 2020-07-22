import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAyvHk3UO28EdGlW6wc5zA-cL-rtcP3l4E",
  authDomain: "react-ecoomerce.firebaseapp.com",
  databaseURL: "https://react-ecoomerce.firebaseio.com",
  projectId: "react-ecoomerce",
  storageBucket: "react-ecoomerce.appspot.com",
  messagingSenderId: "595768360170",
  appId: "1:595768360170:web:6e83bc5be4bacbd7a0eb93",
  measurementId: "G-5D2VNGJRZ5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
