const { connect } = require("../database.js");
const db = connect();

const HAMSTERS = "hamsters";

deleteOne();

async function deleteOne(id) {
  console.log("Deleting a document...");
  const docId = id || "X90v5YvT8bAQ3PmzmXjU";

  const docRef = db.collection(HAMSTERS).doc(docId);
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    return null;
  }
  docRef.delete();
}
