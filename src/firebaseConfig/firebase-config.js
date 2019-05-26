import * as firebase from "firebase";

const sgcmConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

export default firebase.initializeApp(sgcmConfig);
