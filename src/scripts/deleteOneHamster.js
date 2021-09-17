const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'
deleteOne();


async function deleteOne(id) {
    console.log('Deleting a document...');
    const docId = id || '9kRTQftQGGX69KngIQSC'

    const docRef = db.collection(HAMSTERS).doc(docId)
    const docSnapshot = await docRef.get()
    console.log('Document exists? ', docSnapshot.exists);
    const result = await docRef.delete()
}