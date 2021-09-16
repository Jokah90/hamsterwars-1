const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

clear();

async function clear() {
    const usersRef = db.collection(HAMSTERS)
    const usersSnapshot = await usersRef.get()

    if (usersSnapshot.empty) {
        return
    }

    usersSnapshot.forEach(docRef => {
        usersRef.doc(docRef.id).delete()
        // Vi behöver inte await - inget att vänta på
    })
}