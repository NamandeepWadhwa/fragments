const { Fragment } = require('../../model/fragment');
const response = require('../../response');

module.exports = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user;

  try {
    const fragment = await Fragment.byId(ownerId, id);
    
    let data = await fragment.getData();
   

    // Convert buffer to string or JSON based on fragment type
    if (fragment.type === 'application/json') {
      data = JSON.parse(data.toString('utf-8')); // Convert buffer to JSON object
    } else {
      data = data.toString('utf-8'); // Convert buffer to string
    }

    let contentType = fragment.type;

    // Set Content-Type header without charset if not desired
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', fragment.size);
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(404).json(response.createErrorResponse(500, err));
  }
};
