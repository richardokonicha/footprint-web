// import firebase from 'firebase/app'

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';


export const clientCredentials = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}
const app = initializeApp(clientCredentials);
export const firestore = getFirestore(app)

// if (!firebase.apps.length) {
//     firebase.initializeApp(clientCredentials)
// }
//     firebase.initializeApp(clientCredentials)

// export const provider = new firebase.auth.GoogleAuthProvider()
const provider = new GoogleAuthProvider();

// export const auth = firebase.auth()
// export const db = firebase.firestore()



export const signInWithGoogle = () => {
    // firebase.auth().signInWithPopup(provider)
    const auth = getAuth();

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });



}


export const auth = getAuth();

export const signOutfn = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
}



// export default firebase