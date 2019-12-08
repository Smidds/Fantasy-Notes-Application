export function setUserAuth(state, user) {
  state.isUserAuthenticated = !!user;
  state.userId = user ? user.uid : null;
}

export function setUserStories(state, stories) {
  state.stories.memberOf = stories.memberOf;
  state.stories.ownerOf = stories.ownerOf;
}
