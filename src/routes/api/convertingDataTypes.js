const markdown = require('markdown-it');
const { Fragment } = require('../../model/fragment');
const response = require('../../response');

module.exports = async (req, res) => {
  const md = new markdown();

  const id = req.params.id;
  const ownerId = req.user;

  try {
    const fragment = await Fragment.byId(ownerId, id);
    let data = await fragment.getData();
    let sendingDataType = fragment.type;

    if (fragment.type === 'text/markdown') {
     const text= data.toString('utf-8');
      data = md.render(text);
       // Render Markdown to HTML
       sendingDataType = 'text/html';
    } else {
      data = data.toString('utf-8'); // Convert other types to string
      sendingDataType = 'text/plain';
    } 
    res.setHeader('Content-Type', sendingDataType);
    res.setHeader('Content-Length', fragment.size);
    res.status(200).send(data);

  } catch (err) {
    console.log(err);
    res.status(500).json(response.createErrorResponse(500, err));
  }
};
