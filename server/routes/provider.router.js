const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for all providers
 */

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

// selects all information for provider profiles // this will be for provider view for other providers
router.get('/', (req, res) => {
  // GET route code here
  const queryText = 'SELECT * FROM provider_profile;';
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in the provider Query' , error);
    res.sendStatus(500);
  });
});

// get request to GET provider information upon logging in -- pass provider.id to provider_profile POST request
// This needs the reducer name to continue working on it
router.post('/:id', (req, res) => {
  // POST route code here
  console.log('we are logging from the provider_profile post router' , req.body)
  const queryText = `INSERT INTO provider_profile ("name" , "description",
  "help_info" , "mission" , "bio" , "image" , "providers_id")
  VALUES ($1 , $2 , $3 , $4 , $5 , $6,  $7 );`;
   pool.query(queryText, [req.body.name, req.body.description, req.body.help_info,
  req.body.mission , req.body.bio , req.body.image, req.params.id
  // provider_id will come from reducer that hold * provider information EX req.REDUCERNAME.id
  ])
  .then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('error in the post!' , error);
    res.sendStatus(500);
  })
});

// DELETE GOES HERE

// PUT GOES HERE

module.exports = router;
