export const dummyUser = {
  name: "Dummy",
  likes: "Pie"
};

export const unsubscribe = jest.fn((...args) => args);

export const onAuthStateChanged = jest.fn(callback => {
  callback(dummyUser);
  return unsubscribe;
});

export default jest.fn(() => ({
  onAuthStateChanged
}));
