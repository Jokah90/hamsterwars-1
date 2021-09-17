// importera paket
const express = require('express')
const app = express()
const router = require('./src/routes/router.js')
const cors = require('cors')



// konfigurera
const PORT = process.env.PORT || 1337
app.use(cors())

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Logger
app.use((req, res, next) => {
    console.log(`${req.method}  ${req.url}`, req.body);
    next()
})

app.use('/web', express.static(__dirname + '/../frontend'))

app.get('/', (req, res) => {
    console.log('The server is working!')
})
// routes / endpoints
app.use('/', router)

// starta servern
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})