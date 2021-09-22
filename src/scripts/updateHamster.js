const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

updateOne();

async function updateOne(id) {
  console.log("Update a document...");
  const docId = id || "NG1ATK9p6UthKsIyy4lt";

  const updates = {
    wins: 0,
    games: 0,
    favFood: "banan",
    loves: "springa i hamsterhjulet",
    defeats: 0,
    imgName: "hamster-41.jpg",
    name: "Harald",
    age: 1,
  };
  const settings = { merge: true };
  await db.collection(HAMSTERS).doc(docId).set(updates, settings);
  console.log("Updated document with new data: ", updates);
}
