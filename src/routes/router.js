const express = require("express");
const router = express.Router();
const database = require("../database.js");
const connect = database.connect;
const db = connect();
const HAMSTERS = "hamsters";
const { isHamsterObject, isProperIndex } = require("../validation.js");

//    ENDPOINTS    //

// endpoint
router.get("/", async (req, res) => {
  let array = await getAll();
  res.send(array);
});

// endpoint
router.get("/:id", async (req, res) => {
  const maybeUser = await getOne(req.params.id);

  if (!maybeUser) {
    res.status(400).send("Could not find id");
  }
  res.send(maybeUser);
});

// endpoint
router.post("/", async (req, res) => {
  let body = await req.body;
  if (!isHamsterObject(body)) {
    res.status(400).send("Bad request");
    return;
  }
  await addOne(body);
  res.sendStatus(200);
});

// endpoint
router.put("/:id", async (req, res) => {
  const maybe = req.body;
  if (!isHamsterObject(maybe)) {
    res.status(400).send("This is a bad request");
    return;
  }
  await updateOne(req.params.id, maybe);
  res.sendstatus(200);
});

router.delete("/:id", async (req, res) => {
  let hamsterId = await deleteOne(req.params.id);
  res.send(200);
});

// ASYNC FUNCTIONS

//Script GET ALL
async function getAll() {
  const docRef = db.collection(HAMSTERS);
  const docSnapshot = await docRef.get();

  if (docSnapshot.empty) {
    return [];
  }

  const array = [];
  await docSnapshot.forEach(async (docRef) => {
    const data = await docRef.data();
    data.id = docRef.id;
    array.push(data);
  });
  return array;
}

//Script GET :ID
async function getOne(id) {
  const docId = id;
  const docSnapshot = await db.collection(HAMSTERS).doc(docId).get();

  if (docSnapshot.exists) {
    return await docSnapshot.data();
  } else {
    return null;
  }
}

//Script ADD ONE
async function addOne(body) {
  console.log("Add a new document...");
  const docRef = await db.collection(HAMSTERS).add(body);
  console.log("Added document with the id " + docRef.id);
}

//Script UPDATE :ID
async function updateOne(id, object) {
  const docRef = db.collection(HAMSTERS).doc.id;
  docRef.set(id, object);
}

async function deleteOne(id) {
  const docId = id || "Hog7B6RHyTs0NuUwqZgg";

  const docRef = db.collection(HAMSTERS).doc(docId);
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    return null;
  }
  docRef.delete();
}

module.exports = router;
