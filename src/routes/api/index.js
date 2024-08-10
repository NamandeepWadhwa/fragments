// src/routes/api/index.js

/**
 * The main entry-point for the v1 version of the fragments API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();
const rawBody=require('../../lib/expressMiddleWare');



// Support sending various Content-Types on the body up to 5M in size





// Define our first route, which will be: GET /v1/fragments
router.get('/fragments', require('./get'));
// Other routes (POST, DELETE, etc.) will go here later on...7
router.post('/fragments',rawBody(),require('./post'));
router.get('/fragments/:id.:ext', require('./convertingDataTypes'));

router.get('/fragments/:id',require('./getFragmentbyID'));

router.get('/fragments/:id/info',require('./getFragmentInfo'));

router.delete('/fragments/:id',require('./deleteFragment'));

router.put('/fragments/:id', rawBody(), require('./updateFragmentById'));

// Use a regular expression to capture the ID and extension separately



module.exports = router;
