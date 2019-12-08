import FIRESTORE from "../../boot/firebase";

export function loadStories({ rootState }) {
  const userId = rootState.auth.userId;
  FIRESTORE.collection("users").doc(userId);
}
