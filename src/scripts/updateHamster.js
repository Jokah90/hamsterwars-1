const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

updateOne();


async function updateOne(id) {
    console.log('Update a document...');
    const docId = id || 'zeX3RdeUK0WoG8hxNj3C'

    const updates = {
        name: 'Harry Persson'
    }

    const settings = { merge: true }
    await db.collection(HAMSTERS).doc(docId).set(updates, settings)
}