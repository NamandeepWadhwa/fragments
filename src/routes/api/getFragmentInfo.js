const { Fragment } = require('../../model/fragment');
const response = require('../../response');

module.exports = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const ownerId = req.user;
  try {
    const fragment = await Fragment.byId(ownerId, id);
  
    const senddata = {
      "id": fragment.id,
      "ownerId": fragment.ownerId,
      "created": fragment.created,
      "updated": fragment.updated,
      "type": fragment.type,
      "size": fragment.size,
    };

    res.status(200).json(response.createSuccessResponse({ fragment:senddata }));
  } catch (err) {
    console.log(err);
    res.status(500).json(response.createErrorResponse(500, err));
  }
};
