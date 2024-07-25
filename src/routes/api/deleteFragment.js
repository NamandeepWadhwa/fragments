const { Fragment } = require('../../model/fragment');
const response = require('../../response');
const loggers = require('../../logger');

module.exports = async (req, res) => {
  const id=req.params.id;
  const ownerId=req.user;
  try{
    await Fragment.delete(ownerId,id);
    res.status(200).send({messsage:'Fragment deleted successfully'});

  }
  catch(err){
    loggers.error(err);
    res.status(500).json(response.createErrorResponse(500,err));
  }

};
