var contentType = require('content-type');
const response = require('../../response');
const Memorydb = require('../../model/data/memory/memory-db');

module.exports = async (req, res) => {
  console.log(req.body);
  let db = new Memorydb();
  try {
    let type = contentType.parse(req).type;
    console.log(type);

    if (type !== 'application/json') {
    
      return res.status(415).json(response.createErrorResponse(400, 'invalid request, only text/plain content type is allowed'));
    }
    console.log(req.body["primaryKey"]);
      db.put(req.body.primaryKey, req.body.secondaryKey, req.body.value).then(()=>{
        res.status(201).header('Location', `${req.headers.host}/v1/fragments/${req.body.primaryKey}`).json(response.createSuccessResponse({}));
      }).catch((err)=>{res.status(400).json(response.createErrorResponse(400, err.message))});
    
  } catch (err) {
    res.status(400).json(response.createErrorResponse(400, err.message));
  }
};
