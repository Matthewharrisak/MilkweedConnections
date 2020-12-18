const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// route to get all data from Service Worker table
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM service_workers;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      alert("error in participants GET", error);
    });
});


module.exports = router;
