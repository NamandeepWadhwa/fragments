// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */
const response = require('../../response');
let fragments = [];
const {Fragment} = require('../../model/fragment');

module.exports = async  (req, res) => {

  try{
    
    fragments=await Fragment.byUser(req.user);
    res.status(200).json(response.createSuccessResponse({fragments}));
    console.log(fragments);
  }
  catch(err){
    console.log(err);
   
    res.status(500).json(response.createErrorResponse(500,err));

  }
  
};
