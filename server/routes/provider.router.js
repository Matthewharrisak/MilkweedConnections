const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


/**
 * GET route for all providers
 */
router.get('/providers',  rejectUnauthenticated, (req, res) => {
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
  JOIN providers ON providers.id = provider_profile.providers_id
  WHERE providers.acitve = true;`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error in the provider Query' , error);
    res.sendStatus(500);
  });
});
router.get("/participants/:id",  rejectUnauthenticated, async (req, res) => {
  // console.log("in transactional post", req.body);
  
  const connection = await pool.connect();
  try {
    const data = [];
    await connection.query("BEGIN");
    const partInfo = ` SELECT 
                            participants.id,
                            participants.first_name,
                            participants.last_name,
                            participants.phone_num,
                            participants.county,
                            participants.ccs,
                            participants.psp,
                            participants.choices,
                            participants.other
                            FROM prov_part
                            JOIN providers ON providers.id = prov_part.providers_id
                            JOIN participants ON participants.id = prov_part.participants_id
                            WHERE providers_id = $1;`;
    const workerInfo = `SELECT 
                        service_workers.name,
                        service_workers.email,
                        service_workers.phone
                        FROM service_workers
                        JOIN participants ON participants.id = service_workers.participants_id
                        WHERE participants_id = $1;`
    // Save the result so we can get the returned value
    const result = await connection.query(partInfo, [req.params.id]);

    // Get the id from the result - will have 1 row with the id
    const part = result.rows;
    console.log('in new query', part);
    for (var i = 0; i <= part.length-1; i++) {
      console.log("about to query counties", part[i].id);
      var elem = await connection.query(workerInfo, [part[i].id]);
      console.log('worker response', elem.rows);
      var toAppend = {}
      console.log();
      if (elem.rows.length !== 0){
        console.log('herro');
        toAppend = {
          id: part[i].id,
          first_name: part[i].first_name,
          last_name: part[i].last_name,
          phone_num: part[i].phone_num,
          county: part[i].county,
          ccs: part[i].ccs,
          psp: part[i].psp,
          choices: part[i].choices,
          other: part[i].other,
          worker_name: elem.rows[0].name,
          worker_email: elem.rows[0].email,
          worker_phone: elem.rows[0].phone
        }
      }
      else{
        toAppend = part[i];
      }
      console.log('toAppend object', toAppend);
      data.push(toAppend);
    }
    console.log('data', data);
    // const sqlInitialDeposit = `INSERT INTO service_workers ("name", "phone", "email", "county", "participants_id") 
    // VALUES ($1, $2, $3, $4, $5);`;
    // await connection.query(sqlInitialDeposit, []);
    await connection.query("COMMIT");
    // res.sendStatus(200)
    res.send(data);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back new account`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});



 // this is only for ADMIN view 
router.get('/',  rejectUnauthenticated, (req, res) => {
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

// DO NOT rejectUnauthenticated, these functions are for account registration

// this route grabs the provider ID when registering a new account. As registration is a multi step process
router.get('/:first_name/:last_name/:email',  (req, res) => {
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
