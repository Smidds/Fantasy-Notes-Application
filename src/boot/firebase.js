import firebase from "firebase/app";
// eslint-disable-next-line no-unused-vars
import auth from "firebase/auth";

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

export default async ({ Vue }) => {
  Vue.prototype.$auth = AUTH;
};
