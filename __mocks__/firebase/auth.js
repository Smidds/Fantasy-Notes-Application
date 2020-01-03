export const dummyUser = {
  name: "Dummy",
  likes: "Pie"
};

export const unsubscribe = jest.fn((...args) => args);

export const onAuthStateChanged = jest.fn(callback => {
  callback(dummyUser);
  return unsubscribe;
});

export const signInWithEmailAndPassword = jest.fn(() =>
  Promise.resolve({ user: dummyUser })
);

export const createUserWithEmailAndPassword = jest.fn(() =>
  Promise.resolve({ user: dummyUser })
);

export default jest.fn(() => ({
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
}));
