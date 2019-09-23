import "firebase/firestore";
import { FIRESTORE } from "../../boot/firebase";

/**
 * Set user authentication and load (or instantiate) user stories from database
 * @param {Vuex Object} store All the functions and objects from Vuex
 * @param {Object} UserCredential User returned from Firebase Auth
 */
export function loginUser({ commit }, user) {
  const userDB = FIRESTORE.collection("users");
  commit("setUserAuth", user);
  userDB
    .doc(user.uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      } else {
        const newUserData = {
          memberOf: [],
          ownerOf: []
        };

        return userDB
          .doc(user.uid)
          .set(newUserData)
          .then(() => {
            return newUserData;
          })
          .catch(err => {
            console.error("Failure to add a new user to database: ", err);
          });
      }
    })
    .then(userData => {
      // Add the userData to user store module
      commit("setUserStories", userData);
    })
    .catch(err => {
      console.error("Failure to obtain user data: ", err);
    });
}

/**
 * Log the user out
 * @param {Vuex Object} store All the functions and objects from Vuex
 */
export function logoutUser({ commit }) {
  commit("setUserAuth", null);
  commit("setUserStories", {});
}
