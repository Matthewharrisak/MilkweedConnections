const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route for all providers
 */
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

// router.get('/', (req, res) => {
//   // GET route code here
//   const queryText = 'SELECT * FROM provider_profile;';
//   pool.query(queryText)
//   .then((result) => {
//     res.send(result.rows);
//   }).catch((error) => {
//     console.log('error in the provider Query' , error);
//     res.sendStatus(500);
//   });
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('we are logging from the provider post router' , req.body)
  const queryText = `INSERT INTO providers ("active" , "first_name" , "last_name" ,
  "phone_num" , "email" , "county" ,
  "programs" , "openings" , "schedule" , "user_id")
  VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9 , $10);`;
   pool.query(queryText, [ req.body.active , req.body.first_name , req.body.last_name,
  req.body.phone_num , req.body.email , req.body.county, 
  req.body.programs , req.body.openings , req.body.schedule , req.user.id ])
  .then((result) => {
    res.sendStatus(200);
  }).catch((error) => {
    console.log('error in the post!' , error);
    res.sendStatus(500);
  })
});

module.exports = router;
