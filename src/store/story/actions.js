import { FIRESTORE } from "../../boot/firebase";
import { ADD_STORY, ADD_STORIES, SET_LOADED_STORIES } from "../mutation-types";

export function loadMoreStories({ commit, rootState, state }) {
  const userId = rootState.user.userId;
  const query = FIRESTORE.collection("stories")
    .where("ownerId", "==", userId)
    .orderBy("name")
    .limit(state.limitAmount)
    .startAt(state.currentPaginationIndex)
    .get();
  return query.then(docSnapshots => {
    commit(ADD_STORIES, docMapper(docSnapshots.docs));
  });
}

export function loadStories({ commit, rootState, state }) {
  const userId = rootState.user.userId;
  const query = FIRESTORE.collection("stories")
    .where("ownerId", "==", userId)
    .orderBy("name")
    .limit(state.limitAmount)
    .get();
  return query.then(docSnapshots => {
    commit(SET_LOADED_STORIES, docMapper(docSnapshots.docs));
  });
}

export function createNewStory({ commit, rootState }, payload) {
  const userId = rootState.user.userId;
  return FIRESTORE.collection("stories")
    .add({
      ...payload,
      ownerId: userId
    })
    .then(docRef => docRef.get())
    .then(doc => {
      commit(ADD_STORY, doc.data());
    });
}

export const docMapper = documents => documents.map(doc => doc.data());
