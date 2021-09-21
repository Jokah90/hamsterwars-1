const express = require("express");
const router = express.Router();
const database = require("../database.js");
const connect = database.connect;
const db = connect();
const HAMSTERS = "hamsters";
const { isHamsterObject, isProperIndex } = require("../validation.js");

//    ENDPOINTS    //

// endpoint GET/ ALL 
router.get("/", async (req, res) => {
  let array = await getAll();
  res.send(array);
});

// endpoint GET/ RANDOM
router.get("/random", async (req, res) => {
  const hamsterArray = await getAllHamsters()
  let randomHamster = hamsterArray[Math.floor(Math.random()*hamsterArray.length)]
  res.status(200).send(randomHamster);
  })

// endpoint GET/ :ID
router.get("/:id", async (req, res) => {
  const maybeUser = await getOne(req.params.id);

  if (!maybeUser) {
    res.status(400).send("Could not find id");
    return
  }
  res.send(maybeUser);
});

// endpoint POST/ ADD NEW :ID
router.post("/", async (req, res) => {
  let body = await req.body;
  if (!isHamsterObject(body)) {
    res.status(400).send("Bad request");
    return;
  }
  await addOne(body);
  res.sendStatus(200);
});

// endpoint PUT/ CHANGE OBJECT
router.put("/:id", async (req, res) => {
  const maybe = await req.body;
  let updateHamster = await getOne(req.params.id);
  if (!updateHamster) {
    res.sendStatus(404)
    return
  }
  if (!isHamsterObject(req.body)) {
    res.status(400).send("This is a bad request");
    return;
  }
  await updateOne(req.params.id, maybe);
  res.sendStatus(200);
 
});

//endpoint DELETE/ :ID
router.delete("/:id", async (req, res) => {
  let hamsterId = await deleteOne(req.params.id);
  res.send(200);
});

// ASYNC FUNCTIONS

//SCRIPT GET ALL
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

//SCRIPT ASYNC GET:ID
async function getOne(id) {
  const docId = id;
  const docSnapshot = await db.collection(HAMSTERS).doc(docId).get();

  if (docSnapshot.exists) {
    return await docSnapshot.data();
  } else {
    return null;
  }
}

//SCRIPT ASYNC POST
async function addOne(body) {
  console.log("Add a new document...");
  const docRef = await db.collection(HAMSTERS).add(body);
  console.log("Added document with the id " + docRef.id);
}

//SCRIPT ASYNC PUT
async function updateOne(id, object) {
  const docRef = db.collection(HAMSTERS).doc(id);
  const settings = { merge: true };

  docRef.set(object, settings);
}

//SCRIPT ASYNC DELETE
async function deleteOne(id) {
  const docId = id || "qFNPMtqJyPdnOy18L75r";

  const docRef = db.collection(HAMSTERS).doc(docId);
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    return null;
  }
  docRef.delete();
}
// //Script RANDOM
// const getRandom = async () => {
//  return randomHamster
// }

module.exports = router;
