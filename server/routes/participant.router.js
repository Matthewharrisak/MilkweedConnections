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

module.exports = router;
