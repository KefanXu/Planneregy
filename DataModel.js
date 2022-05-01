import firebase from "firebase/compat/app";
import { firebaseConfig } from "./secret";

class DataModel {
    constructor() {
        if (firebase.app.length === 0) {
            firebase.initializeApp(firebaseConfig);
            
        }
    }
}

let theDataModel = undefined;

export function getDataModel() {
  if (!theDataModel) {
    theDataModel = new DataModel();
  }
  return theDataModel;
}