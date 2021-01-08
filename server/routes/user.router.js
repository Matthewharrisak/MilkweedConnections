const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// GET speceific provider id based of user id for assigning counties through registration 
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = 'SELECT "id" , "acitve" FROM providers WHERE "user_id" = $1;';
  pool.query(queryText, [req.params.id])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in the provider Query' , error);
    res.sendStatus(500);
  });
});

// async transaction 
// Handles POST request with new user data
// Takes user_id after new user is created and registers a new provider with given user_id attached
router.post('/register', async (req, res) => {
  console.log('we are logging from the provider post router' , req.body)

  const connection = await pool.connect()    
  try {
    await connection.query('BEGIN');
    // variables for query
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    // query
    const addingUser = `INSERT INTO "user" (username, password)
                        VALUES ($1, $2) RETURNING id`;
    // CREATE query to register a new user
    const result = await connection.query( addingUser, [username, password]); 
    // GET user_id from response from query and create new provider linked to that user_id
    // variables for query
    const user_id = result.rows[0].id; 
    // query
    const addingProvider = `INSERT INTO providers ("first_name" , "last_name", "phone_num", "email", "ccs", "choices", 
                            "psp", "openings" , "morning", "evening", "afternoon" , "user_id")
                            VALUES ($1 , $2 , $3, $4, $5 , $6 , $7 , $8, $9, $10, $11, $12) RETURNING id;`;
    // CREATE query to register a new provider linked to specefic user_id
    const result2 = await connection.query( addingProvider, [req.body.first_name, req.body.last_name, req.body.phone_num, username, 
        req.body.ccs, req.body.choices, req.body.psp, req.body.openings, req.body.morning, req.body.evening, req.body.afternoon, user_id]); 
    // variables for query
    const provider_id = result2.rows[0].id; 
    // query
    const addingCounties = `INSERT INTO "providers_counties" ("providers_id", "counties_id") 
                            VALUES ($1, $2);`
    console.log(req.body.county);
    // loop through counties selected and assign them in junction table linked based off provider_id created above
    for (var i = 0; i <= req.body.county.length-1; i++) {
      console.log("about to query counties", provider_id, req.body.county[i].id);
      await connection.query( addingCounties, [provider_id, req.body.county[i].id]);
    }
    await connection.query('COMMIT');
    res.sendStatus(200); 
  } 
  catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back account registry`, error);
    res.sendStatus(500); 
  } 
  finally {
    connection.release()
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
