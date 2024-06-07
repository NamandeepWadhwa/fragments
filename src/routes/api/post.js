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
  let data={
    id:fragment.id,
    ownerId:fragment.ownerId,
    createdAt:fragment.created,
    updatedAt:fragment.updated,
    type:fragment.type,
    size:fragment.size
  }
  let URL=req.headers.host+process.env.LOCATION_URL+fragment.id;
   res.status(201).location(URL).json(response.createSuccessResponse(data));
}
catch(err){
  console.log(err);
  res.status(500).json(response.createErrorResponse(500,err));

}

};
