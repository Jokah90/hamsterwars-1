const express = require("express");
const router = express.Router();
const { db } = require("../database.js");

const MATCHES = "matches";

router.get("/", (req, res) => {
    res.send(200)
});

module.exports = router;
