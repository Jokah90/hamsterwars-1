const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

getOne();


// Hämta hamster från databasen
async function getOne(id) {
    console.log('Looking for one hamster...');
    const docId = id || 'zeX3RdeUK0WoG8hxNj3C'

    const docSnapshot = await db.collection(HAMSTERS).doc(docId).get()

    if (!docSnapshot.exists) {
        console.log('Could not find it!');
        return
    }
    const data = await docSnapshot.data()
    console.log('Found: ', data);
    return data
}


module.exports = getOne