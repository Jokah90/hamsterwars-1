const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

addOne();



async function addOne() {
    console.log('Add a new document...');
    const object = {
        "name": "Kurt",
        "age": 1,
        "favFood": "cheesecake",
        "loves": "gå i hamsterhjulet",
        "imgName": "hamster-41.jpg",
        "wins": 0,
        "defeats": 0,
        "games": 0
    }

    const docRef = await db.collection(HAMSTERS).add(object)
    console.log('Added document with the id ' + docRef.id);
}