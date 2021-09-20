const express = require('express')
const router = express.Router()

const database = require('../database.js')
const connect = database.connect
const db = connect()
const HAMSTERS = 'hamsters'
const { isHamsterObject } = require('../validation.js')

// GET /All Hamsters
router.get('/', async (req, res) => {
    let array = await getAll()
    res.send(array)
})

// GET/hamster/:id
router.get('/:id', async (req, res) => {
    const maybeUser = await getOne(req.params.id)
    res.send(maybeUser)
})

// GET/hamster/:id
async function getOne(id) {
    const docRef = db.collection(HAMSTERS).doc(id)
    const docSnapshot = await docRef.get()
    if (docSnapshot.exists) {
        return await docSnapshot.data()
    } else {
        return null
    }
}

// POST
router.post('/', async (req, res) => {

    let body = await req.body
    if (!isHamsterObject(body)) {
        res.status(400).send('Bad request')
        return
    }
    await addOne(body)
    res.sendStatus(200)
})

async function addOne(body) {
    console.log('Add a new document...');
    const docRef = await db.collection(HAMSTERS).add(body)
    console.log('Added document with the id ' + docRef.id);
}


//PUT /hamster
router.put('/:id', async (req, res) => {
    const maybe = req.body
    if (!isHamsterObject(maybe)) {
        res.status(400).send('The request is not an object!')
        return
    }
    await updateOne(req.params.id, maybe)
    res.sendstatus(200)
})

async function updateOne(id, object) {
    const docRef = db.collection(HAMSTERS).doc.id
    docRef.set(id, object)
}



















async function getAll() {
    const docRef = db.collection(HAMSTERS)
    const docSnapshot = await docRef.get()

    if (docSnapshot.empty) {
        return []
    }

    const array = []
    await docSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        data.id = docRef.id
        array.push(data)
    })
    return array
}





module.exports = router