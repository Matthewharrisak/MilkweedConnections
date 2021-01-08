const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// route to get all data from Service Worker table
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from service_workers 
   JOIN participants ON service_workers.participants_id = participants.id;
  `;
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
