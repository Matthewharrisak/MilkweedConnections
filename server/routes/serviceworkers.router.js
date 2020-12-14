const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
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

/**
 * POST route template
 */
// router.post("/", (req, res) => {
//     // console.log(req.body);
//   const queryText = `INSERT INTO service_workers ("name", "phone", "email", "county", "partcipants_id") 
//   VALUES ( $1, $2, $3, $4, $5);`;
//   pool
//     .query(queryText, [
//       req.body.first_name,
//       req.body.last_name,
//       req.body.dob,
//       req.body.phone_num,
//       req.body.address,
//     ])
//     .then((result) => {
//       res.sendStatus(201);
//     })
//     .catch((error) => {
//       res.sendStatus(500);
//       console.log("error in service worker post", error);
//     });
// });

module.exports = router;
