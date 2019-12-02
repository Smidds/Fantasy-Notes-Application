/* eslint-disable */
/**
 * @jest-environment jsdom
 */
jest.mock("firebase");

import firebaseInit from "../../../../src/boot/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

describe("firebase boot", () => {
  beforeAll(() => {
    firebase.initializeApp = (config) => ({
      ...config,
      auth:jest.fn(() => ({
        onAuthStateChanged: jest.fn((...args) => args)
      })),
      firestore: jest.fn((...args) => args)
    })
  });

  it("sets the user after login", () => {
    let Vue = {};
    let store = {
      dispatch: jest.fn((...args) => args)
    };

    firebaseInit({ Vue, store }).then(() => {
      expect();
    });
  });
});
