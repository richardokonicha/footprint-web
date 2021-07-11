import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const clientCredentials = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}

if (!firebase.apps.length) {
    firebase.initializeApp(clientCredentials)
}

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const db = firebase.firestore()

export const signInWithGoogle = () => {
    firebase.auth().signInWithPopup(provider)
}

export const signOut = () => {
    firebase.auth().signOut()
}

export default firebase