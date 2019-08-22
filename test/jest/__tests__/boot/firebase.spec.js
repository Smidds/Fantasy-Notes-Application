/* eslint-disable */
/**
 * @jest-environment jsdom
 */
import firebaseInit from "../../../../src/boot/firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

describe("firebase boot", () => {
  beforeAll(() => {
    jest.mock("firebase");
    jest.mock("firebase/auth");
    jest.mock("firebase/firestore");
  });

  it("sets the user after login", () => {
    let Vue = {};
    let store = {
      dispatch: jest.fn((...args) => args)
    };

    firebase.auth.mockResolvedValue({
      onAuthStateChanged: jest.fn(fn => {})
    });

    firebaseInit({ Vue, store }).then(() => {
      expect();
    });
  });
});
