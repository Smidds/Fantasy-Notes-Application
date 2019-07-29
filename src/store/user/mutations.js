export function setUserAuth(state, user) {
  state.isUserAuthenticated = !!user;
  state.userId = user ? user.uid : null;
}
