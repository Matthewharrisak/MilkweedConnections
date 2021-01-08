const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Route to get all from the Participants table 
router.get("/", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants
  JOIN service_workers ON participants.id = service_workers.participants_id ORDER BY status, last_name;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET", error);
    });
});

// Route to get all from the Participants and their providers from the table 
router.get("/part_prov", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from providers
JOIN prov_part ON providers_id = providers.id;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET 0", error);
    });
});

// Route to get all from the Participants table 
router.get("/name_ascend", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants
  JOIN service_workers ON participants.id = service_workers.participants_id ORDER BY last_name;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET 1", error);
    });
});

// Route to get all from the Participants table 
router.get("/name_decend", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants
  JOIN service_workers ON participants.id = service_workers.participants_id ORDER BY last_name DESC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET 2", error);
    });
});

// Route to get all from the Participants table 
router.get("/county_ascend", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants
  JOIN service_workers ON participants.id = service_workers.participants_id ORDER BY participants.county ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET 3", error);
    });
});

// Route to get all from the Participants table 
router.get("/county_decend", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants
  JOIN service_workers ON participants.id = service_workers.participants_id ORDER BY participants.county DESC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET", error);
    });
});

router.get("/ccs", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants 
  JOIN service_workers ON participants.id = service_workers.participants_id WHERE ccs = true ORDER BY last_name ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET", error);
    });
});

router.get("/choices", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants 
  JOIN service_workers ON participants.id = service_workers.participants_id WHERE choices = true ORDER BY last_name ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET", error);
    });
});

// select all participants with psp as true
router.get("/psp", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants 
  JOIN service_workers ON participants.id = service_workers.participants_id WHERE psp = true ORDER BY last_name ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in participants GET", error);
    });
});

// GET route to grab participants for partcipants tabel in admin view
router.get("/:id", rejectUnauthenticated, (req, res) => {
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
      console.log("error in participants GET with given id", error);
    });
});

router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const queryText = `DELETE FROM service_workers WHERE participants_id = $1;`;
    pool.query(queryText, [req.params.id]);
    const sqlInitialDeposit = `DELETE FROM participants WHERE participants.id = $1;`;
    await connection.query(sqlInitialDeposit, [req.params.id]);
    await connection.query("COMMIT");
    res.sendStatus(201);
  } catch (err) {
    console.log("User registration failed: ", err);
    res.sendStatus(500);
  }
});

router.delete("/provPart/:id",  rejectUnauthenticated, (req, res) => {
  const queryText = `DELETE FROM "prov_part" WHERE "id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("Error deleting", error);
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
    const sqlInitialDeposit = `INSERT INTO service_workers ("name", "phone", "email", "serv_county", "participants_id") 
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

router.post("/", rejectUnauthenticated, (req, res) => {
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


  router.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('whats up form the put request?' , req.params.id , req.body);
    let id = req.params.id;
    let queryText = `UPDATE "participants" 
    SET "first_name" = $1, 
    "last_name"  = $2,
    "dob"  = $3,
    "phone_num" = $4,
    "address" = $5, 
    "county" = $6, 
    "other" = $7, 
    "gender" = $8, 
   "limitations" = $9, 
    "notes" =$10 ,
    "ccs" = $11,
    "choices" =$12 , 
    "psp" = $13,
    "avatar" = $14,
    "guardian" = $15 
   WHERE id = $16;`;
    pool.query(queryText , [    
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
       id]).then((result) => {
      res.sendStatus(200);
    }).catch((error) => {
      console.log('error in the PUT' , error);
      res.sendStatus(500)
    });
  
  });

  router.post("/participant", rejectUnauthenticated, (req, res) => {
    console.log(req.body)

      const queryText = `select exists(select 1 from prov_part where providers_id=$1 AND participants_id=$2);`;
      pool
        .query(queryText, [req.body.prov, req.body.part])
      .then((result) => {
        console.log(result.rows[0].exists);
        
        if (result.rows[0].exists === false) {
          const queryText = `INSERT INTO prov_part (providers_id, participants_id) VALUES ($1, $2);`;
          pool
            .query(queryText, [+req.body.prov, req.body.part])
            .then((result) => {
              res.sendStatus(200);
            })
            .catch((error) => {
              res.sendStatus(500);
              console.log("error in add book", error);
            });
        }})})

// Route to get non discharged Participants from the participants table 
router.get("/participant/no_discharge", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * from participants JOIN service_workers ON participants.id = service_workers.participants_id where "status" != 'Discharged' ORDER BY status, last_name;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in non discharged participants GET", error);
    });
});

router.put("/participant/status", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const queryText = `UPDATE "participants" SET "status" = $1 WHERE "id" = $2;`;
  pool
    .query(queryText, [req.body.status, req.body.row])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("error in edit", error);
    });
});





module.exports = router;
