export function loginUser({ commit }, user) {
  commit("setUserAuth", user);
}

export function logoutUser({ commit }) {
  commit("setUserAuth", null);
}
