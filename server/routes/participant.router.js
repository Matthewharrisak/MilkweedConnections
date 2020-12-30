const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// Route to get all from the Participants table 
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
// GET route to grab participants for partcipants tabel in admin view
router.get("/:id", (req, res) => {
  const queryText = `
  SELECT
    participants.id,
    participants.status,
    participants.first_name,
    participants.last_name,
    participants.dob date,
    participants.phone_num,
    participants.address,
    participants.county,
    participants.ccs,
    participants.choices,
    participants.psp,
    participants.avatar,
    participants.guardian,
    participants.other,
    participants.gender,
    participants.limitations,
    participants.notes
FROM "prov_part"
JOIN providers ON providers.id = prov_part.providers_id
JOIN participants ON participants.id = prov_part.participants_id
WHERE providers_id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      alert("error in participants GET with given id", error);
    });
});

/// route for POSTING participant and service worker at the same time through form 
// the form exists on the clinets WIX page and the "add new participant button"
router.post("/test", async (req, res) => {
  // console.log("in transactional post", req.body);
  
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const sqlAddAccount = `INSERT INTO participants 
    ("status", "first_name", "last_name", "dob", "phone_num", "address", "county", "other", "gender", "limitations", "notes", "ccs", "choices", "psp", "avatar", "guardian") 
    VALUES ('Waitlist', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`;
    // Save the result so we can get the returned value
    const result = await connection.query(sqlAddAccount, [
      req.body.referralFormData.participantRef.first_name,
      req.body.referralFormData.participantRef.last_name,
      req.body.referralFormData.participantRef.dob,
      req.body.referralFormData.participantRef.phone_num,
      req.body.referralFormData.participantRef.address,
      req.body.referralFormData.participantRef.county,
      req.body.referralFormData.participantRef.other,
      req.body.referralFormData.participantRef.gender,
      req.body.referralFormData.participantRef.limitations,
      req.body.referralFormData.participantRef.notes,
      req.body.referralFormData.participantRef.ccs,
      req.body.referralFormData.participantRef.choices,
      req.body.referralFormData.participantRef.psp,
      req.body.referralFormData.participantRef.avatar,
      req.body.referralFormData.participantRef.guardian,
    ]);
    // Get the id from the result - will have 1 row with the id
    const accountId = result.rows[0].id;
    const sqlInitialDeposit = `INSERT INTO service_workers ("name", "phone", "email", "county", "participants_id") 
    VALUES ($1, $2, $3, $4, $5);`;
    await connection.query(sqlInitialDeposit, [
      req.body.referralFormData.serviceWorkerRef.name,
      req.body.referralFormData.serviceWorkerRef.phone,
      req.body.referralFormData.serviceWorkerRef.email,
      req.body.referralFormData.serviceWorkerRef.county,
      accountId,
    ]);
    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.post("/", (req, res) => {
  // console.log("in transactional post", req.body);
  
    const queryText = `INSERT INTO participants 
    ("status", "first_name", "last_name", "dob", "phone_num", "address", "county", "other", "gender", "limitations", "notes", "ccs", "choices", "psp", "avatar", "guardian") 
    VALUES ('Waitlist', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`;
    // Save the result so we can get the returned value
    pool.query(queryText, [
      req.body.first_name,
      req.body.last_name,
      req.body.dob,
      req.body.phone_num,
      req.body.address,
      req.body.county,
      req.body.other,
      req.body.gender,
      req.body.limitations,
      req.body.notes,
      req.body.ccs,
      req.body.choices,
      req.body.psp,
      req.body.avatar,
      req.body.guardian,
    ]).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log(' Error in the POST', error);
      res.sendStatus(500);
    });
  });

module.exports = router;
