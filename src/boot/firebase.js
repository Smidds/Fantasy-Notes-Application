import firebase from "firebase/app";
import "firebase/auth";

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

export default async ({ Vue, store }) => {
  Vue.prototype.$auth = AUTH;

  return new Promise(resolve => {
    fireApp.auth().onAuthStateChanged(user => {
      store.commit("auth/setUserAuth", user ? true : false);
      resolve();
    });
  });
};
