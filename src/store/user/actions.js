import "firebase/firestore";
import { SET_USER_AUTH } from "../mutation-types";

/**
 * Set user authentication and load (or instantiate) user stories from database
 * @param {Vuex Object} store All the functions and objects from Vuex
 * @param {Object} UserCredential User returned from Firebase Auth
 */
export function loginUser({ commit }, user) {
  commit(SET_USER_AUTH, user);
}

/**
 * Log the user out
 * @param {Vuex Object} store All the functions and objects from Vuex
 */
export function logoutUser({ commit }) {
  commit(SET_USER_AUTH, null);
}
