const firebaseApp = jest.genMockFromModule("firebase/app");

firebaseApp.initializeApp = jest.fn(config => ({
  ...config,
  auth: jest.fn(() => jest.fn()),
  firestore: jest.fn(() => jest.fn())
}));

firebaseApp.auth = {
  GoogleAuthProvider: { PROVIDER_ID: 1 },
  FacebookAuthProvider: { PROVIDER_ID: 2 }
};

export default firebaseApp;
