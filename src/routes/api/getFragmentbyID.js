const {Fragment} = require('../../model/fragment');
const response = require('../../response');

module.exports = async  (req, res) => {
 const id=req.params.id;
 const ownerId=req.user;
  try{
    
    const fragment=await Fragment.byId(ownerId, id);
    let data=await fragment.getData();
    if(fragment.type=='application/json'){
      data=JSON.parse(data.toString('utf-8'));//convert buffer to json for response
    }
    else{
      data=data.toString('utf-8'); //Converting buffer to string for response
    }
    const senddata = {
      type: fragment.type,
      size: fragment.size,
      data: data
    };
  
    
    res.status(200).json(response.createSuccessResponse({senddata}));
  }
  catch(err){
    console.log(err);
    res.status(500).json(response.createErrorResponse(500,err));
  }



};
