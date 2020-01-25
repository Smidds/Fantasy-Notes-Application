import { SET_USER_AUTH } from "../mutation-types";

export default {
  [SET_USER_AUTH](state, user) {
    state.isUserAuthenticated = !!user;
    state.userId = user ? user.uid : null;
  }
};
