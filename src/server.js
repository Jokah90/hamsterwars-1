// importera paket
const express = require('express')
const app = express()
const router = require('./routes/router.js')
const cors = require('cors')

let count = 0;

// konfigurera
const PORT = process.env.PORT || 1337;
app.use(cors());

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logger
app.use((req, res, next) => {
  count++;
  console.log(`${count} ${req.method}  ${req.url}`, req.body);

  next();
});

// app.use('/web', express.static(__dirname + '/../frontend'))


// routes / endpoints
app.use('/hamsters', router)


// starta servern
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})