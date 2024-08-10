const { Fragment } = require('../../model/fragment');
const response = require('../../response');


module.exports = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user;

  const newType = req.headers['content-type'];
  try {
    const fragment = await Fragment.byId(ownerId, id);
    if (!fragment) {
      res.status(404).json(response.createErrorResponse(404, 'Fragment not found'));
      return;
    }
    if (newType != fragment.type) {
      res.status(400).json(response.createErrorResponse(400, 'Cannot change type of fragment'));
      return;
    }
    const newSize = req.body.length;
    fragment.size = newSize;
    fragment.updated = new Date().toISOString();
    fragment.setData(req.body);
    await fragment.save();
    const data = {
      id: fragment.id,
      ownerId: fragment.ownerId,
      created: fragment.created,
      updated: fragment.updated,
      type: fragment.type,
      size: fragment.size,
    };
    res.status(200).json(response.createSuccessResponse(data));
  } catch (err) {
    console.log(err);
    if (err.message === 'Fragment not found') {
      res.status(404).json(response.createErrorResponse(404, err));
      return;
    }
    res.status(500).json(response.createErrorResponse(500, err));
  }
};
