const { connect } = require('../database.js')
const db = connect()
const data = require('../data.json')

const HAMSTERS = 'hamsters'


populate();

// Fill the collection with test data
async function populate() {

    data.forEach(object => {
        let newObject = {
            ...object,

        }
        db.collection(HAMSTERS).add(newObject)
    })
}