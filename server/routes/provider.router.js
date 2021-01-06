const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route for all providers
 */
router.get('/providers', (req, res) => {
  // GET route code here
  const queryText = `
  SELECT
    providers.id,
    description,
    help_info,
    mission,
    bio,
    image,
    providers.first_name,
    providers.last_name,
    providers.phone_num,
    providers.email,
    providers.ccs,
    providers.choices,
    providers.psp
  FROM "provider_profile"
  JOIN providers ON providers.id = provider_profile.providers_id;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in the provider Query' , error);
    res.sendStatus(500);
  });
});
 // this is only for ADMIN view 
router.get('/', (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM providers;';
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in the provider Query' , error);
    res.sendStatus(500);
  });
});

// this route grabs the provider ID when registering a new account. As registration is a multi step process
router.get('/:first_name/:last_name/:email', (req, res) => {
  console.log('IN GET PROV ID ROUTER', req.params);
  // GET route code here
  const queryText = `SELECT "id" FROM providers WHERE "first_name" = $1 AND "last_name" = $2 AND "email" = $3;`;
  pool.query(queryText, [req.params.first_name, req.params.last_name, req.params.email])
  .then((result) => {
    console.log(result.rows);
    res.send(result.rows[0]);
  }).catch((error) => {
    console.log('error in the provider Query' , error);
    res.sendStatus(500);
  });
});

// get request to GET provider information upon logging in -- pass provider.id to provider_profile POST request
//This needs the reducer name to continue working on it
router.post("/:id", (req, res) => {
  // POST route code here
  console.log("we are logging from the provider_profile post router", req.body);
  const queryText = `INSERT INTO provider_profile ("name" , "description",
  "help_info" , "mission" , "bio" , "image" , "providers_id")
  VALUES ($1 , $2 , $3 , $4 , $5 , $6,  $7 );`;
  pool
    .query(queryText, [
      req.body.name,
      req.body.description,
      req.body.help_info,
      req.body.mission,
      req.body.bio,
      req.body.image,
      req.params.id,
      // provider_id will come from reducer that hold * provider information EX req.REDUCERNAME.id
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in the post!", error);
      res.sendStatus(500);
    });
});


// DELETE GOES HERE

// PUT GOES HERE

module.exports = router;
