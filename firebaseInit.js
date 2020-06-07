const firebase = require("firebase");
require("firebase/firestore");

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} = process.env;

const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const getItems = async () => {
  const itemArray = [];
  const items = await db.collection("ITEM_RECORDS").get();
  items.docs.forEach((doc) => {
    itemArray.push({
      id: doc.id,
      itemName: doc.data()["itemName"],
      date: doc.data()["createDate"],
    });
  });
  return itemArray;
};

module.exports = {
  getItems,
};
