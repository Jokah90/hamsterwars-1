const express = require("express");
const router = express.Router();
const database = require("../database.js");
const connect = database.connect;
const db = connect();
const HAMSTERS = "hamsters";
const { isHamsterObject, isHamsterChanged } = require("../validation.js");

//    ENDPOINTS    //

// endpoint GET/ ALL
router.get("/", async (req, res) => {
  let array = await getAll();
  res.send(array);
});

// endpoint GET/ RANDOM
router.get("/random", async (req, res) => {
  const hamsterArray = await getAll();
  let randomHamster =
    hamsterArray[Math.floor(Math.random() * hamsterArray.length)];
  res.status(200).send(randomHamster);
});

// endpoint GET/ :ID
router.get("/:id", async (req, res) => {
  const maybeUser = await getOne(req.params.id);

  if (!maybeUser) {
    res.sendStatus(404);
    return;
  } else {
    res.status(200).send(maybeUser);
  }
});

// endpoint POST/ ADD NEW :ID
router.post("/", async (req, res) => {
  let maybe = req.body;
  if (!isHamsterObject(maybe)) {
    res.sendStatus(400);
    return;
  }
  const newHamster = await addOne(maybe);
  res.status(200).send(newHamster);
});

// endpoint PUT/ CHANGE OBJECT
router.put("/:id", async (req, res) => {
  const maybe = req.body;
  if (!isHamsterChanged(maybe)) {
    res.sendStatus(400);
    return;
  }

  const newHamster = await updateOne(req.params.id, maybe);
  if (!newHamster) {
    res.sendStatus(404);
    return;
  } else {
    res.sendStatus(200);
  }
});

//endpoint DELETE/ :ID
router.delete("/:id", async (req, res) => {
  let hamsterId = await deleteOne(req.params.id);
  if (!hamsterId) {
    res.sendStatus(404);
    return;
  } else {
    res.status(200).send(hamsterId.id);
  }
});

//******************** ASYNC FUNCTIONS ******************************// */

// SCRIPT GET ALL
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

// //SCRIPT ASYNC GET:ID
async function getOne(id) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();

  if (docSnapshot.exists) {
    return await docSnapshot.data();
  } else {
    return null;
  }
}

//SCRIPT ASYNC POST
async function addOne(body) {
  const docRef = await db.collection(HAMSTERS).add(body);
  const hamster = { id: docRef.id };
  return hamster;
}

// SCRIPT ASYNC PUT
async function updateOne(id, body) {
  const docRef = await db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();

  if (docSnapshot.exists) {
    const settings = { merge: true };
    const data = await db.collection(HAMSTERS).doc(id).set(body, settings);
    return data;
  }

  return false;
}

// SCRIPT ASYNC DELETE
async function deleteOne(id) {
  const docId = id || "qFNPMtqJyPdnOy18L75r";

  const docRef = db.collection(HAMSTERS).doc(docId);
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    return false;
  }
  docRef.delete();
  return docSnapshot;
}


module.exports = router;
