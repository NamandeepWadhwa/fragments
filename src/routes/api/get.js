// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */
const response = require('../../response');
let fragments = [];
const {Fragment} = require('../../model/fragment');

module.exports = async  (req, res) => {

  const isexpanded=req.query.expand=='1';


  try{
    
    fragments=await Fragment.byUser(req.user,isexpanded);
    if(isexpanded){
       fragments = fragments.map(fragment => ({
        id: fragment.id,
        ownerId: fragment.ownerId,
        created: fragment.created, // Ensure dates are formatted correctly
        updated: fragment.updated,
        type: fragment.type,
        size: fragment.size,
      }));
    }
    console.log(response.createSuccessResponse({fragments}));
   
    res.status(200).json(response.createSuccessResponse({fragments}));

  }
  catch(err){
    console.log(err);
   
    res.status(500).json(response.createErrorResponse(500,err));

  }
  
};

