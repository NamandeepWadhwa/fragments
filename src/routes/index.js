// src/routes/index.js

const express = require('express');
const response =require('../response');
const {hostname} = require('os');

// version and author from package.json
const { version, author } = require('../../package.json');

// Create a router that we can use to mount our API
const router = express.Router();
const { authenticate } = require('../auth');

/**
 * Expose all of our API routes on /v1/* to include an API version.
 */
router.use(`/v1`,authenticate(), require('./api'));

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).json(
    response.createSuccessResponse({
      // TODO: make sure these are changed for your name and repo
      author: author,
      githubUrl: 'https://github.com/NamandeepWadhwa/fragments',
      version,
      // Include the hostname in the response
      hostname: hostname(),
    })
  );
});



module.exports = router;
