import { fireBaseApp } from "./fireBase";
import * as firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(fireBaseApp);

/* Get List (Task) */
export const getCollection = async (collection) => {
  const result = { statusResponse: false, data: null, error: null };
  try {
    const data = await db.collection(collection).get();
    const dataArray = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    result.statusResponse = true;
    result.data = dataArray;
    /*console.log(dataArray);*/
  } catch (ex) {
    result.error = ex;
  }
  return result;
};

/* Add Task */
export const addDocument = async (collection, data) => {
  const result = {statusResponse: false, data: null, error: null,};
  try {
    const response = await db.collection(collection).add(data);
    result.statusResponse = true;
    result.data = {id: response.id, name: response.name,};
  } catch (ex) {
    result.error = ex;
  }
  return result;
};

/* Get Document by Id */
export const getDocumentById = async (collection, id) => {
  const result = {statusResponse: false, data: null, error: null,};
  try {
    const response = await db.collection(collection).doc(id).get();
    result.data = {id: response.id, ...response.data(),};
    result.statusResponse = true;
  } catch (ex) {
    result.error = ex;
  }
  return result;
};

/* Update Document by Id */
export const updateDocumentbyId = async (collection, id, data) => {
  const result = {statusResponse: false, data: null, error: null};
  try {
    await db.collection(collection).doc(id).update(data);
    result.statusResponse = true;
  } catch (ex) {
    result.error = ex;
  }
  return result;
}

/* Delete Document by Id */
export const deleteDocumentById = async(collection, id) => {
  const result = {statusResponse: false, data: null, error: null};
  try {
    await db.collection(collection).doc(id).delete();
    result.statusResponse = true;
  } catch (ex) {
    result.error = ex;
  } 
  return result;
}