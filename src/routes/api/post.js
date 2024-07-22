const {Fragment} = require('../../model/fragment');
const response = require('../../response');
require('dotenv').config();

module.exports = async (req,res)=>{

try{
  

  const ownerId =req.user;
  if(req.body.length==0 || !Buffer.isBuffer(req.body)){
    res.status(415).json(response.createErrorResponse(415,'Enter suported data type'));
    return;
  };
  const fragment = new Fragment({
    ownerId,
    type:req.headers['content-type'],
    size:req.body.length
  }
  );
  await fragment.save();
  await fragment.setData(req.body);
  const locationUrl = `${req.protocol}://${req.headers.host}${process.env.LOCATION_URL}${fragment.id}`;
  
  let data={
    id:fragment.id,
    ownerId:fragment.ownerId,
    created:fragment.created,
    updated:fragment.updated,
    type:fragment.type,
    size:fragment.size,
    location:locationUrl
  }

  res.setHeader('Location',locationUrl);
  res.status(201).json(response.createSuccessResponse(data));

}
catch(err){
  console.log(err);
  res.status(500).json(response.createErrorResponse(500,err));

}

};
