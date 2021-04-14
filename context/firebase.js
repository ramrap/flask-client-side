import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyBzPeYt4AIyNTP2wyNOYzUMJhFukInnS5c",
  authDomain: "radiologist-deep-learning.firebaseapp.com",
  projectId: "radiologist-deep-learning",
  storageBucket: "radiologist-deep-learning.appspot.com",
  messagingSenderId: "13250935152",
  appId: "1:13250935152:web:b3a686e4fbbba0c3ec77b5",
  measurementId: "G-HZDR440C22"
}

export const loadFirebase = () => {
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
  return firebase
}

export const getIdToken = async () => {
  let firebase = loadFirebase();
  return new Promise(resolve => {
      firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(idToken => {
              resolve(idToken);
          })
          .catch(err => {
              resolve(null);
          });
  });
};
