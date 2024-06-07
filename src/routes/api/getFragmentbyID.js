const {Fragment} = require('../../model/fragment');
const response = require('../../response');

module.exports = async  (req, res) => {
 const id=req.params.id;
 const ownerId=req.user;
  try{
    
    const fragment=await Fragment.byId(ownerId, id);
    const data=await fragment.getData();
    const senddata = {
      type: fragment.type,
      size: fragment.size,
      data: data.toString('utf-8') // Converting buffer to string for response
    };
    
    res.status(200).json(response.createSuccessResponse({senddata}));
  }
  catch(err){
    console.log(err);
    res.status(500).json(response.createErrorResponse(500,err));
  }



};
