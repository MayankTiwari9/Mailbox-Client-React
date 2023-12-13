import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVfldNn4YD_LsZnwz4Mz0G_Op7o76cgR0",
  authDomain: "mailbox-client-react.firebaseapp.com",
  databaseURL: "https://mailbox-client-react-default-rtdb.firebaseio.com",
  projectId: "mailbox-client-react",
  storageBucket: "mailbox-client-react.appspot.com",
  messagingSenderId: "1094869749236",
  appId: "1:1094869749236:web:9c8e7e9d73aba4aca27da1",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
