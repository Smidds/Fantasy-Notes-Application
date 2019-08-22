import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const config = {
  apiKey: "AIzaSyBs84YYdVyx99O-9M-sJWRsYP6VVv_senc",
  authDomain: "fantasy-notes.firebaseapp.com",
  databaseURL: "https://fantasy-notes.firebaseio.com",
  projectId: "fantasy-notes",
  storageBucket: "fantasy-notes.appspot.com",
  messagingSenderId: "76366305956",
  appId: "1:76366305956:web:7d287920b5d87fe9"
};

export const fireApp = firebase.initializeApp(config);

export const AUTH = fireApp.auth();
export const FIRESTORE = fireApp.firestore();

export default async ({ Vue, store }) => {
  Vue.prototype.$auth = AUTH;
  Vue.prototype.$firestore = FIRESTORE;

  return new Promise(resolve => {
    const unsubscribe = AUTH.onAuthStateChanged(async function(user) {
      store.dispatch("user/loginUser", user);
      unsubscribe();
      resolve();
    });
  });
};
