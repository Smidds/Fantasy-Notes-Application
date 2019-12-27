const firebaseApp = jest.genMockFromModule("firebase/app");

firebaseApp.initializeApp = jest.fn(config => ({
  ...config,
  auth: jest.fn(() => jest.fn()),
  firestore: jest.fn(() => jest.fn())
}));

export default firebaseApp;
