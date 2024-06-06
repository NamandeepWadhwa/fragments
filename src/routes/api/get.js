// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */
const response = require('../../response');
let fragments = [];
module.exports = (req, res) => {

  res.status(200).json(response.createSuccessResponse({fragments}));
};
