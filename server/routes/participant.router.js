const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM participants`;
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

/**
 * POST route template
 */
router.post("/", (req, res) => {
    // console.log(req.body);
  const queryText = `INSERT INTO participants ("status", "first_name", "last_name", "dob", "phone_num", "address", "county", "service", "gender", "limitations", "notes") VALUES ('Inactive', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  pool
    .query(queryText, [
      req.body.first_name,
      req.body.last_name,
      req.body.dob,
      req.body.phone_num,
      req.body.address,
      req.body.county,
      req.body.service,
      req.body.gender,
      req.body.limitations,
      req.body.notes,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in add book", error);
    });
});

module.exports = router;
