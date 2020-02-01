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

export const createMockSnapshot = () => ({
  data() {
    return {
      test: "Hello World!"
    };
  }
});

export const createMockQueryObj = () => ({
  attributes: {
    where: null,
    orderBy: null,
    limit: null,
    startAt: null
  },
  add: jest.fn(function() {
    return Promise.resolve(this);
  }),
  where: jest.fn(function(...args) {
    this.attributes.where = [...args];
    this.attributes.isMany = true;
    return this;
  }),
  orderBy: jest.fn(function(args) {
    this.attributes.orderBy = args;
    this.attributes.isMany = true;
    return this;
  }),
  limit: jest.fn(function(args) {
    this.attributes.limit = args;
    this.attributes.isMany = true;
    return this;
  }),
  startAt: jest.fn(function(args) {
    this.attributes.startAt = args;
    this.attributes.isMany = true;
    return this;
  }),
  get: jest.fn(function() {
    return Promise.resolve(
      this.attributes.isMany
        ? { docs: [createMockSnapshot()] }
        : createMockSnapshot()
    );
  })
});

const queryDefaults = {
  users: createMockQueryObj,
  stories: createMockQueryObj
};

/**
 * Set the mock collections function for the firestore object with a object to check first for collection mocks
 * @param {Object} queryMocks A mapping of collection names to the mock that should be used. In the form
 *   of { collectionName: createMockQueryObj }
 */
export const setFirestoreCollections = queryMocks => {
  FIRESTORE.collection = jest.fn(
    dbName => queryMocks[dbName]() || queryDefaults[dbName]()
  );
};

/**
 * Sets the firestore collection property back to the default
 */
export const resetFirestoreCollections = () =>
  (FIRESTORE.collection = jest.fn(dbName => queryDefaults[dbName])());

export const FIRESTORE = {
  collection: jest.fn(dbName => queryDefaults[dbName]())
};
