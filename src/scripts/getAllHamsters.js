const database = require('../database.js')
const connect = database.connect
const db = connect()

const HAMSTERS = 'hamsters'

getAll();



async function getAll() {
    console.log('Retrieving all documents from database...');

    const docRef = db.collection(HAMSTERS)

    const docSnapshot = await docRef.get()

    if (docSnapshot.empty) {
        console.log('No documents in collection.');
        return
    }

    const array = []

    await docSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        data.id = docRef.id
        array.push(data)
    })

    console.log('Data from database:', array);
    return array
}

