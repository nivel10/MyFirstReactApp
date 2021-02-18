import { fireBaseApp } from "./fireBase";
import * as firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(fireBaseApp);

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
