const express = require("express");
const router = express.Router();
const { db } = require("../database.js");
const HAMSTERS = "hamsters";
const MATCHES = "matches";

const { isHamsterObject, isHamsterChanged } = require("../validation.js");

//    ENDPOINTS    //

// endpoint GET/ ALL
router.get("/", async (req, res) => {
  let array = await getAll(HAMSTERS);
  res.send(array);
});

// endpoint GET/ RANDOM
router.get("/random", async (req, res) => {
  const hamsterArray = await getAll(HAMSTERS);
  let randomHamster =
    hamsterArray[Math.floor(Math.random() * hamsterArray.length)];
  res.status(200).send(randomHamster);
});

// endpoint GET/ CUTEST
router.get("/cutest", async (req, res) => {
  let winsAndLosers = await cutest();
  res.status(200).send(winsAndLosers);
});

// endpoint GET/ :ID
router.get("/:id", async (req, res) => {
  try {
    const maybe = await getOne(req.params.id, HAMSTERS);
    if (!maybe) {
      res.sendStatus(404);
    } else {
      res.send(maybe);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/matches/:id", async (req, res) => {
  const maybe = await getOne(req.params.id, MATCHES);
  if (!maybe) {
    res.sendStatus(404);
  } else {
    res.send(maybe);
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
async function getAll(collection) {
  const docRef = db.collection(collection);
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
async function getOne(id, collection) {
  const docRef = await db.collection(collection).doc(id).get();
  // const docSnapshot = await docRef.get();

  if (docRef.exists) {
    const data = await docRef.data();
    data.id = docRef.id;

    return data;
  }
  return false;
}

async function cutest() {
  const docSnapshot = await db.collection(HAMSTERS).get();

  let resultArray = [];

  await docSnapshot.forEach(async (docRef) => {
    const data = await docRef.data();
    data.id = docRef.id;

    let diffResult = data.wins - data.defeats;
    let newResult = { id: data.id, diff: diffResult };
    resultArray.push(newResult);
  });

  resultArray.sort((a, b) => {
    return b.diff - a.diff;
  });

  let topDiff = resultArray.splice(0, 1);
  let cutest = [];

  for (let i = 0; i < topDiff.length; i++) {
    let hamster = await db.collection(HAMSTERS).doc(topDiff[i].id).get();
    let data = hamster.data();
    cutest.push(data);
  }

  return cutest;
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
  const docRef = await db.collection(HAMSTERS).doc(id);
  const docSnapshot = await docRef.get();

  if (!docSnapshot.exists) {
    return false;
  }
  await docRef.delete();
  return docSnapshot;
}


module.exports = router;
