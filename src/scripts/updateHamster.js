const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

updateOne();


async function updateOne(id) {
    console.log('Update a document...');
    const docId = id || '0AGSfrcjiyFvug7sU01V'



    const settings = { merge: true }
    await db.collection(HAMSTERS).doc(docId).set(updates, settings)
}