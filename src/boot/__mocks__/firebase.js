import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const config = {
  apiKey: "key",
  authDomain: "www.firebaseapp.com",
  databaseURL: "https://www.firebaseio.com",
  projectId: "project",
  storageBucket: "www.appspot.com",
  messagingSenderId: "1",
  appId: "1:2345"
};

const userDB = {
  doc: jest.fn()
};

const dbs = {
  users: userDB
};

export const FIRESTORE = {
  collection: jest.fn(dbName => dbs[dbName])
};
